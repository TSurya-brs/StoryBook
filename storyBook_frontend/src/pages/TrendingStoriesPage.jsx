import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";

const TrendingPage = () => {
  const [trendingStories, setTrendingStories] = useState([]);

  // Fetch trending stories
  useEffect(() => {
    const fetchTrendingStories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/api/stories/trending"
        );
        setTrendingStories(response.data);
      } catch (error) {
        console.error("Error fetching trending stories:", error);
      }
    };

    fetchTrendingStories();
  }, []);

  return (
    <>
      <NavBar />
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8">
          Trending Stories
        </h1>

        {trendingStories.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            No stories available.
          </div>
        ) : (
          <div className="space-y-6">
            {trendingStories.map((story) => (
              <div
                key={story._id}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-300"
              >
                <h2 className="text-3xl font-semibold mb-2">
                  Title: {story.title}
                </h2>
                <p className="text-lg text-gray-1000 mb-4">
                  Story: {story.content}
                </p>
                <p className="text-sm text-gray-800 mb-2">
                  Author: {story.author}
                </p>
                <div className="flex items-center justify-between mt-4">
                  {/* <span className="text-lg font-bold text-blue-500">
                    Trending #{story.trending}
                  </span> */}
                  <span></span>
                  <span className="text-lg text-gray-800">
                    Likes: {story.likes}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TrendingPage;
