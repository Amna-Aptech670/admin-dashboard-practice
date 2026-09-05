import Users from "../models/authModel.js"
import bcrypt from "bcrypt"

const login = async(req,res)=>{
    const{email,password}= req.body
    const check = await Users.findOne({email}).select("+password")
    if(check){
        var checkPassword= await bcrypt.compare(password, check.password)
        if(!checkPassword){
            return res.status(401).json({error:"Email or Password is incorrect"})
        } else{
            return res.status(200).json({msg:"User login successfully", check})
        }
    } else{
        res.status(404).json({msg:"User not found"})
    }
}

const register= async(req, res) => {
    try{
        const{name, email, password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({msg:"All fields are required"})
        }
        const passwordRegex = /^.{6,}$/
        if(!passwordRegex.test(password)){
            return res.status(400).json({msg:"Password must contain atleat 6 characters"})
        }
        const oldUsers = await Users.findOne({email})
        if(oldUsers){
            return res.status(409).json({msg:"User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const addUsers = await Users.create({name, email, password:hashedPassword})
        return res.status(201).json({msg:"User Registered successfully", addUsers})
    } catch(error){
        return res.status(500).json({msg:error.message})
    }
}

export {login, register}