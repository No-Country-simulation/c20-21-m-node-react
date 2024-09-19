import { ProductModel } from "../models/product.model.js";
import { UserModel } from "../models/user.model.js";
import { uploadImages, deleteImage } from "../utils/cloudinary.util.js";
import fs from "fs-extra";

export const getAllProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, query = "" } = req.query;
    let filter = {};

    if (query) {
      filter = {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } },
        ],
      };
    }

    const options = {
      limit: Number(limit),
      page: Number(page),
      // populate: {
      //   path: "users",
      //   select: "name",
      // },
    };

    const result = await ProductModel.paginate(filter, options);
    const linkPage = (page) => {
      return `/api/products/?limit=${limit}&page=${page}&query=${query}`;
    };
    res.status(200).json({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? linkPage(result.prevPage) : null,
      nextLink: result.hasNextPage ? linkPage(result.nextPage) : null,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: "Error al intentar obtener todos los productos",
      error: error,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving product", error });
  }
};

export const getProductsByUser = async (req, res) => {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res.status(400).json({
        message: "Data userId not found",
      });
    }

    const { products } = await UserModel.findById(userId).populate("products");
    if (!products) {
      return res.status(400).json({ message: "Products not founded" });
    }
    return res.status(200).json({ status: "success", payload: products });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { title, price, description, category } = req.body;
    const { email, userId } = req.user;

    if (!req.files || !req.files.productImage) {
      return res.status(400).json({
        status: "error",
        message: "No se ha recibido una imagen para subir.",
      });
    }
    //Crea un array de images, si se sube solo un archivo se mantendrá el formato de array []
    const images = Array.isArray(req.files.productImage)
      ? req.files.productImage
      : [req.files.productImage];

    //Devuelve un conjunto de promesas donde cada file(imagen subida) que se encuentra en un archivo temporal, se subirá al servicio cloudinary
    const uploadedImages = await Promise.all(
      images.map(async (file) => {
        const result = await uploadImages(file.tempFilePath);
        //fs.unlink sirve para eliminar el archivo temporal creado en nuestro servidor
        await fs.unlink(file.tempFilePath);
        return result;
      })
    );
    //Devuelve en req.body.productId un array de objetos con las propiedades public_id y secure_url
    req.body.productImage = uploadedImages.map((image) => ({
      public_id: image.public_id,
      secure_url: image.secure_url,
    }));

    if (!title || !description || !uploadedImages || !price || !category) {
      return res.status(400).json({
        status: "error",
        message: "Debe ingresar todos los campos.",
      });
    }
    const product = await new ProductModel({
      title,
      price,
      description,
      productImage: req.body.productImage, //Guarda las imagenes con sus respectivas propiedades public_id y secure_url
      category,
      ownerId: userId,
    });

    const savedProduct = await product.save();
    // user.productsId = [...user.productsId, savedProduct._id];
    // await user.save();

    await addProduct({
      userId: userId,
      productId: product._id,
    });

    res.status(201).json({
      status: "success",
      message: "El producto ha sido creado",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Error al intentar crear el producto",
      error: error,
    });
  }
};

export const updateProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const { title, price, description, category } = req.body;
    const { userId } = req.user;

    if (!userId) {
      return res.status(400).json({
        message: "Data userId not found",
      });
    }

    const existingProduct = await ProductModel.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({
        status: "error",
        message: "Producto no encontrado",
      });
    }
    //Si se desea eliminar las imagenes ya guardadas del servicio cludinary y subir unas nuevas
    // if (existingProduct.productImage && existingProduct.productImage.length > 0) {
    //   for (let image of existingProduct.productImage) {
    //     await deleteImage(image.public_id);
    //   }
    // }
    let uploadedImages = existingProduct.productImage || [];
    if (req.files && req.files.productImage) {
      const images = Array.isArray(req.files.productImage)
        ? req.files.productImage
        : [req.files.productImage];

      uploadedImages = await Promise.all(
        images.map(async (file) => {
          const result = await uploadImages(file.tempFilePath);
          await fs.unlink(file.tempFilePath);
          return {
            public_id: result.public_id,
            secure_url: result.secure_url,
          };
        })
      );
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      {
        title,
        price,
        description,
        category,
        productImage: uploadedImages.map((image) => ({
          public_id: image.public_id,
          secure_url: image.secure_url,
        })),
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        status: "error",
        message: "No se encontró el producto",
      });
    }

    res.status(200).json({
      status: "success",
      message: "El producto ha sido actualizado",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "La búsqueda es incorrecta",
      error: error,
    });
  }
};

export const deleteProductById = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { productId } = req.params;

    if (!userId) {
      return res.status(400).json({
        message: "Data userId not found",
      });
    }
    const deletedProduct = await ProductModel.findOneAndDelete({
      _id: productId,
    });
    if (!deletedProduct) {
      return res.json({
        status: "error",
        message: "No se encontró el producto",
      });
    }
    if (deletedProduct.productImage && deletedProduct.productImage.length > 0) {
      for (let image of deletedProduct.productImage) {
        await deleteImage(image.public_id);
      }
    }

    return res.status(200).json({
      status: "success",
      message: "El producto ha sido borrado",
      data: deletedProduct,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: "Error al intentar borrar el producto",
      error: error,
    });
  }
};

// Asociar producto con el usuario, se agrega al array de products. ✅
export const addProduct = async ({ userId, productId }) => {
  try {
    // Verificar si el id del User existe.
    const user = await UserModel.findById(userId);
    if (!user) {
      return console.log("EL usuario no existe");
    }

    // Verificar si el pid ya está en el array products del User
    const productExists = user.products.some(
      (product) => product._id.toString() === productId
    );
    if (productExists) {
      return console.log("El producto ya está asociado con este usuario.");
    }

    // Guardar el id en el array products del User.
    user.products.push({
      _id: productId,
    });

    // Guardar cambios.
    await user.save();

    console.log("El guardado del usuario fué exitoso.");
  } catch (error) {
    console.log("Error al intentar agregar un producto: ", error);
  }
};
