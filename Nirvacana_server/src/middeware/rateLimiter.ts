import rateLimit from "express-rate-limit";
import CONFIG from "../configs/config";

// Limit users request to server in a certain interval
export default rateLimit({
  windowMs: CONFIG.RATE_LIMIT_WINDOW_MS * 60 * 1000,
  max: CONFIG.RATE_LIMIT_MAX_INTERVAL, // 50 r/5min
  keyGenerator: function (req) {
    // Use the last IP in the X-Forwarded-For header
    const xForwardedFor = Array.isArray(req.headers["x-forwarded-for"])
      ? req.headers["x-forwarded-for"].join(",")
      : req.headers["x-forwarded-for"] || "";
    return xForwardedFor.split(",").slice(-1)[0];
  },
  message: "Too many requests, please try again later.",
});
