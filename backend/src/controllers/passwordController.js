import Users from "../models/authModel.js"
import Forget from "../models/forgotPasswordModel.js"
import otpGenerator from "otp-generator"
import bcrypt from "bcrypt"

const verifyEmail = async(req, res)=>{
    try{
        const {email} = req.body
        if(!email){
            return res.status(404).json({error:"Email is required"})
        }
        const exist = await Users.findOne({email})
        if(!exist){
            return res.status(404).json({error:"Email not found"})
        }
        const otp = await otpGenerator.generate(4, { upperCaseAlphabets: false, 
            specialChars: false, lowerCaseAlphabets: false })

        const forgetemailexist = await Forget.findOne({email})
        if(forgetemailexist){
            const update = await Forget.findOneAndUpdate({email},{otp})
            return res.status(201).json({msg:"otp sent",update})
        } else{
            const newotp = await Forget.create({email,otp})
            return res.status(201).json({msg:"otp sent",newotp})
        }
    }
    catch(error){
        return res.status(500).json({error: error})
    }
}

const verifyOtp = async(req,res) => {
    try{
        const {email, otp} = req.body
        if(!email || !otp){
            return res.status(404).json({error:"Not found"})
        }
        const match= await Forget.findOne({email,otp})
        if(match){
            return res.status(200).json({msg:"otp verified"})
        } else{
            return res.status(401).json({error:"otp incorrect"})
        }
    }
    catch(error){
        return res.status(500).json({error: error})
    }
}

const resetPassword = async(req,res) => {
    try{
        const {email, newPassword} = req.body
        if(!email || !newPassword){
            return res.status(404).json({error:"email and password are required"})
        }
        const oldUser = await Users.findOne({email})
        if(!oldUser){
            return res.status(404).json({error:"user not found"})
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        const update = await Users.findByIdAndUpdate(oldUser._id,{password:hashedPassword},
        {new:true})
        if(!update){
            return res.status(400).json({error:"password not updated"})
        } else{
            return res.status(200).json({msg:"password updated successfully", update})
        }
    }
    catch(error){
        return res.status(500).json({error:error})
    }
}

export {verifyEmail, verifyOtp, resetPassword}
