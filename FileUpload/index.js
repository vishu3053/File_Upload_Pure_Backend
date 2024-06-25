const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;

// middlewares
// to parse json body
app.use(express.json());

// middleware for uploading files 
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// Database connection
const dbConnect = require("./config/database");
dbConnect.dbConnect();

// cloud se connect krna hai
const cloudinaryConnect = require("./config/cloudinary");
cloudinaryConnect.cloudinaryConnect();

// mounting routes
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload", Upload);

// activate server
app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
})