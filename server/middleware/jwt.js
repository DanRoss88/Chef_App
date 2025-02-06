import jwt from "jsonwebtoken";

const jwToken = process.env.JWT_SECRET
const jwtMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    try {
      if (!jwToken) {
        return res.status(500).json({ message: "JWT secret is not defined" });
      }
      const decodedToken = jwt.verify(token, jwToken);
      req.user = decodedToken;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Invalid token" });
    }
  };
  
  // Apply middleware to all routes that need authentication
  router.use("/auth/*", jwtMiddleware);

