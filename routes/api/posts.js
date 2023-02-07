import express from 'express';
import { authentication } from '../../middleware/auth.js';
import { checkPost } from '../../middleware/checkValidation.js';
import {
  createPostController,
  getAllPostsController,
  getPostByIdController,
  deletePostController,
  addPostLikeController,
  addPostUnlikeController,
} from '../../controllers/posts.controller.js';

const router = express.Router();

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', [authentication, checkPost], createPostController);

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', authentication, getAllPostsController);

// @route   GET api/posts/:post_id
// @desc    Get posts by ID
// @access  Private
router.get('/:post_id', authentication, getPostByIdController);

// @route   DELETE api/posts/:post_id
// @desc    Delete a post
// @access  Private
router.delete('/:post_id', authentication, deletePostController);

// @route   PUT api/posts/like/:post_id
// @desc    Like a post
// @access  Private
router.put('/like/:post_id', authentication, addPostLikeController);

// @route   PUT api/posts/unlike/:post_id
// @desc    Unlike a post
// @access  Private
router.put('/unlike/:post_id', authentication, addPostUnlikeController);

export default router;
