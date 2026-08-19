const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");
const url =
  "mongodb+srv://purohitnaman39_db_user:Naman_Purohit_21@cluster0.kwbjzsc.mongodb.net/TechnoDB?";

const connectDB = async () => {
  try {
    await mongoose.connect(url).then(() => console.log("Mongo DB connected"));
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;