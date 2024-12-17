import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import StoriesPage from "./pages/StoriesPage";
import CreateStoryPage from "./pages/CreateStoryPage";
import NavBar from "./pages/NavBar";
import AccountPage from "./pages/AccountPage";
import LogoutPage from "./pages/LogoutPage";

function App() {
  const [isAuthor, setIsAuthor] = useState(false);

  // Fetch and update isAuthor state when the app loads or after logout
  // useEffect(() => {
  //   const authorStatus = localStorage.getItem("isAuthor");
  //   setIsAuthor(authorStatus === "true");
  // }, []); // Empty dependency array ensures this runs once on initial render

  // Function to handle logout
  const handleAuthorData = (Author) => {
    setIsAuthor(Author);
  };
  console.log("Tatta", isAuthor);

  // Protected Route to ensure only authors can create stories
  const ProtectedRoute = ({ children }) => {
    console.log("Protected-", isAuthor);
    return isAuthor ? (
      children
    ) : (
      <div>
        <NavBar />
        <h1>Not Authorized to post stories</h1>
      </div>
    );
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/login"
          element={<LoginPage onLogin={handleAuthorData} />}
        />
        <Route path="/nav" element={<NavBar />} />
        <Route path="/stories/list" element={<StoriesPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route
          path="/stories/create"
          element={
            <ProtectedRoute>
              <CreateStoryPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
