import { ProductModel } from "../models/product.model.js";
import { processImagesToBase64 } from "../utils/imageProcessor.js";


export const getAllProducts = async (req, res) => {

  try {
    const { limit = 10, page = 1, query = '' } = req.query
    let filter = {};

    if (query) {
      filter = {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { category: { $regex: query, $options: 'i' } }
        ]
      };
    }


    const options = {
      limit: Number(limit),
      page: Number(page)
    }

    const result = await ProductModel.paginate(filter, options);
    const linkPage = (page) => {
      return `/api/products/?limit=${limit}&page=${page}&query=${query}`;
    }
    res.status(200).json({
      status: 'success',
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? linkPage(result.prevPage) : null,
      nextLink: result.hasNextPage ? linkPage(result.nextPage) : null
    })


  } catch (error) {
    res.json({
      status: "error", message: "Error al intentar obtener todos los productos" , error: error
    })
  }
}

export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await ProductModel.findOne({
      _id: productId
    })

    if (!product) {
      return res.status(404).json({
        status: "error", message: "No se encontró el producto", error: error
      })
    }

    res.status(200).json(product)

  } catch (error) {
    res.status(400).json({
      status: "error", message: "Error al buscar el producto", error: error
    })
  }
}

export const createProduct = async (req, res) => {

  try {
    const { title, price, description, category } = req.body;
    const productImage = await req.files.map(file => file.buffer)
    const processedImages = await processImagesToBase64(productImage)
    if (!title || !description || !productImage || !price || !category) {
      return res.status(400).json({
        status: "error", message: "Debe ingresar todos los campos."
      })
    }
    const product = await ProductModel.create({ title, price, description, productImage:processedImages, category })
    res.status(201).json({
      status: "success", message: "El producto ha sido creado", data: product
    });
  } catch (error) {
    res.status(500).json({
      status: "error", message: "Error al intentar crear el producto",error: error
    })
  }
}

export const updateProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const updates = req.body;
    console.log(productId, updates)
    const updatedProduct = await ProductModel.findOneAndUpdate({ _id: productId }, updates, { new: true })

    if (!updatedProduct) {
      return res.status(404).json({
        status: "error", message: "No se encontró el producto"
      })
    }

    res.status(200).json(
      { status: "success", message: "El producto ha sido actualizado", data: updatedProduct }
    )

  } catch (error) {
    res.status(400).json({
      status: "error", message: "Le búsqueda es incorrecta", error: error
    })
  }
}


export const deleteProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await ProductModel.findOneAndDelete({ _id: productId })

    if (!deletedProduct) {
      return res.json({
        status: "error", message: "No se encontró el producto"
      })
    }

    return res.status(200).json(
      { status: "success", message: "El producto ha sido borrado", data: deletedProduct }
    )

  } catch (error) {
    res.json({
      status: "error", message: "Error al intentar borrar el producto", error: error
    })
  }
}