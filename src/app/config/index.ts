import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join((process.cwd(), '.env')) });

const aws = {
  accessKeyId: process.env.S3_BUCKET_ACCESS_KEY,
  secretAccessKey: process.env.S3_BUCKET_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  bucket: process.env.AWS_BUCKET_NAME,
};

// const stripe = {
//   stripe_api_key: process.env.STRIPE_API_KEY,
//   stripe_api_secret: process.env.STRIPE_API_SECRET,
// };
const payment = {

  payment_success_url: process.env.PAYMENT_SUCCESS_URL,
  payment_cancel_url: process.env.PAYMENT_CANCEL_URL,
  payment_fail_url: process.env.PAYMENT_FAIL_URL,
  payment_ipn_url: process.env.PAYMENT_ipn_URL,
};
const ssl = {
  store_id: process.env.STORE_ID,
  store_passwd: process.env.STORE_PASSWORD,
  is_live: process.env.IS_LIVE,
  url: process.env.STORE_URL,
};
export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  ip: process.env.IP,
  database_url: process.env.DATABASE_URL,
  server_url: process.env.SERVER_URL,
  client_Url: process.env.CLIENT_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  nodemailer_host_email: process.env.NODEMAILER_HOST_EMAIL,
  nodemailer_host_pass: process.env.NODEMAILER_HOST_PASS,
  socket_port: process.env.SOCKET_PORT,
  // stripe_secret: process.env.STRIPE_API_SECRET,
  // stripe_key: process.env.STRIPE_API_KEY,
  aws,
  ssl,
  // stripe,
};
