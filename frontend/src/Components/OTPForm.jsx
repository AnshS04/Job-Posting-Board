import React, { useContext, useState } from 'react'
import RegisterFormInput from './RegisterFormInput';
import Loader from './Loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TokenContext from '../Context/TokenContext';

const OTPForm = () => {

    const [emailOTP, setEmailOTP] = useState("");
    const [mobileOTP, setMobileOTP] = useState("");
    const [emailLoading, setEmailLoading] = useState(false);
    const [mobileLoading, setMobileLoading] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [mobileVerified, setMobileVerified] = useState(false);

    const navigate = useNavigate();

    const { setToken} = useContext(TokenContext);

    const verifyEmailOTP = async (e) => {
        setEmailLoading(true);
        e.preventDefault();
        const companyEmail = localStorage.getItem("company_email");
    
        try {
          const response = await axios.post(
            "http://localhost:5000/api/verifyEmail", // Ensure correct URL
            {
              email: JSON.parse(companyEmail),
              otp: emailOTP,
            },
            {
              headers: {
                "Content-Type": "application/json", // Optional: Axios sets this by default for JSON
                // You can add Authorization or other headers here if needed
              },
            }
          );
          setEmailLoading(false);
          console.log("Success:", response.data);
          alert(response.data.message);
          setEmailVerified(true);

          if (mobileVerified) {
            navigate("/dashboard");
            localStorage.setItem("token", JSON.stringify(response.data.token));
            setToken(response.data.token);
          }
        } catch (error) {
          console.error(
            "Error:",
            error.response?.data || error.message || error
          );
          setEmailLoading(false);
        }
    };

    const verifyMobileOTP = async (e) => {
        setMobileLoading(true);
        e.preventDefault();
        const companyEmail = localStorage.getItem("company_email");

        try {
          const response = await axios.post(
            "http://localhost:5000/api/verifyPhone", // Ensure correct URL
            {
              email: JSON.parse(companyEmail),
              otp: mobileOTP,
            },
            {
              headers: {
                "Content-Type": "application/json", // Optional: Axios sets this by default for JSON
                // You can add Authorization or other headers here if needed
              },
            }
          );
          setMobileLoading(false);
          console.log("Success:", response.data);
          setMobileVerified(true);
          
          if (emailVerified) {
            navigate("/dashboard");
            localStorage.setItem("token", JSON.stringify(response.data.token));
            setToken(response.data.token);
          }
            alert(response.data.message);
        } catch (error) {
          console.error(
            "Error:",
            error.response?.data || error.message || error
          );
          setMobileLoading(false);
        }
    }

    const emailSVG = (
      <svg
        className="w-6 h-6 text-gray-800"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
          d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
        />
      </svg>
    );

    const phoneSVG = (
      <svg
        className="w-6 h-6 text-gray-800"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z"
        />
      </svg>
    );

  return (
    <div>
      <div className="flex flex-col space-y-2 mb-5">
        <RegisterFormInput
          placeholder={"Email OTP"}
          svg={emailSVG}
            value={emailOTP}
            setValue={setEmailOTP}
        />

        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none w-full"
            onClick={verifyEmailOTP}
        >
          {/* Verify */}
          {emailLoading ? <Loader w={"15px"} h={"15px"} /> : <span>Verify</span>}
        </button>
      </div>

      <div className="flex flex-col space-y-2">
        <RegisterFormInput
          placeholder={"Mobile OTP"}
          svg={phoneSVG}
            value={mobileOTP}
            setValue={setMobileOTP}
        />

        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none w-full"
            onClick={verifyMobileOTP}
        >
          {mobileLoading ? <Loader w={"15px"} h={"15px"} /> : <span>Verify</span>}
        </button>
      </div>
    </div>
  );
}

export default OTPForm
