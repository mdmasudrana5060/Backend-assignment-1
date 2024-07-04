import { ProductModel } from '../products/product.model';
import { Order } from './order.interface';
import { OrderModel } from './order.model';

const createOrderIntoDB = async (order: Order) => {
  try {
    const product = await ProductModel.findById(order.productId);
    console.log(product);
    if (!product) {
      throw new Error('ProductNotFound');
    }
    const result = await OrderModel.create(order);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getOrdersFromDB = async () => {
  try {
    const orders = await OrderModel.find();
    return orders;
  } catch (error) {
    console.log(error);
  }
};

const getOrderFromDB = async (email: string) => {
  try {
    const order = await OrderModel.findOne({ email });

    if (!order) {
      throw new Error(`order with id: ${email} not found`);
    }

    return order;
  } catch (error) {
    console.error(`Error retrieving product with email: ${email}`, error);
    throw error;
  }
};

export const orderService = {
  createOrderIntoDB,
  getOrdersFromDB,
  getOrderFromDB,
};
