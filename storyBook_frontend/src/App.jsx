import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import RegisterPage from "./pages/RegisterPage"; // path to RegisterPage
import LoginPage from "./pages/LoginPage"; // path to LoginPage
import StoriesPage from "./pages/StoriesPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="api/users/register" element={<RegisterPage />} />
        <Route path="api/users/login" element={<LoginPage />} />
        <Route path="api/stories/list" element={<StoriesPage />} />
      </Routes>
    </div>
  );
}

export default App;
