import mongoose from 'mongoose';

const { Schema, model } = mongoose;

/**
 * @typedef{Schema} user
 * @property{string} username
 * @property{string} password
 */
const user = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default model('User', user);
