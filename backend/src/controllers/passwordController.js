import Users from "../models/authModel.js"
import Forget from "../models/forgotPasswordModel.js"
import otpGenerator from "otp-generator"
import bcrypt from "bcrypt"
import sendEmail from "../config/mailerConfig.js"

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
        } else{
            const newotp = await Forget.create({email,otp})
        }
       await sendEmail(email,"Password Reset",`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Email</title>

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f8;
      color: #333;
      padding: 40px 20px;
    }

    .email-wrapper {
      max-width: 600px;
      margin: auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
    }

    .header {
      background-color: #17231d;
      padding: 28px;
      text-align: center;
    }

    .logo {
      color: #ffffff;
      font-size: 24px;
      font-weight: bold;
    }

    .content {
      padding: 40px 35px;
      text-align: center;
    }

    .icon {
      width: 60px;
      height: 60px;
      margin: 0 auto 20px;
      background-color: #e8f0eb;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
    }

    h1 {
      font-size: 26px;
      margin-bottom: 15px;
      color: #17231d;
    }

    .message {
      font-size: 15px;
      line-height: 1.6;
      color: #666;
      margin-bottom: 25px;
    }

    .otp-box {
      background-color: #f7f8f7;
      border: 1px dashed #3f6e58;
      border-radius: 10px;
      padding: 20px;
      margin: 25px 0;
    }

    .otp-label {
      font-size: 13px;
      color: #777;
      margin-bottom: 8px;
    }

    .otp {
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 8px;
      color: #3f6e58;
    }

    .expiry {
      font-size: 13px;
      color: #888;
      margin-bottom: 25px;
    }

    .security-note {
      background-color: #fff8e8;
      border-radius: 8px;
      padding: 15px;
      text-align: left;
      font-size: 13px;
      line-height: 1.5;
      color: #75623b;
    }

    .footer {
      background-color: #f7f8f7;
      padding: 22px;
      text-align: center;
      font-size: 12px;
      color: #999;
      line-height: 1.6;
    }

    @media (max-width: 500px) {
      .content {
        padding: 30px 20px;
      }

      h1 {
        font-size: 23px;
      }

      .otp {
        font-size: 27px;
        letter-spacing: 6px;
      }
    }
  </style>
</head>

<body>

  <div class="email-wrapper">

    <div class="header">
      <div class="logo">YourApp</div>
    </div>

    <div class="content">

      <div class="icon">🔐</div>

      <h1>Reset Your Password</h1>

      <p class="message">
        We received a request to reset your password.
        Use the verification code below to create a new password.
      </p>

      <div class="otp-box">
        <p class="otp-label">Your verification code</p>
        <div class="otp">${otp}</div>
      </div>

      <p class="expiry">
        This OTP will expire in <strong>10 minutes</strong>.
      </p>

      <div class="security-note">
        <strong>Didn't request a password reset?</strong><br>
        If you didn't make this request, you can safely ignore this
        email. Your password will remain unchanged.
      </div>

    </div>

    <div class="footer">
      This is an automated email. Please do not reply to this message.<br>
      © 2026 YourApp. All rights reserved.
    </div>

  </div>

</body>
</html>
`)

        return res.status(201).json({msg:"otp sent"})
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
