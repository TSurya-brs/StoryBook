import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ userEmail, userName }) => {
  return (
    <>
      <nav className="flex justify-between items-center bg-blue-600 p-4">
        <h1 className="text-3xl font-bold">storyBook</h1>
        <div className="flex space-x-4">
          <Link to="/stories/list" className="text-white">
            Stories
          </Link>
          <Link to="/stories/create" className="text-white">
            Create Story
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-white">
            <span>{userEmail}</span> | <span>{userName}</span>
          </div>
          <Link to="/account" className="text-white">
            Account
          </Link>
          <Link
            to="/logout" // Navigate to logout page
            className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </Link>
        </div>
      </nav>
      {location.pathname === "/nav" && (
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="text-4xl font-bold mb-4">Welcome to StoryBook</div>
          <div className="text-1xl font-bold mb-4">Explore stories</div>
        </div>
      )}
    </>
  );
};

export default NavBar;
