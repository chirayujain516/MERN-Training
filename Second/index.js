const http = require("http");
const path = require("path");
const fs = require("fs");

const port = 1000;
const dirpath = path.join(__dirname, "student.json");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" && req.url === "/student") {
    fs.readFile(dirpath, "utf-8", (err, data) => {
      if (err) {
        res.end(JSON.stringify({ error: "Failed to read student data" }));
      } else {
        res.end(data);
      }
    });
  } else if (req.method === "POST" && req.url === "/createNewStudent") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      let newStudent = JSON.parse(body);

      fs.readFile(dirpath, "utf-8", (err, data) => {
        if (err) {
          res.end("Failed to read student data");
        } else {
          let students = JSON.parse(data);
          newStudent = {
            id: students.length + 1,
            ...newStudent,
          };
          students.push(newStudent);

          fs.writeFile(
            dirpath,
            JSON.stringify(students),
            "utf-8",
            (err, data) => {
              if (err) {
                res.end("Failed to create student");
              } else {
                res.end(
                  JSON.stringify({
                    message: "Student successfully created",
                    students,
                  }),
                );
              }
            },
          );
        }
      });
    });
  } else if (req.method === "PUT" && req.url.startsWith("/student/")) {
    let id = Number(req.url.split("/")[2]);

    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      let updateStudent = JSON.parse(body);

      fs.readFile(dirpath, "utf-8", (err, data) => {
        if (err) {
          console.log(err);
          res.end("Cannot read");
        } else {
          let students = JSON.parse(data);
          let afterUpdate = students.map((elem, index) => {
            if (elem.id == id) {
              return {
                ...elem,
                ...updateStudent,
              };
            }
            return elem;
          });
          fs.writeFile(dirpath, JSON.stringify(afterUpdate), "utf-8", (err) => {
            if (err) {
              console.log(err);
              res.end("Update failed");
            } else {
              res.end(
                JSON.stringify({
                  message: "Student successfully updated",
                  afterUpdate,
                }),
              );
            }
          });
        }
      });
    });
  } else if (req.method === "DELETE" && req.url.startsWith("/student/")) {
    let id = Number(req.url.split("/")[2]);

    fs.readFile(dirpath, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        res.end("Not read");
      } else {
        let students = JSON.parse(data);
        let afterUpdate = students.filter((elem) => {
          return elem.id !== id;
        });
        fs.writeFile(dirpath, JSON.stringify(afterUpdate), "utf-8", (err) => {
          if (err) {
            console.log(err);
            res.end("cannot delete");
          } else {
            res.end(
              JSON.stringify({ message: "Deleted Successfully", afterUpdate }),
            );
          }
        });
      }
    });
  }
});

server.listen(port, () => console.log(`Server is started at port ${port}`));