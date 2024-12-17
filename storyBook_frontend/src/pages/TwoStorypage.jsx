import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import StoriesPage from "./StoriesPage";
import CreateStoryPage from "./CreateStoryPage";
import AccountPage from "./AccountPage";
import NavBar from "./NavBar";

const TwoStoryPage = () => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const authorStatus = localStorage.getItem("isAuthor");
    setIsAuthor(authorStatus === "true");
    setUserEmail(localStorage.getItem("userEmail") || "Not Available");
    setUserName(localStorage.getItem("userName") || "Not Available");
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAuthor");
    setToken(null);
    navigate("/"); // Redirect to login page
  };

  const ProtectedRoute = ({ children }) => {
    if (!isAuthor) {
      return (
        <div className="text-red-500 text-center mt-10">
          Not Authorized to create stories
        </div>
      );
    }
    return children;
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Fixed Navbar */}
      <NavBar
        userEmail={userEmail}
        userName={userName}
        onLogout={handleLogout}
      />

      {/* Page Content */}
      <div className="flex-1 p-4">
        <Routes>
          <Route path="/stories/list" element={<StoriesPage />} />
          <Route
            path="/stories/create"
            element={
              <ProtectedRoute>
                <CreateStoryPage />
              </ProtectedRoute>
            }
          />
          <Route path="/account" element={<AccountPage />} />
          <Route path="*" element={<div>Welcome to the Stories Page!</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default TwoStoryPage;
