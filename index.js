import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/users.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
dotenv.config()

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error.message);
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected!");
});



//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)
app.use("/api/users", usersRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        susscess: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})
const port = process.env.PORT || 8800;
connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log("Connected server.");
    });
}).catch((error) => {
    console.error("Error connecting to MongoDB: ", error.message);
});
