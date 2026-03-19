import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies?.token;
    const jwtSecret = process.env.SECRET_KEY || process.env.JWT_SECRET;

    if (!token) {
      return res.status(401).json({ message: "Not authorized — no token provided", success: false });
    }

    if (!jwtSecret) {
      return res.status(500).json({ message: "JWT secret is not configured", success: false });
    }

    const decoded = jwt.verify(token, jwtSecret);
    console.log("Decoded JWT payload:", decoded); 

    
    req.id = decoded.userId || decoded.id;

    if (!req.id) {
      return res.status(401).json({ message: "Invalid token payload", success: false });
    }

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Invalid or expired token", success: false });
  }
};
