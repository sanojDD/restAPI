const mongoose = require("mongoose");
const dns = require("dns");
const dotenv = require("dotenv");
dotenv.config();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB Atlas...");

    const conn = await mongoose.connect(
      process.env.MONGODB_URI,
      {
        dbName: "Products",
      },
      {
        serverSelectionTimeoutMS: 5000,
      },
    );
    console.log("connected");

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
  }
};

module.exports = connectDB;
