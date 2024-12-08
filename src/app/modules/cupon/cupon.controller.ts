
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';  
import { cuponService } from './cupon.service';
import sendResponse from '../../utils/sendResponse';
import { storeFile } from '../../utils/fileHelper';
import { uploadToS3 } from '../../utils/s3';

const createCupon = catchAsync(async (req: Request, res: Response) => {
 const result = await cuponService.createCupon(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Cupon created successfully',
    data: result,
  });

});

const getAllCupon = catchAsync(async (req: Request, res: Response) => {

 const result = await cuponService.getAllCupon(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All cupon fetched successfully',
    data: result,
  });

});

const getCuponById = catchAsync(async (req: Request, res: Response) => {
 const result = await cuponService.getCuponById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Cupon fetched successfully',
    data: result,
  });

});
const updateCupon = catchAsync(async (req: Request, res: Response) => {
const result = await cuponService.updateCupon(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Cupon updated successfully',
    data: result,
  });

});


const deleteCupon = catchAsync(async (req: Request, res: Response) => {
 const result = await cuponService.deleteCupon(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Cupon deleted successfully',
    data: result,
  });

});

export const cuponController = {
  createCupon,
  getAllCupon,
  getCuponById,
  updateCupon,
  deleteCupon,
};