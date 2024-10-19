const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  registrant_name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  company_email: {
    type: String,
    required: true,
    unique: true,
  },
  employee_size: {
    type: String,
  },
  email_otp: {
    type: String,
  },
  phone_otp: {
    type: String,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  phone_verified: {
    type: Boolean,
    default: false,
  }
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
