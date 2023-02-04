import express from 'express';
import { authentication } from '../../middleware/auth.js';
import {
  getProfileController,
  createOrUpdateProfileController,
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

export default router;
