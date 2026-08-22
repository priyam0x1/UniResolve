const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authoritySchema = new Schema({
  authority: String,
  email: String,
});

const Authority = mongoose.model("Authority", authoritySchema);
module.exports = Authority;
