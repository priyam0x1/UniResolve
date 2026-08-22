const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
  fullname: String,
  uni_id: String,
  role: String,
  dept: String,
  category: String,
  title: String,
  description: String,
  image: String,
  forward_to: String,
  status: String,
});

const Complaint = mongoose.model("Complaint", complaintSchema);
module.exports = Complaint;
