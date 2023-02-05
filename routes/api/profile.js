import express from 'express';
import { authentication } from '../../middleware/auth.js';
import {
  getProfileController,
  createOrUpdateProfileController,
  getAllProfileController,
  getProfileByUserIdController,
  deleteProfileController,
} from '../../controllers/profile.controller.js';
import { checkUserProfile } from '../../middleware/checkValidation.js';

const router = express.Router();

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
router.get('/me', authentication, getProfileController);

// @route   POST api/profile
// @desc    Create or Update user profile
// @access  Private
router.post(
  '/',
  [authentication, checkUserProfile],
  createOrUpdateProfileController,
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', getAllProfileController);

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get('/user/:user_id', getProfileByUserIdController);

// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private
router.delete('/', authentication, deleteProfileController);

export default router;
