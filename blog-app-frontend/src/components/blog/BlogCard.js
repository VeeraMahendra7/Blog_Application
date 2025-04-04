import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  // Create excerpt from content
  const createExcerpt = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, content.lastIndexOf(' ', maxLength)) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 hover:text-blue-600 transition-colors">
          <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
        </h2>
        
        <div className="text-sm text-gray-600 mb-4">
          <span>By {blog.author ? blog.author.name : 'Unknown'}</span>
          <span className="mx-2">•</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
        
        <p className="text-gray-700 mb-4">
          {createExcerpt(blog.content)}
        </p>
        
        <Link
          to={`/blogs/${blog._id}`}
          className="inline-block text-blue-600 hover:text-blue-800 hover:underline"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;