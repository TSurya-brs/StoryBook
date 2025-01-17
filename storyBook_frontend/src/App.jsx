import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import StoriesPage from "./pages/StoriesPage";
import CreateStoryPage from "./pages/CreateStoryPage";
import NavBar from "./pages/NavBar";
import AccountPage from "./pages/AccountPage";
import LogoutPage from "./pages/LogoutPage";
import AuthorStoriesPage from "./pages/AuthorStoriesPage";
import DeleteStoriesPage from "./pages/DeleteStoriesPage";
import TrendingStoriesPage from "./pages/TrendingStoriesPage";

function App() {
  const authorStatus = localStorage.getItem("isAuthor");
  const [isAuthor, setIsAuthor] = useState(authorStatus === "true");
  console.log("isAuthor fromapp.jsx which is from localstorage", isAuthor);

  // Function to handle login and update isAuthor status
  const handleAuthorData = (Author) => {
    setIsAuthor(Author);
  };
  console.log("Tatta", isAuthor);

  // Private Route to ensure only logged-in users can access specific routes
  const PrivateRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem("authToken"); // Adjust based on your auth mechanism
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  // Protected Route to ensure only authors can create stories
  const ProtectedRoute = ({ children }) => {
    console.log("Protected-", isAuthor);
    return isAuthor ? (
      children
    ) : (
      <div>
        <NavBar />
        <div className="flex justify-center items-center h-screen">
          <span className="text-3xl font-bold">
            Not authorized to Create stories
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/login"
          element={<LoginPage onLogin={handleAuthorData} />}
        />
        <Route
          path="/"
          element={<Navigate to="/login" />} // This will redirect "/" to "/login"
        />

        {/* Protected Routes */}
        <Route
          path="/nav"
          element={
            <PrivateRoute>
              <NavBar />
            </PrivateRoute>
          }
        />
        <Route
          path="/stories/list"
          element={
            <PrivateRoute>
              <StoriesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/stories/trending"
          element={
            <PrivateRoute>
              <TrendingStoriesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <AccountPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <PrivateRoute>
              <LogoutPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/authorstories"
          element={
            <PrivateRoute>
              <AuthorStoriesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/delete/:storyId"
          element={
            <PrivateRoute>
              <DeleteStoriesPage />
            </PrivateRoute>
          }
        />

        {/* Create Story Route (Only for Authors) */}
        <Route
          path="/stories/create"
          element={
            <PrivateRoute>
              <ProtectedRoute>
                <CreateStoryPage />
              </ProtectedRoute>
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
