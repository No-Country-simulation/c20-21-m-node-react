import { ProductModel } from "../models/product.model.js";


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
          status: "Falló.", error: error
      })
  }
}

export const getProductById = async (req, res) => {
  try {
      res.json({
          status: "Exitoso."
      })
  } catch (error) {
      res.json({
          status: "Falló."
      })
  }
}

export const createProduct = async (req, res) => {

  try {
      const { title, price, description, productImage, category } = req.body;
      if (!title || !description || !productImage || !price || !category) {
          return res.status(400).json({
              status: "error", mensaje: "Debe ingresar todos los campos."
          })
      }
      const product = await ProductModel.create({ title, price, description, productImage, category })
      res.status(201).json({
          status: "Exitoso.", producto: product
      });
  } catch (error) {
      res.status(500).json({
          status: "Falló.", error: error
      })
  }
}

export const updateProductById = async (req, res) => {
  try {
      res.json({
          status: "Exitoso."
      })
  } catch (error) {
      res.json({
          status: "Falló."
      })
  }
}

export const deleteProductById = async (req, res) => {
  try {
      res.json({
          status: "Exitoso."
      })
  } catch (error) {
      res.json({
          status: "Falló."
      })
  }
}