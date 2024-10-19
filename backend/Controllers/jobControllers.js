const Company = require("../Models/Company");
const Job = require("../Models/Job");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service (Gmail, Outlook, etc.)
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

const sendEmails = async (emailArray, subject, text) => {
  try {
    for (const email of emailArray) {
      const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: email, // Recipient address
        subject: subject, // Subject line
        text: text, // Plain text body
      };

      // Send email
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${email}`);
    }
  } catch (error) {
    console.error("Error sending emails:", error);
  }
};

const postJob = async (req, res) => {
  const { title, description, experienceLevel, endDate, candidates } = req.body;

  try {
    const newJob = new Job({
      title,
      description,
      experienceLevel,
      endDate,
      companyId: req.company.id,
      candidates,
    });

    await newJob.save();

    const company = await Company.findOne({ id: req.company._id });
    const company_name = company.company_name;
    const subject = `New job opening in ${company_name}.`;
    const text = `Job Title: ${title}
Job Description: ${description}
Experience Level: ${experienceLevel}
Last Date to apply: ${endDate}
Company Email: ${company.company_email}
Company Employee Size: ${company.employee_size}`;
    sendEmails(candidates, subject, text);

    res.status(201).json({ message: "Job posted successfully" });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { postJob };
