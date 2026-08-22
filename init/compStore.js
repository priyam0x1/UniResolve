// This is for sample complaint Store

const mongoose = require("mongoose");
const initData = require("./complaint.js");
const Complaint = require("../models/complaint.js");

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
  await Complaint.deleteMany();
  await Complaint.insertMany(initData.data);
  console.log("Data was initialized");
};

initDB();
