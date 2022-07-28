let mongoose = require("mongoose");

let jobPostSchema = mongoose.Schema({
    contacter_name: String,
    contacter_email: String,
    contacter_subject: String,
    yourmessage:String

});

let Messages = mongoose.model("message", jobPostSchema);

module.exports = Messages;
