
import { configDotenv } from "dotenv";

import express from "express";

import { connectDB } from "./configuration/mongoose.config.js";
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import studentRoutes from './routes/students.js';
const app = express();
const port = process.env.PORT || 8080;

/** CONFIGURATION  */
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);


/** CONNECTION DB AND LISTENING*/
connectDB()
    .then((connectedDb) => {
        app.listen(port, () => {
            console.log(`app listening on port ${port}`);
            console.log(`connected to DB :: ${connectedDb.name}`);
        });
    })
    .catch((error) => console.log(`${error} did not connect`));