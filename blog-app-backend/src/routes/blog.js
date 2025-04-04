const express = require('express');
const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blog');
const { protect, checkBlogOwnership } = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .get(getBlogs)
  .post(protect, createBlog);

router.route('/:id')
  .get(getBlog)
  .put(protect, checkBlogOwnership, updateBlog)
  .delete(protect, checkBlogOwnership, deleteBlog);

module.exports = router;