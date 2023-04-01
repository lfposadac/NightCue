import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const uri: string =
      process.env.MONGODB_URI || "mongodb://localhost:27017/your-database-name";
    console.log(uri);
    await mongoose.connect(uri);
    console.log("Conexión a la base de datos establecida");
  } catch (error) {
    console.error("Error al conectarse a la base de datos:", error);
  }
};
