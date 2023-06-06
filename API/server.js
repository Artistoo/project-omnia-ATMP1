const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 5500 || process.env.PORT;
const DB = process.env.MONGODB;
const url = `mongodb+srv://jasondesmond198:MYMONGODBPASSWORD@cluster0.1ceqjd5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url);

app.listen(PORT, () => {
  console.log(PORT);
});

async function run() {
  try {
    await client.connect();
    console.log("Successfully connected to Atlas");
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
