const express = require("express");
const app = express();
const PORT = 1000;
const { StudentModel, RegisterModel } = require("./userModel");
const productModel = require("./productModel");
const connectDB = require("./db");
const bcrypt = require("bcrypt");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const ProductModel = require("./productModel");
const checkToken = require("./middleware");
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.post("/createstudent", async (req, res) => {
  try {
    const { name, course, stream, roll, email, skills, gender, address } =
      req.body;

    await StudentModel.create({
      course,
      stream,
      roll,
      name,
      email,
      skills,
      gender,
      address,
    });

    res.send("Student successfuly created");
  } catch (error) {
    console.log("Error to create student", error);
    res.end("Student not created");
  }
});

app.get("/getallstudents", async (req, res) => {
  try {
    let allStudent = await StudentModel.find({});
    res.json(allStudent);
  } catch (error) {
    console.log(error);
    res.end("Error to read data", error);
  }
});

app.get("/getstudentbyid/:id", async (req, res) => {
  try {
    let singleStudent = await StudentModel.findById(req.params.id);
    if (!singleStudent) {
      res.status(404).end("Not Found");
    }
    res.json(singleStudent);
  } catch (error) {
    console.log(error);
    res.end("Error to read data", error);
  }
});

app.put("/updatestudentbyid/:id", async (req, res) => {
  try {
    let updateData = req.body;
    let studentId = req.params.id;
    let student = await StudentModel.findByIdAndUpdate(studentId, updateData, {
      new: true,
      runValidators: true,
    });
    res.json(student);
  } catch (error) {
    res.end("Not update");
  }
});

app.delete("/deletestudentbyid/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let student = await StudentModel.findByIdAndDelete(id);
    res.json({ "Deleted student": student });
  } catch (error) {
    res.end("Not delete");
  }
});

app.get("/getstudentbylimit", async (req, res) => {
  try {
    const { skip, limit } = req.query;
    let allStudent = await StudentModel.find({}).skip(skip).limit(limit);
    res.json(allStudent);
  } catch (error) {
    console.log(error);
    res.end("Error to read data", error);
  }
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const validationSchema = joi.object({
      name: joi.string().min(2).max(64).required(),
      email: joi.string().email().max(150).required(),
      password: joi.string().min(5).max(200).required(),
    });

    const { error } = validationSchema.validate({ name, email, password });

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const existEmail = await RegisterModel.findOne({ email });

    if (existEmail) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await RegisterModel.create({
      name,
      email,
      password: hashPassword,
    });

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const validationSchema = joi.object({
      email: joi.string().email().max(150).required(),
      password: joi.string().min(5).max(200).required(),
    });

    const { error } = validationSchema.validate({ email, password });

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const user = await RegisterModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    const token = jwt.sign({ id: user._id }, "hii", { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// create Product api
app.post("/createproduct", async (req, res) => {
  try {
    const { name, price, description, category, SKU } = req.body;

    const validationSchema = joi.object({
      name: joi.string().min(2).max(50).required(),
      price: joi.number().min(0).required(),
      description: joi.string().required(),
      category: joi.string().required(),
      SKU: joi.string().required().trim(),
    });

    const { error } = validationSchema.validate({
      name,
      price,
      description,
      category,
      SKU,
    });

    if (error) {
      return res.end("Validation Failed");
    }

    const product = await productModel.findOne({ name });

    if (product) {
      return res.end("Product already exist");
    }

    await productModel.create({
      name,
      price,
      description,
      category,
      SKU,
    });
    return res.end("Product created Successfully");
  } catch (error) {
    return res.end("Cannot Create Product");
  }
});

// get Product
app.get("/getallproduct", checkToken, async (req, res) => {
  try {
    let allProduct = await ProductModel.find({});
    // .skip((page - 1) * limit)
    // .limit(limit)
    // .sort(sort);

    return res.json({ allProduct });
  } catch (error) {
    return res.end("not get product");
  }
});

app.get("/logout", (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true });
    return res.end("Logout Successfully");
  } catch (error) {
    return res.json({ error: error });
  }
});

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server start at port ${PORT}`));
  })
  .catch((err) => console.log("Database Connection error", err));
