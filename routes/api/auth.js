import express from 'express';
import { loginUserController } from '../../controllers/users.controller.js';
import { authentication } from '../../middleware/auth.js';
import { getAuthUserController } from '../../controllers/auth.controller.js';
import { checkUserLogin } from '../../middleware/checkValidation.js';

const router = express.Router();

// @route   GET api/auth
// @desc    Get Auth User
// @access  Public
router.get('/', authentication, getAuthUserController);

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post('/', checkUserLogin, loginUserController);

export default router;
