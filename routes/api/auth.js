import express from 'express';
import { loginUserController } from '../../controllers/users.controller.js';
import { authentication } from '../../middleware/auth.js';
import { authUserController } from '../../controllers/auth.controller.js';
import { checkUserLogin } from '../../middleware/checkUserReg.js';

const router = express.Router();

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', authentication, authUserController);

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post('/', checkUserLogin, loginUserController);

export default router;
