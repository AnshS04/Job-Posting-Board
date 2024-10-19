const Company = require('../Models/Company');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const jwt = require('jsonwebtoken');

const registerCompany = async (req, res) => {
    try {
        const { registrant_name, mobile, company_name, company_email, employee_size } = req.body;

        const existingCompany = await Company.findOne({ company_email });
        if (existingCompany) return res.status(400).json({ message: 'Company already exists' });

        const generateOTP = () => {
            return Math.floor(100000 + Math.random() * 900000);
        };

        const email_otp = generateOTP();
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: company_email,
            subject: 'Your OTP Code',
            text: `Your OTP is: ${email_otp}`,
        };
        
        await transporter.sendMail(mailOptions);

        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = new twilio(accountSid, authToken);

        const phone_otp = generateOTP();

        const message = await client.messages.create({
            body: `Your OTP is: ${phone_otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,  // Your Twilio phone number
            to: mobile                         // Receiver's phone number (include country code)
        });

        const company = new Company({
            registrant_name,
            mobile,
            company_name,
            company_email,
            employee_size,
            email_otp,
            phone_otp
        });
        
        await company.save();
        res.status(201).json({ message: 'Company registered!' });    
    } catch (error) {
        console.error(error);
    }
};

const verifyEmail = async (req, res) => {
    try {
        const {email, otp} = req.body;
        console.log(email);
        const company = await Company.findOne({ company_email: email });
        console.log(company.company_name);
        if (otp == company.email_otp) {  // Assuming you are using 'otp' in the Company schema for email OTP
            company.email_verified = true; // Mark the email as verified
            await company.save();  // Save changes to the database

            if(company.phone_verified) {
                const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, {
                    expiresIn: '7d'
                });

                return res.status(200).json({ message: "Email and Phone verified", token: token });
            }

            return res.status(200).json({ message: "Email verified" });
        } else {
            return res.status(400).json({ message: "Invalid OTP" });
        }
    } catch (error) {
        console.error(error);
    }
};

const verifyPhone = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const company = await Company.findOne({ company_email: email });

        if (otp == company.phone_otp) {
            company.phone_verified = true;
            await company.save();

            if (company.email_verified) {
                const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                });

                return res.status(200).json({ message: "Email and Phone verified", token: token });
            }

            return res.status(200).json({ message: "Phone verified" });
        } else {
            return res.status(400).json({ message: "Invalid OTP" });
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = {registerCompany, verifyEmail, verifyPhone};