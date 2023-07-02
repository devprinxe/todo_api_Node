import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import verification from "./middleware/verify_token.js";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';


const app = express();

app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'client/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  if (req.fileValidationError) {
    // Print the error message
    console.error(req.fileValidationError);
    // Return an error response to the client
    return res.status(400).json({ error: req.fileValidationError });
  }
  const fileUrl = `http://localhost:3000/client/${req.file.filename}`;
  // File upload succeeded
  res.json({ message: 'File uploaded successfully', "fileUrl": fileUrl});
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Serve static files from the 'uploads' directory
app.use('/client', express.static(path.join(__dirname, 'client')));




// Swagger configuration options
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'My API',
      description: 'API documentation using Swagger',
      version: '1.0.0',
    },
    apis: ['./routes/*.js'],
  },
  // Specify the path to your API routes
  apis: ['routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/auth", authRoutes);
app.use("/api/users",verification, userRoutes);
app.use("/api/posts", postRoutes);

app.listen(3000, () => {
  console.log("Connected!");
});
