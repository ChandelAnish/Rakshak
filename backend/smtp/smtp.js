const express =require('express')
const app=express();
const path=require('path');
const nodemailer=require('nodemailer')
app.use(express.json());


//generating OTP
function generateOTP() {
    return Math.floor(10000 + Math.random() * 90000).toString().slice(1);
}


const sendmail=async (useremail)=>{
    
    
    
    const transporter=nodemailer.createTransport({
        service:'gmail',
        port:465,//is the port to connect to (defaults to 587 if is secure is false or 465 if true)
        secure:true,
        auth:{
            user:'anish8427singh@gmail.com',//sender email
            pass:'zffugytseosamxlh'//sender email *app password
        }
    });
    
    let otp = generateOTP();
    // console.log('generated otp inside sendmail : ',otp)

let mailoptions={
    from:'anish8427singh@gmail.com',
    to:useremail,
    subject:'OTP for Rakshak web App registration :',
    text:`your OTP is ${otp} \n please don't share this code with any one`
};


try{
    const result=await transporter.sendMail(mailoptions);
    console.log("email sent ");
    return otp;
}
catch(error)
{
    console.log("email send failure\n",error)
}

}

module.exports=sendmail;
