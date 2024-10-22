# Job Posting Application

This is a full-stack job posting application where company officials can register their companies, post jobs, and manage candidate outreach. The application includes features like automated email notifications to candidates and OTP-based email and phone verification.

## Features

- **Company Registration**: Register a company with email and phone verification through OTP.
- **Job Posting**: Post job opportunities within the registered company.
- **Auto Email**: Automatically send emails to candidates listed by the company.
- **Email and Phone Verification**: Ensures authenticity of registration via OTP (email and phone verification using Twilio).

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js
- MongoDB (or a cloud-hosted MongoDB database like MongoDB Atlas)
- Twilio account (for phone verification)

### Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/AnshS04/Job-Posting-Board
```

2. Install dependencies for both frontend and backend:

   Navigate to the `frontend` directory and install the required packages:

   ```bash
   cd frontend
   npm install
   ```

   Now, navigate to the `backend` directory and install the backend dependencies:

   ```bash
   cd ../backend
   npm install
   ```

3. Set up your environment variables:

   Create a `.env` file in the `backend` directory with the following variables:

   ```
   PORT=5000
   MONGO_URI=your_mongo_uri
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_app_password
   CLIENT_URL=http://localhost:3000
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   TWILIO_VERIFY_SERVICE_SID=your_twilio_verify_service_sid
   ```

   - You will need to create an account with [Twilio](https://www.twilio.com/) and generate the required `TWILIO_*` variables. Twilio offers free credits for new users to purchase a phone number for verification purposes.

4. Run the application:

   - Start the **frontend** server (on port 3000):

     ```bash
     cd frontend
     npm start
     ```

   - Start the **backend** server (on port 5000):

     ```bash
     cd ../backend
     nodemon server.js
     ```

   The frontend will be running at `http://localhost:3000` and the backend at `http://localhost:5000`.

### Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Email Service**: Nodemailer
- **Phone Verification**: Twilio
