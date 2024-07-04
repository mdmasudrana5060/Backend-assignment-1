import { Request, Response } from 'express';
import { orderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.body;
    const result = await orderService.createOrderIntoDB(order);

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
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
const getOrders = async (req: Request, res: Response) => {
  try {
    const products = await orderService.getOrdersFromDB();

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
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
const getOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    if (!email || typeof email !== 'string') {
      return res.status(500).json({
        success: false,
        message: 'Search Term is required',
      });
    }
    const products = await orderService.getOrderFromDB(email);

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
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

export const orderController = {
  createOrder,
  getOrders,
  getOrder,
};
