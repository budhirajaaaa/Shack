import mongoose from "mongoose";
const mongoUrl = process.env.MONGO_URI;
const mongoConnect = async () => {
  try {
    await mongoose.connect(
      mongoUrl
    );
    console.log("mongoDb connect");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default mongoConnect;
