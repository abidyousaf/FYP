let mongoose = require("mongoose");

let jobPostSchema = mongoose.Schema({
  category: String,
  type: String,
  level: String,
  title: String,
  slug:String,
  experience: String,
  qualification: String,
  description: String,
  salary: String,
  deadline: String,
  expiry_date:String,
  employer:{}
});

let jobs = mongoose.model("PostNewjob", jobPostSchema);

module.exports = jobs;
