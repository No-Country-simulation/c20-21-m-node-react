import { ProductModel } from "../models/product.model.js";
import { uploadImages } from "../utils/cloudinary.util.js";
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
    const product = await ProductModel.findOne({
      _id: productId,
    });

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "No se encontró el producto",
        error: error,
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Error al buscar el producto",
      error: error,
    });
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { title, price, description, category } = req.body;
    if (!req.files || !req.files.productImage) {
      return res.status(400).json({
        status: "error",
        message: "No se ha recibido una imagen para subir.",
      });
    }
    const images = Array.isArray(req.files.productImage)
      ? req.files.productImage
      : [req.files.productImage];

    const uploadedImages = await Promise.all(
      images.map(async (file) => {
        const result = await uploadImages(file.tempFilePath);
        await fs.unlink(file.tempFilePath);
        return result;
      })
    );
    
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
    const product = await ProductModel.create({
      title,
      price,
      description,
      productImage: req.body.productImage,
      category,
    });
    res.status(201).json({
      status: "success",
      message: "El producto ha sido creado",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const updates = req.body;
    console.log(productId, updates);
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: productId },
      updates,
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
      message: "Le búsqueda es incorrecta",
      error: error,
    });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await ProductModel.findOneAndDelete({
      _id: productId,
    });

    if (!deletedProduct) {
      return res.json({
        status: "error",
        message: "No se encontró el producto",
      });
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
