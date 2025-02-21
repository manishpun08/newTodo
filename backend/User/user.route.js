import express from 'express';
import {
  loginUserValidationSchema,
  validationSchema,
} from './user.validationSchema.js';
import User from './user.model.js';
import { generateHashPassword } from '../utils/password.function.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// For Register
router.post(
  '/user/register',
  async (req, res, next) => {
    const newUser = req.body;
    try {
      const validatedData = await validationSchema.validate(newUser);
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },
  async (req, res) => {
    // extract new user from req.body
    const newUser = req.body;
    // Find user with email
    const user = await User.findOne({ email: newUser.email });
    // if not find user throw error
    if (user) {
      return res.status(409).send({ message: 'Email already exist' });
    }
    // hash password
    const hashPassword = await generateHashPassword(newUser.password);
    newUser.password = hashPassword;
    // create User
    await User.create(newUser);
    // Send Response
    return res.status(200).send({ message: 'User is register successfully' });
  }
);

// Login user
router.post(
  '/user/login',
  async (req, res, next) => {
    // Extract login credentials from req.body
    const loginCredentials = req.body;
    // validate
    try {
      const validatedData = await loginUserValidationSchema.validate(
        loginCredentials
      );
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },
  async (req, res, next) => {
    // Extract login credentials from req.body
    const loginCredentials = req.body;
    //Find user with using email
    const user = await User.findOne({ email: loginCredentials.email });
    // If not user email throw error
    if (!user) {
      return res.status(404).send({ message: 'Invalid Credentials' });
    }
    // Check for password match
    const isPasswordMatch = await bcrypt.compare(
      loginCredentials.password,
      user.password
    );
    // If not password match throw error
    if (!isPasswordMatch) {
      return res.status(404).send({ message: 'Invalid credentials' });
    }
    // Generate token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, 'myToken', {
      expiresIn: '1d',
    });
    // send response
    return res
      .status(200)
      .send({ message: 'Success', token: token, user: user });
  }
);
export default router;
