import express from 'express';
import { authentication } from '../../middleware/auth.js';
import {
  getAuthProfileController,
  createOrUpdateProfileController,
  getAllProfilesController,
  getProfileByUserIdController,
  deleteProfileController,
  addProfileExperienceController,
  deleteProfileExperienceController,
  addProfileEducationController,
  deleteProfileEducationController,
  getGithubReposController,
} from '../../controllers/profile.controller.js';
import {
  checkUserProfile,
  checkUserProfileExp,
  checkUserProfileEducation,
} from '../../middleware/checkValidation.js';

const router = express.Router();

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
router.get('/me', authentication, getAuthProfileController);

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
router.get('/', getAllProfilesController);

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get('/user/:user_id', getProfileByUserIdController);

// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private
router.delete('/', authentication, deleteProfileController);

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
  '/experience',
  [authentication, checkUserProfileExp],
  addProfileExperienceController,
);

// @route   PUT api/profile/experience/:experience_id
// @desc    Delete profile experience
// @access  Private
router.delete(
  '/experience/:experience_id',
  authentication,
  deleteProfileExperienceController,
);

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
  '/education',
  [authentication, checkUserProfileEducation],
  addProfileEducationController,
);

// @route   PUT api/profile/education/:education_id
// @desc    Delete profile education
// @access  Private
router.delete(
  '/education/:education_id',
  authentication,
  deleteProfileEducationController,
);

// @route   GET api/profile/github/:username
// @desc    Get user repos from github
// @access  Public
router.get('/github/:username', getGithubReposController);

export default router;
