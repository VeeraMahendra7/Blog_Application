import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogForm from '../components/blog/BlogForm';
import { AuthContext } from '../context/AuthContext';

const CreateBlogPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const initialBlogData = {
    title: '',
    content: ''
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Create New Blog Post</h1>
      <BlogForm blogData={initialBlogData} isEditing={false} />
    </div>
  );
};

export default CreateBlogPage;