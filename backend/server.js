import app from "./app.js";
import { connectDB } from "./db/connectDB.js";

const PORT = process.env.PORT || 3000;

app.get("/", (res) => {
  res.send("API is running...");
});

const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect DB:", error);
    process.exit(1);
  }
};

startServer();
