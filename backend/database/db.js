import mongoose from "mongoose";

const mongoDatabase = async () => {
  try {
    const { MONGO_URI } = process.env;
    const options = {
      useUnifiedTopology: true,
      useUnifiedTopology: true,
      // useCreateIndex: true
    };
    mongoose.set("strictQuery", false);
    await mongoose.connect(MONGO_URI, options);
    console.log("database connected");
  } catch (error) {
    console.log("something wrong :(");
    console.log(error.message);
  }
};

export default mongoDatabase;
