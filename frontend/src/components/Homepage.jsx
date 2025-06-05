import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User, Calendar, Star, BookOpen } from 'lucide-react'; // Adjust icons

function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/toprated");
        setBlogs(res.data.blogs); // Store blogs in state
      } catch (err) {
        console.error("Error fetching blogs:", err.message);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Navigation Bar */}
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

      {/* Blog Display Section */}
      <div className="space-y-6 p-6 pt-24 flex justify-center">
        <div className="w-full max-w-3xl"> {/* Set max width for blog container */}
          {blogs.map((blog, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 mb-6">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 text-white font-bold rounded-full">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 hover:text-indigo-600 transition-colors">
                        {blog.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                        <User className="h-4 w-4" />
                        <span>{blog.username}</span>
                        <Calendar className="h-4 w-4 ml-2" />
                        <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-semibold text-yellow-700">{blog.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {blog.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
