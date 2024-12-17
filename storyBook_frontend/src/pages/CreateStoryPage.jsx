import React, { useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";

const CreateStoryPage = ({ userId }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, author, content } = formData;

    if (!title || !author || !content) {
      setErrorMessage("Please fill all the fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:9000/api/stories", {
        ...formData,
        userId, // Send userId for backend authorization
      });
      setSuccessMessage("Story saved successfully!");
      setErrorMessage("");
      setFormData({ title: "", author: "", content: "" }); // Clear form
    } catch (error) {
      console.error("Error saving story:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to save the story."
      );
    }
  };

  return (
    <>
      <div>{<NavBar />}</div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
            Create Your Story
          </h1>

          {successMessage && (
            <p className="text-green-500 text-center mb-4">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Story Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter your story title"
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Author Name
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Story Content
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="6"
                placeholder="Write your story here..."
                className="w-full p-3 border rounded-lg"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
            >
              Submit Story
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateStoryPage;
