import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import config from '../../config';
import axios from 'axios';

export const createCheckoutSession = async (payload: any) => {
  const data = {
    store_id: config.ssl.store_id,
    store_passwd: config.ssl.store_passwd,
    total_amount: payload.total_amount,
    currency: 'BDT',
    tran_id: payload.tran_id,

    success_url: `${config?.server_url}/payments/webhook`,
    fail_url: `${config?.server_url}/fail`,
    cancel_url: `${config?.server_url}/cancel`,
    ipn_url: `${config?.server_url}/test`,

    product_name: 'course payment.',
    product_category: 'payment',
    product_profile: 'student',
    cus_name: payload.cus_name,
    cus_email: payload.cus_email,
    cus_add1: payload.cus_add1,
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: payload.cus_phone,
  };
  const response = await axios({
    method: 'post',
    url: config.ssl.url,
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data;
};

export const validatePayment = async (data: any) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${config.ssl.url}?val_id=${data.val_id}&store_id=${config.ssl.store_id}&store_passwd=${config.ssl.store_passwd}&format=json`,
    });

    if (!response) {
      throw new AppError(httpStatus.BAD_REQUEST, 'payment validation failed');
    }

    return response.data;
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, 'payment validation failed');
  }
};
