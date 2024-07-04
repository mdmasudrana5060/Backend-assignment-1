import { ProductModel } from '../products/product.model';
import { Order } from './order.interface';
import { OrderModel } from './order.model';

const createOrderIntoDB = async (order: Order) => {
  try {
    const product = await ProductModel.findOne({ id: order.productId });

    if (!product) {
      return {
        status: 404,
        message: 'Product is not found',
      };
    }

    if (product.inventory.quantity < order.quantity) {
      return {
        status: 400,
        message: 'Insufficient quantity available in inventory',
      };
    }

    product.inventory.quantity -= order.quantity;
    if (product.inventory.quantity <= 0) {
      product.inventory.inStock = false;
    }

    await product.save();

    const result = await OrderModel.create(order);

    return result;
  } catch (error) {
    return {
      status: 400,
      message: 'something went wrong',
    };
  }
};

const getOrdersFromDB = async () => {
  try {
    const orders = await OrderModel.find();
    return orders;
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      message: 'Something went wrong',
    };
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
    return {
      message: 'There is no order',
    };
  }
};

export const orderService = {
  createOrderIntoDB,
  getOrdersFromDB,
  getOrderFromDB,
};
