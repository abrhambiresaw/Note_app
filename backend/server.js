import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import rootRouter from "./routes/root.js";
import { logger } from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import corsOptions from "./config/corsOptions.js";

const app = express();
app.use(logger);
app.use(cors(corsOptions))

const PORT = process.env.PORT || 3500;

app.use(express.json())
app.use(cookieParser())

app.use(
  "/",
  express.static(fileURLToPath(new URL("./public", import.meta.url)))
);

// routes
app.use("/", rootRouter);

app.all("/{*splat}", (req, res) => {
  res.status(404)
  if(req.accepts('html')) {
    res.sendFile(fileURLToPath(new URL("./views/404.html", import.meta.url)));
  } else if (req.accepts('json')) {
    res.json({message: '404 Not Found'})
  } else {
    res.type('text').send('404 Not Found')
  }
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});