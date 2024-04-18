router.post('/login', (req, res) => {
//     const { email, password } = req.body;

//     // Validate user credentials and fetch usertype from the database
//     connectDB.query('SELECT * FROM rakshakdb.userinfo WHERE email = ? AND password = ?', [email, password], (err, rows) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).json({ login: false, msg: 'Internal server error' });
//         }

//         if (rows.length < 1) {
//             return res.status(401).json({ login: false, msg: 'Incorrect email or password' });
//         }

//         const { usertype } = rows[0]; // Assuming `usertype` is retrieved from the database

//         // Return login success with usertype
//         return res.status(200).json({ login: true, usertype: usertype });
//     });
// });