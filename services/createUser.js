import User from '../models/user.js';
import bcrypt from 'bcryptjs';

/**
 *
 * @param {object} user
 * @param {string} user.username
 * @param {string} user.password
 * @returns {Promise<object>}
 */

export async function createUser({ username, password }) {
  const resultingMessage = {
    message: '',
  };

  await User.findOne({ username })
    .then((foundUser) => {
      /**
       * if user is found don't create a new user
       */

      if (foundUser) {
        resultingMessage.message = `Email already in use`;

        return;
      }
      const newUser = new User({ username, password });

      /**
       * salt and hash password using bcrypt
       */

      bcrypt.genSalt(10, (error, salt) => {
        if (error) {
          console.error(error);
          return;
        }
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) {
            console.error(error);
            return;
          }
          newUser.password = hash;
          newUser.save();
        });
      });

      resultingMessage.message = `Account has been successfully created`;
    })
    .catch((error) => {
      console.error(error);
    });

  return resultingMessage;
}
