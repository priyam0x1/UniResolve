require("dotenv").config({ quiet: true });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Complaint = require("./models/complaint.js");
const Authority = require("./models/authority.js");
const nodemailer = require("nodemailer");

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));

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

// ====================================Nodemailer || Starting ==========================================
const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_Password,
  },
});

async function sendMail(to, sub, msg) {
  await transporter.sendMail({
    to: to,
    subject: sub,
    html: msg,
  });
  console.log("Email was sent");
}
// ====================================Nodemailer || Done ==========================================

app.get("/home", (req, res) => {
  res.render("home.ejs");
});

app.get("/home/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/complaint", async (req, res) => {
  let complaint = new Complaint(req.body.complaint);
  await complaint.save();
  res.redirect("/home");
});

app.get("/admin", async (req, res) => {
  let allComplaint = await Complaint.find();
  res.render("admin.ejs", { allComplaint });
});

app.post("/admin/:id", async (req, res) => {
  let complaint = await Complaint.findById(req.params.id);
  complaint.forward_to = req.body.forward_to;

  let authority = await Authority.findOne({
    authority: complaint.forward_to,
  });
  let to = authority.email;
  let sub = complaint.title;
  let msg = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">

        <h2>Complaint Forwarded - ${complaint.title}</h2>

        <p>Dear Sir/Madam,</p>

        <p>
            A complaint has been forwarded to you for your attention.
        </p>

        <h3>Complaint Details</h3>

        <p><strong>Student:</strong> ${complaint.fullname}</p>
        <p><strong>University ID:</strong> ${complaint.uni_id}</p>
        <p><strong>Department:</strong> ${complaint.dept}</p>
        <p><strong>Category:</strong> ${complaint.category}</p>

        <h3>Issue</h3>

        <p>
            ${complaint.description}
        </p>

        <p>
            Kindly look into this matter and take the necessary action.
        </p>

        <p>
            Regards,<br>
            <strong>UniResolve Administration</strong>
        </p>

    </div>
`;
  // sendMail(to, sub, msg);
  complaint.status = "forwarded";
  await complaint.save();
  res.redirect("/admin");
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
