
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';  
import { copunService } from './copun.service';
import sendResponse from '../../utils/sendResponse';
import { storeFile } from '../../utils/fileHelper';
import { uploadToS3 } from '../../utils/s3';

const createCopun = catchAsync(async (req: Request, res: Response) => {
 const result = await copunService.createCopun(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Copun created successfully',
    data: result,
  });

});

const getAllCopun = catchAsync(async (req: Request, res: Response) => {

 const result = await copunService.getAllCopun(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All copun fetched successfully',
    data: result,
  });

});

const getCopunById = catchAsync(async (req: Request, res: Response) => {
 const result = await copunService.getCopunById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Copun fetched successfully',
    data: result,
  });

});
const updateCopun = catchAsync(async (req: Request, res: Response) => {
const result = await copunService.updateCopun(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Copun updated successfully',
    data: result,
  });

});


const deleteCopun = catchAsync(async (req: Request, res: Response) => {
 const result = await copunService.deleteCopun(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Copun deleted successfully',
    data: result,
  });

});

export const copunController = {
  createCopun,
  getAllCopun,
  getCopunById,
  updateCopun,
  deleteCopun,
};