import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

// Main function to initialize the server and connect to the database.
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`✅ Server is running successfully! 🚀 ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
