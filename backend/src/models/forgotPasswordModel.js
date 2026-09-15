import mongoose from "mongoose";

const forgotPasswordModel = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
   otp: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 4
}
},{timestamps:true});

forgotPasswordModel.index({updatedAt:1},{expireAfterSeconds:600})

export default mongoose.model('Forget', forgotPasswordModel)
