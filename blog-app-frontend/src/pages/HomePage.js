import React, { useEffect, useState } from 'react';
import BlogList from '../components/blog/BlogList';
import Pagination from '../components/blog/Pagination';
import api from '../utils/api';

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get(`/blogs?page=${pagination.page}`);
        setBlogs(res.data.data);
        setPagination({
          page: res.data.pagination.page,
          pages: res.data.pagination.pages,
          total: res.data.pagination.total
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [pagination.page]);

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Latest Blog Posts</h1>
      
      {blogs.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No blog posts yet. Be the first to create one!</p>
        </div>
      ) : (
        <>
          <BlogList blogs={blogs} />
          <Pagination 
            currentPage={pagination.page} 
            totalPages={pagination.pages} 
            onPageChange={handlePageChange} 
          />
        </>
      )}
    </div>
  );
};

export default HomePage;