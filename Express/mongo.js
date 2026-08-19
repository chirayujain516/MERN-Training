const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const url = "mongodb+srv://purohitnaman39_db_user:Naman_Purohit_21@cluster0.kwbjzsc.mongodb.net/";

const client = new MongoClient(url);

async function connect() { 
    await client.connect();
}