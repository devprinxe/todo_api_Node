import jwt from "jsonwebtoken";

// Middleware to verify the bearer token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Authorization token not provided' });
    }
  
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
  
      // Store the decoded user information in the request for further processing
      req.user = decoded;
  
      next();
    });
  };

  export default verifyToken;