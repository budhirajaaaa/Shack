import mongoose from "mongoose";

const mongoConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://dakshbudhiraja2:Daksh2001!@cluster0.jng9w35.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("mongoDb connect");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default mongoConnect;
