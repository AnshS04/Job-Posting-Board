import React, { useState } from "react";
import RegisterFormInput from "./RegisterFormInput";
import axios from "axios";
import Loader from "./Loader";
import OTPForm from "./OTPForm";

const RegisterForm = () => {
    const [name, setName] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [employeeSize, setEmployeeSize] = useState("");
    const [loading, setLoading] = useState(false);
    const [registered, setRegistered] = useState(false);

    const registerCompany = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const response = await axios.post(
              "http://localhost:5000/api/register", // Ensure correct URL
              {
                registrant_name: name, // Use your state variables for data
                mobile: phoneNum,
                company_name: companyName,
                company_email: companyEmail,
                employee_size: employeeSize,
              },
              {
                headers: {
                  "Content-Type": "application/json", // Optional: Axios sets this by default for JSON
                  // You can add Authorization or other headers here if needed
                },
              }
            );
            setLoading(false);
            console.log("Success:", response.data);
            localStorage.setItem("company_email", JSON.stringify(companyEmail));
            localStorage.setItem("name", JSON.stringify(name));
            alert(response.data.message);
            setRegistered(true);
        } catch (error) {
            alert(error.response.data.message);
            setLoading(false);
        }
    }

    const userSVG = (
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
          strokeWidth="2"
          d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
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

    const employeeSizeSVG = (
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
          d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
        />
      </svg>
    );


  return (
    <div className="flex flex-col w-1/3 border-2 rounded-lg border-blue-200 p-5">
      <div className="flex flex-col justify-center items-center pb-5">
        <p className="text-xl font-bold">Sign Up</p>
        <p>Lorem Ipsum is simply dummy text</p>
      </div>

      {registered ? (
        <OTPForm />
      ) : (
        <div>
          <div className="flex flex-col space-y-2 pb-5">
            <RegisterFormInput
              placeholder={"Name"}
              svg={userSVG}
              value={name}
              setValue={setName}
              type={"text"}
            />
            <RegisterFormInput
              placeholder={"Phone No."}
              svg={phoneSVG}
              value={phoneNum}
              setValue={setPhoneNum}
              type={"text"}
            />
            <RegisterFormInput
              placeholder={"Company Name"}
              svg={userSVG}
              value={companyName}
              setValue={setCompanyName}
              type={"text"}
            />
            <RegisterFormInput
              placeholder={"Company Email"}
              svg={emailSVG}
              value={companyEmail}
              setValue={setCompanyEmail}
              type={"email"}
            />
            <RegisterFormInput
              placeholder={"Employee Size"}
              svg={employeeSizeSVG}
              value={employeeSize}
              setValue={setEmployeeSize}
              type={"text"}
            />
          </div>
          <div className="flex flex-col justify-center items-center space-y-2">
            <p className="text-center w-3/4">
              By clicking on proceed you will accept our{" "}
              <span className="text-blue-600">Terms</span> &
              <span className="text-blue-600"> Conditions</span>
            </p>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none w-full"
              onClick={registerCompany}
            >
              {loading ? (
                <Loader w={"15px"} h={"15px"} />
              ) : (
                <span>Proceed</span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
