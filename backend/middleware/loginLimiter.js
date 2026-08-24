import rateLimit from "express-rate-limit";
import { logEvents } from "./logger.js";

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,

  message: {
    message: "Too many login attempts, please try again after 60 seconds",
  },

  handler: (req, res, next, options) => {
    logEvents(
      `Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      "errLog.log"
    );

    res.status(options.statusCode).json(options.message);
  },

  standardHeaders: true,
  legacyHeaders: false,
});

export default loginLimiter;