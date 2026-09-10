import Users from "../models/authModel.js"
import Forget from "../models/forgotPasswordModel.js"
import otpGenerator from "otp-generator"

const verifyOtp = async(req, res)=>{
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

export {verifyOtp}
