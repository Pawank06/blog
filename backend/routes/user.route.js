import express from 'express';
import { loginUser, registerUser } from '../controllers/user.controller.js';

const router = express.Router();

// register user route
router.post('/register', registerUser)

// register user route
router.post('/login', loginUser)

export {router as usersRoutes}