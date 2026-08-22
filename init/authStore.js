// This is for sample authority store

const mongoose = require("mongoose");
const initData = require("./authority.js");
const Authority = require("../models/authority.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/uniResolve";
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Authority.deleteMany();
  await Authority.insertMany(initData.data);
  console.log("Sample authority was initialized");
};

initDB();
