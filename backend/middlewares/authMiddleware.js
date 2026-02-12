import jwt from "jsonwebtoken";

// 🔐 LOGIN REQUIRED
export const protect = (req, res, next) => {
  let token = req.cookies.token;
  
  // Check Authorization header if no cookie
  if (!token && req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  console.log("token:", token);
  console.log("user:", req.user);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, isAdmin }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

// 👑 ADMIN ONLY
export const adminOnly = (req, res, next) => {
  let token = req.cookies.token;
  
  // Check Authorization header if no cookie
  if (!token && req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access only",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

