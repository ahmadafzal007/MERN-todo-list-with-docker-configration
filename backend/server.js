import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";
import forgotPasswordRouter from "./routes/forgotPassword.js";

// App config
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
mongoose.set('strictQuery', true);

// Middlewares
app.use(express.json());

// CORS Configuration
const corsOptions = {
    origin: 'http://65.2.82.7', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
app.use(cors(corsOptions));

// DB config
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Recommended for newer versions of MongoDB
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("DB Connected");
    }
});

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);
app.use("/api/forgotPassword", forgotPasswordRouter);

// Listen
app.listen(port, '0.0.0.0', () => console.log(`Listening on port ${port}`));
