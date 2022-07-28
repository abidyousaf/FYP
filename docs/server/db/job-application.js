let mongoose = require("mongoose");

let applicationSchema = mongoose.Schema({
  job_id: String,
  userid:String
});

let JobApplication = mongoose.model("jobApplication", applicationSchema);

module.exports = JobApplication;
