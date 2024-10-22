import React, { useState } from "react";
import axios from "axios";
import CandidateBadge from "./CandidateBadge";

const JobForm = () => {
  const [candidates, setCandidates] = useState([]);
  const [candidate, setCandidate] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [level, setLevel] = useState("Entry Level");
  const [endDate, setEndDate] = useState("");

  const addCandidate = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (candidate.trim() && emailPattern.test(candidate)) {
      // Ensure candidate is not empty
      setCandidates((prevCandidates) => [...prevCandidates, candidate]);
      setCandidate(""); // Reset input field after adding
    } else {
      alert("Enter a valid candidate email.");
    }
  };

  

  const handleSubmit = async () => {
    const jobData = {
      title: title,
      description: desc,
      experienceLevel: level,
      endDate: endDate,
      candidates: candidates,
    };

    // Retrieve the token from localStorage
    const token = JSON.parse(localStorage.getItem("token"));

    try {
      // Make an Axios POST request with 'Authorization' header
      const response = await axios.post(
        "http://localhost:5000/api/postJob",
        jobData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token here
          },
        }
      );

      alert("Job posted successfully!");
      console.log("Response:", response.data);

      // Clear form fields after successful submission
      setTitle("");
      setDesc("");
      setLevel("Entry Level");
      setEndDate("");
      setCandidates([]);
    } catch (error) {
      console.error("Error posting job:", error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col space-y-5 w-1/2">
      <div className="flex justify-between items-center space-x-2">
        <label htmlFor="job-title" className="text-2xl w-1/2 text-right">
          Job Title
        </label>
        <input
          id="job-title"
          type="text"
          className="border-2 border-gray-600 w-1/2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex justify-between space-x-2">
        <label htmlFor="job-description" className="text-2xl w-1/2 text-right">
          Job Description
        </label>
        <textarea
          id="job-description"
          rows="3"
          className="border-2 border-gray-600 w-1/2"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
      </div>

      <div className="flex justify-between items-center space-x-2">
        <label htmlFor="experience-level" className="text-2xl w-1/2 text-right">
          Experience Level
        </label>
        <select
          id="experience-level"
          className="border-2 border-gray-600 w-1/2"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="Entry Level">Entry Level</option>
          <option value="Mid Level">Mid Level</option>
          <option value="Senior Level">Senior Level</option>
        </select>
      </div>

      <div className="flex justify-between items-center space-x-2">
        <label htmlFor="add-candidate" className="text-2xl w-1/2 text-right">
          Add Candidate
        </label>
        <div className="w-1/2 flex flex-row items-center space-x-2">
          <input
            id="add-candidate"
            type="text"
            className="border-2 border-gray-600 w-full"
            value={candidate} // Control the input value
            onChange={(e) => setCandidate(e.target.value)}
          />
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
            onClick={addCandidate}
          >
            Add
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center space-x-2">
        <label
          htmlFor="candidates-list"
          className="text-2xl w-1/2 text-right"
        ></label>
        <div
          id="candidates-list"
          className="border-2 border-gray-600 w-1/2 min-h-16 max-h-16 flex flex-row flex-wrap overflow-y-auto"
          style={{
            whiteSpace: "normal", // Allow wrapping
            overflowWrap: "break-word", // Prevent overflow
          }}
        >
          {candidates.map((candidateEmail, index) => (
            <div key={index}>
              <CandidateBadge
                candidateEmail={candidateEmail}
                // removeCandidate={removeCandidate} // Corrected prop name
                candidates={candidates}
                setCandidates={setCandidates}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center space-x-2">
        <label htmlFor="end-date" className="text-2xl w-1/2 text-right">
          End Date
        </label>
        <input
          id="end-date"
          type="date"
          className="border-2 border-gray-600 w-1/2"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className="flex justify-end w-full mt-auto">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
          onClick={handleSubmit}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default JobForm;
