import express from 'express';
import { createUser } from '../services/createUser.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  const errors = [];
  const { email, password, confirmPassword } = req.body;

  /**
   * form validation
   */
  if (password !== confirmPassword) {
    errors.push({
      message: 'Please ensure the passwords are similar',
    });
  }

  if (password.length <= 8) {
    errors.push({
      message: 'Please ensure the password is more than 8 characters',
    });
  }

  /**
   * check for validation errors
   */
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    /**
     * if validation passes return new user
     */
    const result = await createUser({ username: email, password });

    /**
     * checks if email is already in use
     */
    if (typeof result === 'object') {
      errors.push(result);
      console.log(result);
      res.status(400).json({ errors });
      return;
    }

    res.status(201).json({ ID: result });
  }
});

export default router;
