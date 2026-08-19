const fs = require("fs");
const students = require("./student.json");

// fs.writeFile("localDB.json", JSON.stringify(students), "utf-8", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("DB file successfully created");
//   }
// });

// fs.readFile("localDB.json", "utf-8", (err, data) => {
//   console.log(JSON.parse(data));
// });

// fs.appendFile(
//   "localDB.json",
//   JSON.stringify({
//     id: 21,
//     name: "Shaurya Mehta",
//     age: 15,
//     grade: "11th",
//     email: "shaurya.mehta@example.com",
//     gpa: 3.9,
//   }),
//   "utf-8",
//   (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Update Successfully");
//     }
//   },
// );

// fs.rename("localDB.json", "newDB.json", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("rename done");
//   }
// });

// fs.unlink("newDB.json", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Deleted Succesfully");
//   }
// });

// fs.mkdir("Naman", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Folder created");
//   }
// });

// fs.writeFile("./Naman/db.txt", "Hello Naman", "utf-8", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("File Created");
//   }
// });

// fs.readdir("../", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// fs.readdir("./", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// fs.readdir("./Naman", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// stat find status
fs.stat("./Naman/db.txt", (err, stat) => {
  if (err) {
    console.log(err);
  } else {
    console.log(stat);
  }
});

fs.copyFile("./Naman/db.txt", "./Naman/copy.txt", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Copy Created");
  }
});
