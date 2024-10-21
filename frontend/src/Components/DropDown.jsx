import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import TokenContext from "../Context/TokenContext";

const DropDown = () => {
  const name = localStorage.getItem("name");
  const navigate = useNavigate();

  const {setToken} = useContext(TokenContext);

  const handleLogout = () => {
    // Clear the token and any relevant data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("company_email");
    // Redirect to the login or home page
    navigate("/"); // Change to your desired route
    setToken("");
  };

  return (
    <div>
      <select
        id="user-options"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        onChange={(e) => {
          if (e.target.value === "Logout") {
            handleLogout();
          }
        }}
      >
        <option value={JSON.parse(name)}>{JSON.parse(name)}</option>
        <option value="Logout">Logout</option>
      </select>
    </div>
  );
};

export default DropDown;
