const express = require("express");
const connectDB = require("./utils/database");
const { notFound,errorHandler } = require("./middleware/error")
const cors = require("cors")

//routes
const userRoute = require("./router/userRoute")

require("dotenv").config();
connectDB();

const PORT = process.env.PORT || 3000

const app = express();

app.use(express.json());
app.use(cors())

app.use("/user",userRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT,console.log("server started on port"))