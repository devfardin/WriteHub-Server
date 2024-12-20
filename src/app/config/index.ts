import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

// export env name
export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  password_secure: process.env.PASSWORD_SECURE_WITH_BCRYPT,

  // default_password: process.env.DEFAULT_PASSWORD,
};
