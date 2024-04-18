const express = require('express')
const router = express.Router();
const mysql = require("mysql2")
const cors = require('cors');
const app = express();
app.use(cors());

const sendmail = require('../smtp/smtp')

const connectDB = require('../connectionDB/connectionDB')

router.get('/', (req, res) => {
    res.send('hello');
})

//login
router.post('/login', (req, res) => {
    console.log(req.body)
    if (!req.body.email || !req.body.password) {
        return res.status(401).json({ login: false, msg: 'enter all credentials' })
    }
    connectDB.query('select * from rakshakdb.userinfo where email=?', [req.body.email], (err, row) => {
        if (err) {
            console.log(err);
        }
        else {
            if (row.length < 1) {
                return res.status(200).json({ login: false, msg: 'not found' })
            }
            else {
                connectDB.query('select password,usertype from rakshakdb.userinfo where email=?', [req.body.email], (err, row) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(row)
                        if (row[0].password == req.body.password) {
                            return res.status(200).json({ login: true, msg: 'login successful',usertype:row[0].usertype})
                        }
                        else {
                            return res.status(401).json({ login: false, msg: 'incorrect user credentials' })
                        }
                    }
                })
            }
        }
    })
})


let otp;

//sign up
router.post('/signup', async(req, res) => {
    // console.log(req.body)
    const { firstname, lastname, email, password, usertype } = req.body;
    //check for all credintials
    if (!firstname || !lastname || !email || !password || !usertype) {
        return res.status(401).json({ signup: false, msg: 'enter all credentials' })
    }


    // //check for password matches confirm password
    // if (password != confirmpassword) {
    //     return res.status(401).json({ signup: false, msg: "password doesn't matched" })
    // }

    //check for already registered email
    connectDB.query('select * from rakshakdb.userinfo where email=?', [email], async (err, row) => {
        if (err) {
            console.log(err);
        }
        else if (row.length > 0) {
            return res.status(403).json({ signup: false, msg: 'email already exists' })
        }
        else {
            connectDB.query('insert into userinfo values(?,?,?,?,?)', [firstname, lastname, email, password, usertype], async (err, row) => {
                if (err) {
                    console.log(err);
                }
                else {
                    // console.log(row);
                    otp=await sendmail(email);
                    return res.status(200).json({ signup: true, msg: "signed up successfully" })
                }
            })
        }
    })
})



router.post('/otpverification', async (req, res) => {
    // console.log(req.body);
    // console.log("generated otp inside /otpverification ",otp)
    if (req.body.userotp == otp) {
        return res.status(200).json({ email: 'email verified' })
    }
    return res.status(401).json({ email: 'email unverified' })
})


router.post('/userlocation',(req, res) => {
    const {latitude,longitude}=req.body;
    // console.log(req.body)
    connectDB.query('insert into rakshakdb.userslocation(latitude,longitude) values(?,?);',[latitude,longitude],(err,row)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(row);
        }
    })
})



router.get('/userlocation',(req, res) => {
    const {latitude,longitude}=req.body;
    // console.log(req.body)
    connectDB.query('select * from rakshakdb.userslocation;',(err,row)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(...row);
            res.status(200).json({...row})
        }
    })
})


module.exports = { router };