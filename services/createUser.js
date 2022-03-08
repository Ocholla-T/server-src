import User from '../models/user.js';
import bcrypt from 'bcryptjs';

export async function createUser({ username, password }) {
  return await User.findOne({ username })
    .then((foundUser) => {
      if (foundUser) return { message: `Email already in use` };

      try {
        bcrypt.hash(password, 10, async (error, hashedPassword) => {
          if (error) throw error;

          const newUser = new User({ username, password: hashedPassword });
          await newUser.save();

          return newUser._id;
        });
      } catch (error) {
        throw error;
      }
    })
    .catch((error) => {
      throw error;
    });
}
