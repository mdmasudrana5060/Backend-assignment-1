import { Request, Response } from 'express';
import { productServices } from './product.service';
import productValidationSchema from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body.product;
    const zodParsedData = productValidationSchema.parse(product);
    const result = await productServices.createProductIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};
const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productServices.getProductsFromDB();

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};
const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const products = await productServices.getProductFromDB(id);

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully',
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updateProduct = await productServices.updateProductIntoDB(
      id,
      updateData,
    );
    res.status(200).json({
      success: true,
      message: 'Products updated successfully',
      data: updateProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

const searchProduct = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    if (!searchTerm || typeof searchTerm !== 'string') {
      return res.status(500).json({
        success: false,
        message: 'Search Term is required',
      });
    }
    const product = await productServices.searchProductsFromDB(searchTerm);
    res.status(200).json({
      success: true,
      message: `Products matching search term ${searchTerm} fetched successfully!`,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await productServices.deleteProductFromDB(id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

export const productController = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  searchProduct,
  deleteProduct,
};
