const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
const PORT = process.env.PORT;
const url = process.env.url;

mongoose
  .connect(url)
  .then((e) => console.log("Mongo DB connected"))
  .catch((e) => console.log("Failed to connect with database"));

const multer = require("multer");
const path = require("path");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, unique + ext);
  },
});

const upload = multer({ storage: diskStorage });

const cloudinary = require("./src/config/cloudinary");

app.post("/uploadCloud", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "uploads",
    });
    res
      .status(200)
      .json({ message: "File uploaded successfully", file: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading file to Cloudinary" });
  }
});

// app.post("/upload", upload.single("file"), (req, res) => {
//   console.log(req.file);
//   res.send("File uploaded successfully");what

// });

const userRoute = require("./src/Routes/userRoute");
const productRoute = require("./src/Routes/productRoute");
const addressRoute = require("./src/Routes/addressRoute");
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/address", addressRoute);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
