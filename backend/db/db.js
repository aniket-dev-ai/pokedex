import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log("MongoDB connected!");
    });
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};
