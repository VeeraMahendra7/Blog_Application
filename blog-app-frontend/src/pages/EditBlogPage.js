import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogForm from '../components/blog/BlogForm';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

const EditBlogPage = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(AuthContext);

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${id}`);
        const fetchedBlog = res.data.data;
        
        // Check if user is the author
        if (user.id !== fetchedBlog.author._id) {
          navigate('/');
          return;
        }
        
        setBlog(fetchedBlog);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setLoading(false);
        navigate('/');
      }
    };

    fetchBlog();
  }, [id, navigate, isAuthenticated, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Blog Post</h1>
      {blog && <BlogForm blogData={blog} isEditing={true} />}
    </div>
  );
};

export default EditBlogPage;