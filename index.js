import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import verification from "./middleware/verify_token.js"

const app = express();

app.use(express.json());
app.use(cookieParser());


const upload = multer({ dest: 'client/' });

app.post("/api/upload", upload.single("file"), function (req, res) {
  if (req.fileValidationError) {
    // Print the error message
    console.error(req.fileValidationError);
    // Return an error response to the client
    return res.status(400).json({ error: req.fileValidationError });
  }
  
  // File upload succeeded
  res.json({ message: 'File uploaded successfully' });
});

app.use("/api/auth", authRoutes);
app.use("/api/users",verification, userRoutes);
app.use("/api/posts", postRoutes);

app.listen(3000, () => {
  console.log("Connected!");
});
