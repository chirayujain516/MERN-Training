// const http = require("http");

// const student = [
//   {
//     name: "Naman Purohit",
//     age: 20,
//   },
//   {
//     name: "Gaurav Jain",
//     age: 20,
//   },
// ];

// const server = http.createServer((req, res) => {
//   if (req.url == "/") {
//     res.write("Home page");
//     res.end();
//   } else if (req.url == "/student") {
//     res.end(JSON.stringify(student));
//   } else {
//     res.write("Page not found");
//     res.statusCode = 404;
//     res.end();
//   }
// });

// server.listen(1000, () => {
//   console.log("Server Started at Port 1000");
// });

// Server with Express
// const express = require("express");
// const app = express();
// const PORT = 3000;

// const product = [
//   {
//     name: "Smartphone",
//     price: "50,000",
//   },
//   {
//     name: "Television",
//     price: "30,000",
//   },
//   {
//     name: "Microwave",
//     price: "20,000",
//   },
//   {
//     name: "Refrigerator",
//     price: "50,000",
//   },
//   {
//     name: "AC",
//     price: "30,000",
//   },
// ];

// const user = [
//   {
//     name: "Naman Purohit",
//     role: "Admin",
//   },
//   {
//     name: "Digvijay",
//     role: "user",
//   },
// ];

// const student = [
//   {
//     name: "Naman Purohit",
//     age: 20,
//     class: "A",
//   },
//   {
//     name: "Gaurav Jain",
//     age: 25,
//     class: "A",
//   },
//   {
//     name: "Adarsh Raj",
//     age: 15,
//     class: "A",
//   },
//   {
//     name: "Chirayu Jain",
//     age: 30,
//     class: "A",
//   },
//   {
//     name: "Mithil Paneri",
//     age: 18,
//     class: "A",
//   },
// ];

// app.get("/", (req, res) => {
//   res.end("Hello Backend");
// });

// app.get("/product", (req, res) => {
//   res.json(product);
// });

// app.get("/user", (req, res) => {
//   res.json(user);
// });

// app.get("/student", (req, res) => {
//   res.json(student);
// });

// app.listen(PORT, () => console.log(`Server is started at port ${PORT}`));

const express = require("express");
const app = express();

const PORT = 1000;

let student = [
  {
    id: "1",
    name: "Naman Purohit",
    age: 20,
    class: "A",
  },
  {
    id: "2",
    name: "Gaurav Jain",
    age: 25,
    class: "A",
  },
  {
    id: "3",
    name: "Adarsh Raj",
    age: 15,
    class: "A",
  },
  {
    id: "4",
    name: "Chirayu Jain",
    age: 30,
    class: "A",
  },
  {
    id: "5",
    name: "Mithil Paneri",
    age: 18,
    class: "A",
  },
];


app.get("/student", (req, res) => {
  res.json(student);
});


app.post("/createNewStudent", (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    const newStudent = JSON.parse(body);

    student.push(newStudent);

    res.end(
      JSON.stringify({
        message: "Successfully created",
        student: student,
      }),
    );
  });
});


app.put("/updateStudent", (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    const updatedData = JSON.parse(body);

    student = student.map((stu) => {
      if (stu.id === updatedData.id) {
        return updatedData;
      }

      return stu;
    });

    res.end(
      JSON.stringify({
        message: "Student updated successfully",
        student: student,
      }),
    );
  });
});


app.delete("/deleteUser", (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    const deleteUser = JSON.parse(body);

    student = student.filter((stu) => {
      return stu.id !== deleteUser.id;
    });

    res.end(
      JSON.stringify({
        message: "Student deleted successfully",
        student,
      }),
    );
  });
});


app.listen(PORT, () => {
  console.log(`Server Started at port ${PORT}`);
});