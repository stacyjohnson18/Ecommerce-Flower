import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoute  from './routes/categoryRoute.js';
import productRoute from  './routes/productRoute.js';
import bodyParser from 'body-parser';
import cors from "cors";


//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

// //middelwares
// app.use(express.json());
// app.use(express.urlencoded({extended:true}))

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());

// Configure CORS for all routes or specific routes
// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization'], // Include Authorization header
//   credentials: true // Allow sending cookies from the frontend
// }));


//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);



//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

//PORT
const PORT = process.env.PORT || 8088;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
