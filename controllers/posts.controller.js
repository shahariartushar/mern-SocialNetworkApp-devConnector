import { validationResult } from 'express-validator';
import { Post } from '../models/Post.js';
import { Profile } from '../models/Profile.js';
import { User } from '../models/User.js';

export const createPostController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');

    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    });

    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getAllPostsController = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getPostByIdController = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(400).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);

    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
};

export const deletePostController = async (req, res) => {
  try {
    // @todo - remove a post

    const post = await Post.findById(req.params.post_id);

    // Check post
    if (!post) {
      return res.status(400).json({ msg: 'Post not found' });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorised' });
    }

    await post.remove();

    res.json({ msg: 'Post Deleted' });
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Post not found' });
    }

    res.status(500).send('Server Error');
  }
};

export const addPostLikeController = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // Check post
    if (!post) {
      return res.status(400).json({ msg: 'Post not found' });
    }

    // Check the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Post not found' });
    }

    res.status(500).send('Server Error');
  }
};

export const addPostUnlikeController = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // Check post
    if (!post) {
      return res.status(400).json({ msg: 'Post not found' });
    }

    // Check the post hasn't yet been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Post not found' });
    }

    res.status(500).send('Server Error');
  }
};
