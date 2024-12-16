import React, { useState, useEffect } from "react";
import axios from "axios";

const StoriesPage = () => {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  // Fetch all stories
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get("/api/stories");
        setStories(response.data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchStories();
  }, []);

  // Handle like button click
  const handleLike = async (storyId) => {
    try {
      await axios.post(`/api/stories/${storyId}/like`);
      const updatedStories = stories.map((story) =>
        story._id === storyId ? { ...story, likes: story.likes + 1 } : story
      );
      setStories(updatedStories);
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  // Handle comment button click
  const handleComment = (story) => {
    setSelectedStory(story);
    setShowComments(true);
  };

  // Handle adding a new comment
  const handleAddComment = async (storyId) => {
    if (newComment.trim()) {
      try {
        await axios.post(`/api/stories/${storyId}/comment`, {
          comment: newComment,
        });
        const updatedStories = stories.map((story) =>
          story._id === storyId
            ? { ...story, comments: [...story.comments, newComment] }
            : story
        );
        setStories(updatedStories);
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">All Stories</h1>

      {/* Stories List */}
      <div className="space-y-6">
        {stories.map((story) => (
          <div key={story._id} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">{story.title}</h2>
            <p className="text-gray-600 mt-2">{story.content}</p>

            {/* Like Button */}
            <div className="mt-4 flex items-center space-x-4">
              <button
                onClick={() => handleLike(story._id)}
                className="flex items-center text-blue-500 hover:text-blue-700"
              >
                <img
                  src="/images/like-icon.png" // Use a like icon image
                  alt="Like"
                  className="w-6 h-6 mr-2"
                />
                <span>{story.likes}</span>
              </button>

              {/* Comments Button */}
              <button
                onClick={() => handleComment(story)}
                className="flex items-center text-green-500 hover:text-green-700"
              >
                <img
                  src="/images/comments-icon.png" // Use a comments icon image
                  alt="Comments"
                  className="w-6 h-6 mr-2"
                />
                <span>{story.comments.length} Comments</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Comment Modal/Tab */}
      {showComments && selectedStory && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Comments</h2>

            <div className="space-y-4">
              {/* Display all comments */}
              <ul>
                {selectedStory.comments.length > 0 ? (
                  selectedStory.comments.map((comment, index) => (
                    <li key={index} className="text-gray-700">
                      {comment}
                    </li>
                  ))
                ) : (
                  <li>No comments yet.</li>
                )}
              </ul>

              {/* Add New Comment */}
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Add a comment"
              ></textarea>
              <button
                onClick={() => handleAddComment(selectedStory._id)}
                className="w-full bg-blue-500 text-white p-3 rounded-lg mt-4 hover:bg-blue-600"
              >
                Add Comment
              </button>
            </div>

            <button
              onClick={() => setShowComments(false)}
              className="mt-4 w-full text-center text-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoriesPage;
