import express from 'express';
import { registerUserController } from '../../controllers/users.controller.js';
import { checkUserReg } from '../../middleware/checkUserReg.js';

const router = express.Router();

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', checkUserReg, registerUserController);

export default router;
