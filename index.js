import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/Config.js";
import authRoute from "./Routers/authRoutes.js";
import checkoutRoute from "./Routers/checkoutRoutes.js";
import courseRoute from "./Routers/courseRoute.js";
import mentorRoute from "./Routers/mentorRoute.js";
import userRoute from "./Routers/userRoute.js";


dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use(express.static("public"));
app.use(cors());


//error handler
app.use((err, req, res, next) => {
  const statuscode = err.statuscode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statuscode).json({
    success: false,
    statuscode,
    message,
  });
});

connectDB(); // DB connection
//default routes
app.get('/', (req, res) => {
    res.send("Welcome to Learning Management System");

})

// custom routes
app.use('/api/auth',authRoute);
app.use('/api/checkout',checkoutRoute);
app.use('/api/course',courseRoute);
app.use('/api/mentor',mentorRoute);
app.use('/api/user',userRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port`);
  });