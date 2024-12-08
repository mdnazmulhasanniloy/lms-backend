
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';  
import { couponService } from './coupon.service';
import sendResponse from '../../utils/sendResponse';
import { storeFile } from '../../utils/fileHelper';
import { uploadToS3 } from '../../utils/s3';

const createCoupon = catchAsync(async (req: Request, res: Response) => {
 const result = await couponService.createCoupon(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Coupon created successfully',
    data: result,
  });

});

const getAllCoupon = catchAsync(async (req: Request, res: Response) => {

 const result = await couponService.getAllCoupon(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All coupon fetched successfully',
    data: result,
  });

});

const getCouponById = catchAsync(async (req: Request, res: Response) => {
 const result = await couponService.getCouponById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Coupon fetched successfully',
    data: result,
  });

});
const updateCoupon = catchAsync(async (req: Request, res: Response) => {
const result = await couponService.updateCoupon(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Coupon updated successfully',
    data: result,
  });

});


const deleteCoupon = catchAsync(async (req: Request, res: Response) => {
 const result = await couponService.deleteCoupon(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Coupon deleted successfully',
    data: result,
  });

});

export const couponController = {
  createCoupon,
  getAllCoupon,
  getCouponById,
  updateCoupon,
  deleteCoupon,
};