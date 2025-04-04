import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const BlogForm = ({ blogData, isEditing }) => {
  const [formData, setFormData] = useState({
    title: blogData.title || '',
    content: blogData.content || ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear field error when user starts typing
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title) {
      errors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      errors.title = 'Title cannot be more than 100 characters';
    }
    
    if (!formData.content) {
      errors.content = 'Content is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setError(null);
      
      try {
        if (isEditing) {
          await api.put(`/blogs/${blogData._id}`, formData);
          navigate(`/blogs/${blogData._id}`);
        } else {
          const res = await api.post('/blogs', formData);
          navigate(`/blogs/${res.data.data._id}`);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred. Please try again.');
        setIsSubmitting(false);
      }
    }
  };

  const handleCancel = () => {
    if (isEditing) {
      navigate(`/blogs/${blogData._id}`);
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            formErrors.title ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          placeholder="Enter blog title"
        />
        {formErrors.title && (
          <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows="12"
          value={formData.content}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            formErrors.content ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          placeholder="Write your blog content here..."
        ></textarea>
        {formErrors.content && (
          <p className="mt-1 text-sm text-red-600">{formErrors.content}</p>
        )}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Cancel
        </button>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting
            ? isEditing ? 'Updating...' : 'Publishing...'
            : isEditing ? 'Update Blog' : 'Publish Blog'}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;