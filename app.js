const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Complaint = require("./models/complaint.js");

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

app.get("/", (req, res) => {
  res.send("You are at root");
});

// app.get("/testComplaint", async (req, res) => {
//   const sampleComplaint = new Complaint({
//     fullname: "Rahul Sharma",
//     uni_id: "UNI2026001",
//     role: "Student",
//     dept: "Computer Science",
//     category: "Hostel",
//     title: "Water supply issue in hostel",
//     description:
//       "There has been no proper water supply in our hostel since yesterday. Kindly look into the issue and resolve it as soon as possible.",
//     image:
//       "https://goonsalescorporation.com/wp-content/uploads/2025/11/sdlx200400b-bluestar-400-storage-water-cooler-300x300.jpeg",
//     forward_to: "Hostel Warden",
//     status: "Pending",
//   });

//   await sampleComplaint.save();
//   res.send("Test Succesfull");
// });

app.listen(8080, () => {
  console.log("Server is litsening at port 8080");
});
