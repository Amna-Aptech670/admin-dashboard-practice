import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true, match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"]},
    password: {type: String, required:true, select:false}
},{timestamps:true})

export default mongoose.model('Users', userSchema)