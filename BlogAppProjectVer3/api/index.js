import express from 'express'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import cookieParser from "cookie-parser";
import cors from 'cors'
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// app.use(cors())
////////// with this code cookies will be set in browser application->storage->cookies
app.use(cors({ 
    origin: 'http://localhost:3000',
    credentials: true // Allow credentials (cookies)
}));
app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
console.log("print __filename" + __filename);
const __dirname = path.dirname(__filename);

// Now you can use __dirname as you would in CommonJS modules
console.log("print __dirname" + __dirname);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log("Destination function called");
      // cb(null, '../client/public/upload')
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      console.log("Filename function called");
      cb(null, Date.now() + file.originalname)
    }
  })
  
  const upload = multer({ storage:storage })

app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename)
  })

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

// // Define your API route
// app.post('/register', (req, res) => {
//     // Assuming req.body contains user data
//     const userData = req.body;

//     res.send('User registered successfully');
// });

app.listen(8800, ()=>{
    console.log('first app connected');
})