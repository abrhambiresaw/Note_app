import "dotenv/config";
import express from "express";
import { fileURLToPath } from "url";
import rootRouter from "./routes/root.js";
import { logger, logEvents } from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import connectDB from "./config/dbConn.js";
import mongoose from "mongoose";

console.log(process.env.NODE_ENV);

connectDB();

const app = express();
app.use(logger);
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(cookieParser());

app.use(
  "/",
  express.static(fileURLToPath(new URL("./public", import.meta.url))),
);

// routes
app.use("/", rootRouter);

app.all("/{*splat}", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(fileURLToPath(new URL("./views/404.html", import.meta.url)));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("text").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

mongoose.connection.on('error', error => {
  console.log(error)
  logEvents(
  `${error.name}: ${error.message}`,
  "mongoerrorLog.log"
);
})
