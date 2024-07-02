const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');

const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format

const app = express();

// Middleware
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT"],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Database connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Gimarach@22',
    database: 'carwash'
});

pool.on('connection', function (connection) {
    console.log('Database connection established');
});

pool.on('error', function (err) {
    console.error('Database error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        // Handle connection loss
    } else {
        throw err;
    }
});

// Configure Nodemailer
let transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
        user: 'Deogracious.Moriasi@strathmore.edu', // Your email address
        pass: 'mrgc rpew nlmd dxth'   // Your email password
    }
});

// Function to verify token (example)
function verifyToken(email, token) {
    // Implement your token verification logic here
    // This might involve checking if the token matches a stored token for the user
    // Return true if the token is valid, false otherwise
}

// Function to generate a token (for simplicity, using a random number here)
function generateToken() {
    return Math.random().toString(36).substring(2);
}

// API endpoint to handle password reset
app.post('/reset-password', (req, res) => {
    const { email, token, newPassword } = req.body;

    // Verify token (You need to implement this)
    if (!verifyToken(email, token)) {
        return res.status(400).json({ message: 'Invalid token' });
    }

    // Update user's password in the database
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).send('Database connection error');
        }

        const query = 'UPDATE client SET Password = ? WHERE EmailAddress = ?';
        connection.query(query, [newPassword, email], (error, results) => {
            connection.release(); // Release the connection back to the pool

            if (error) {
                console.error('Error updating password in the database:', error);
                return res.status(500).send('Error updating password in the database');
            }

            res.status(200).json({ message: 'Password reset successfully' });
        });
    });
});

// API for first registration process
const saltRounds = 10;
app.post('/fregister', (req, res) => {
    const sql = 'INSERT INTO client (EmailAddress, Password) VALUES (?, ?)';
    
    bcrypt.hash(req.body.Password.toString(), saltRounds, (err, hash) => {
        if (err) {
            console.error('Error during hashing Password:', err);
            return res.status(500).json({ Error: "Internal Server Error" });
        }

        const values = [
            req.body.EmailAddress,
            hash
        ];

        pool.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error during database insertion:', err);
                return res.status(500).json({ Error: "Internal Server Error" });
            }

            console.log('Registration Successful:', req.body.EmailAddress);
            return res.json({ Status: 'Success' });
        });
    });
});

// API endpoint to send password reset link
app.post('/send-reset-link', (req, res) => {
    const { email } = req.body;
    if (!email) {
        console.log('Please insert email!');
        return res.status(400).json({ message: 'Email address is required' });
    }
    const resetLink = `http://localhost:3000/reset-password?token=${generateToken()}`;

    let mailOptions = {
        from: 'Deogracious.Moriasi@strathmore.edu',
        to: email,
        subject: 'Password Reset',
        text: `Click the link to reset your password: ${resetLink}`,
        html: `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="utf-8" />
                <title>Password Reset</title>
              </head>
              <body>
                <style>
                    .logo {
                        width: 100px;
                        height: auto;
                        display: block;
                    }
                </style>
                <header><img src="https://www.shutterstock.com/image-vector/car-wash-logo-design-template-automotive-2112432932" alt="Logo"></header>
                <h1>Password Reset</h1>
                <p>Click the link below to reset your password:</p>
                <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;">
                  Reset Password
                </a>
              </body>
            </html>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Error sending email' });
        }
        console.log('Email sent successfully:', info);
        res.status(200).json({ message: 'Password reset link has been sent to your email address' });
    });
});

// API endpoint for user login
app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM client WHERE EmailAddress=?';

    pool.query(sql, [req.body.EmailAddress], (err, result) => {
        if (err) {
            console.error('Internal Server Error');
            return res.status(500).json({ Error: 'Internal Server Error' });
        }
        if (result.length > 0) {
            bcrypt.compare(req.body.Password.toString(), result[0].Password, (err, response) => {
                if (err) {
                    console.error('Error comparing Password');
                    return res.status(500).json({ Error: 'Error comparing Password' });
                }
                if (response) {
                    const EmailAddress = result[0].EmailAddress;
                    const token = jwt.sign({ EmailAddress }, "jwt-secret-key", { expiresIn: '1d' });
                    res.cookie('token', token);
                    return res.json({ Status: 'Success', token });
                } else {
                    return res.status(400).json({ Error: 'Incorrect Password' });
                }
            });
        } else {
            return res.status(404).json({ Error: 'Email does not exist' });
        }
    });
});

// API endpoint for user logout
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
});

// Start the server
const myPort = 8081;
app.listen(myPort, () => {
    console.log(`Listening on port ${myPort}`);
});
