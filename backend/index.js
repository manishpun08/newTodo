import express from "express";
import cors from "cors";
import connectDb from "./connectDb.js";
import todoRoutes from "./Todo/todoRoute.js";
import userRoutes from "./User/user.route.js"

const app = express();
// To make app understand json
app.use(express.json());
//For connect different domain
app.use(cors());

// Connect Database
connectDb();

// Register Routes
app.use(todoRoutes);
app.use(userRoutes)

const port = 8080;
app.listen(port, () => {
  console.log(`App is listing on port ${port}`);
});
