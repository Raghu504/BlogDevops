import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BookOpen } from 'lucide-react';  // Assuming you are using lucide-react for the icons

function Create() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    message: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/submitBlog", formData);
      console.log("Blog saved:", response.data.blog);
      if(response.data.status === "success"){
        navigate("/home");
      }
    } catch (error) {
      console.error("Error submitting blog:", error.message);
    }
  };

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-50 p-6 bg-gray-900 bg-opacity-80">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              BlogCraft
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="/yourblogs" className="hover:text-purple-300 transition-colors">Your Blogs</a>
            <a href="/create" className="hover:text-purple-300 transition-colors">Create</a>
          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-gray-900 text-red pt-20">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Create New Blog
              </h2>
              <p className="text-gray-600">
                Share your thoughts and ideas with the community
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Title *
                </div>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="Enter an engaging title for your blog"
                />
              </div>

              <div>
                <div className="block text-sm font-medium text-red-700 mb-2">
                  Author Name *
                </div>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <div className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Content *
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="8"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                  placeholder="Write your blog content here..."
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/home')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-indigo-600 text-red rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Publish Blog
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Create;
