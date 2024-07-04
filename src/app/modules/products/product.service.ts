import { Product } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (product: Product) => {
  try {
    const result = await ProductModel.create(product);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getProductsFromDB = async () => {
  try {
    const products = await ProductModel.find();
    return products;
  } catch (error) {
    console.log(error);
  }
};

const getProductFromDB = async (id: string) => {
  try {
    const product = await ProductModel.findOne({ id });

    if (!product) {
      throw new Error(`Product with id: ${id} not found`);
    }

    return product;
  } catch (error) {
    console.error(`Error retrieving product with id: ${id}`, error);
    throw error;
  }
};
const updateProductIntoDB = async (
  id: string,
  updateData: Partial<Product>,
) => {
  try {
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { id },
      { $set: updateData },
      { new: true, runValidators: true },
    );

    if (!updatedProduct) {
      throw new Error(`Product with id: ${id} not found`);
    }

    return updatedProduct;
  } catch (error) {
    console.error(`Error updating product with id: ${id}`, error);
    throw error;
  }
};
const searchProductsFromDB = async (searchTerm: string) => {
  try {
    const regex = new RegExp(searchTerm, 'i');

    const product = await ProductModel.find({
      $or: [{ name: regex }, { description: regex }],
    });

    return product;
  } catch (error) {
    console.error(
      `Error fetching products for search term: ${searchTerm}`,
      error,
    );
    throw error;
  }
};

const deleteProductFromDB = async (id: string) => {
  try {
    const deletedProduct = await ProductModel.findOneAndDelete({ id });

    if (!deletedProduct) {
      throw new Error(`Product with id: ${id} not found`);
    }

    return deletedProduct;
  } catch (error) {
    console.error(`Error deleting product with id: ${id}`, error);
    throw error;
  }
};

export const productServices = {
  createProductIntoDB,
  getProductsFromDB,
  getProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
  searchProductsFromDB,
};
