import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isAuthor, setIsAuthor] = useState(false); // State to hold the user's author status
  const navigate = useNavigate(); // useNavigate hook for navigation

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!email || !password) {
      setError("Please fill in both email and password");
      return;
    }

    // Check for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:9000/api/users/login",
        {
          email: email,
          password: password,
        }
      );

      const { message, token, isAuthor } = response.data;
      onLogin(isAuthor);
      console.log("from Backend the isAuthor value is ", isAuthor);

      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("isAuthor", response.data.isAuthor);
      localStorage.setItem("userEmail", response.data.email); // Store email
      localStorage.setItem("userName", response.data.name); // Store username
      // const value = localStorage.getItem("isAuthor");
      // console.log(value);

      setSuccessMessage(message);
      setError("");

      setIsAuthor(isAuthor);

      setTimeout(() => {
        navigate("/nav"); // Redirect to a default page
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setSuccessMessage("");
    }
  };

  const checkIfAuthor = () => {
    const authorStatus = localStorage.getItem("isAuthor");
    if (authorStatus === "true") {
      setIsAuthor(true);
    }
  };

  // Run this check on page load
  React.useEffect(() => {
    checkIfAuthor();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-center text-2xl font-bold text-blue-500 mb-6">
          Login
        </h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {successMessage && (
          <div className="text-green-500 text-center mb-4">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Show 'Create Story' tab only if the user is an author */}
        {/* {isAuthor && (
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate("/stories/create")}
              className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
            >
              Create Story
            </button>
          </div>
        )} */}
        <div className="text-center mt-4">
          <p className="text-gray-700">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-700 underline transition duration-200"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
