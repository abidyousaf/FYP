let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    password:String,
    password_confirmation:String,
    address: String,
    api_key: String,
    cover: String,
    created_at: String,
    description: String,
    logo: String,
    name: String,
    phone: String,
    remember_token: String,
    type:String,
    updated_at: String,
    entity:String,
    phine:String,
    profile:String,      
    cv:String,      
});


let users = mongoose.model('user', userSchema);

module.exports = users;