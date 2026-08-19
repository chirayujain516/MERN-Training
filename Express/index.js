// const express = require("express");
// const app = express();
// const path = require("path");
// const fs = require("fs");
// const port = 1000;
// app.use(express.json());
// const dirpath = path.join(__dirname, "student.json");

// app.get("/student", (req, res) => {
//   fs.readFile(dirpath, "utf-8", (err, data) => {
//     if (err) {
//       res.status(400).end("Not get data");
//     } else {
//       res.status(200).end(data);
//     }
//   });
// });

// app.post("/createNewStudent", (req, res) => {
//   let newStudent = req.body;

//   fs.readFile(dirpath, "utf-8", (err, data) => {
//     if (err) {
//       res.status(400).end("Not get data");
//     } else {
//       data = JSON.parse(data);
//       newStudent = {
//         id: data.length + 1,
//         ...newStudent,
//       };
//       data.push(newStudent);
//       fs.writeFile(dirpath, JSON.stringify(data), (err) => {
//         if (err) {
//           res.end("Not create");
//         } else {
//           res.end("Student created");
//         }
//       });
//     }
//   });
// });

// app.put("/student/:id", (req, res) => {
//   let updateStudent = req.body;
//   let id = req.params.id;

//   fs.readFile(dirpath, "utf-8", (err, data) => {
//     if (err) {
//       res.end("not Read");
//     } else {
//       data = JSON.parse(data);
//       let afterUpdate = data.map((elem, idx) => {
//         if (id == elem.id) {
//           return {
//             ...elem,
//             ...updateStudent,
//           };
//         }
//         return elem;
//       });
//       fs.writeFile(dirpath, JSON.stringify(afterUpdate), "utf-8", (err) => {
//         if (err) {
//           res.end("cannot update");
//         } else {
//           res.end("Updated Successfully");
//         }
//       });
//     }
//   });
// });

// app.delete("/student/:id", (req, res) => {
//   let id = req.params.id;

//   fs.readFile(dirpath, "utf-8", (err, data) => {
//     if (err) {
//       res.end("Cannot read");
//     } else {
//       data = JSON.parse(data);
//       let afterUpdate = data.filter((elem, idx) => {
//         return elem.id != id;
//       });
//       fs.writeFile(dirpath, JSON.stringify(afterUpdate), "utf-8", (err) => {
//         if (err) {
//           res.end("cannot delete");
//         } else {
//           res.end("Deleted Successfully");
//         }
//       });
//     }
//   });
// });

// app.listen(port, () => console.log(`Server started at port ${port}`));

const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const PORT = 1000;

app.use(express.json());

const filePath = path.join(__dirname, "student.json");

async function readStudents() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

async function writeStudents(students) {
  await fs.writeFile(filePath, JSON.stringify(students, null, 2), "utf-8");
}

app.get("/student", async (req, res) => {
  try {
    const students = await readStudents();

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to read student data.",
      error: error.message,
    });
  }
});

app.get("/student/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const students = await readStudents();

    const student = students.find((student) => student.id === id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
      error: error.message,
    });
  }
});

app.post("/student", async (req, res) => {
  try {
    const { name, age, email, grade, gpa } = req.body;

    if (!name || !age || !email) {
      return res.status(400).json({
        success: false,
        message: "Name, age and email are required.",
      });
    }

    const students = await readStudents();

    const maxId =
      students.length > 0
        ? Math.max(...students.map((student) => student.id))
        : 0;

    const newStudent = {
      id: maxId + 1,
      name,
      age,
      grade,
      email,
      gpa,
    };

    students.push(newStudent);

    await writeStudents(students);

    res.status(201).json({
      success: true,
      message: "Student created successfully.",
      data: newStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create student.",
      error: error.message,
    });
  }
});

app.put("/student/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updatedData = req.body;

    const students = await readStudents();

    const index = students.findIndex((student) => student.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    students[index] = {
      ...students[index],
      ...updatedData,
    };

    await writeStudents(students);

    res.status(200).json({
      success: true,
      message: "Student updated successfully.",
      data: students[index],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update student.",
      error: error.message,
    });
  }
});

app.delete("/student/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const students = await readStudents();

    const index = students.findIndex((student) => student.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    const deletedStudent = students[index];

    students.splice(index, 1);

    await writeStudents(students);

    res.status(200).json({
      success: true,
      message: "Student deleted successfully.",
      data: deletedStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete student.",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});