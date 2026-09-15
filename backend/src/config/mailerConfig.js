import nodemailer from 'nodemailer'
import 'dotenv/config'

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
})

const sendEmail= async (to,subject,text) =>{
    try{
        const mail = await transporter.sendMail({
            from:process.env.EMAIL_USER,
            to,
            subject,
            html:text
        })
        console.log("mail send successfully");
        

    } catch(e){
        console.log(`email not sent${e}`);
        
    }

}

export default sendEmail