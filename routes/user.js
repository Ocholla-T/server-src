import express from 'express';
import { createUser } from '../services/createUser.js';

const router = express.Router();

router.post('/register', async (req, res, next) => {
  const MESSAGE = [];
  const { email, password, confirmPassword } = req.body;

  /**
   * form validation
   */
  if (password !== confirmPassword) {
    MESSAGE.push({
      message: 'Passwords do not match',
      type: 'failure',
    });
  }

  if (password.length <= 8) {
    MESSAGE.push({
      message: 'Password should be more than 8 characters',
      type: 'failure',
    });
  }

  /**
   * check for validation errors
   */
  if (MESSAGE.length > 0) {
    res.status(400).json({ MESSAGE });
    return;
  } else {
    /**
     * if validation passes return new user
     */
    const result = await createUser({ username: email, password });

    /**
     * checks if email is already in use
     */
    if (result.message === `Email already in use`) {
      MESSAGE.push({
        message: result.message,
        type: 'failure',
      });
      res.status(400).json({ MESSAGE });
      return;
    }

    res.status(201).json({
      MESSAGE: [
        {
          message: `${result.message}`,
          type: 'success',
        },
      ],
    });
  }
});

export default router;
