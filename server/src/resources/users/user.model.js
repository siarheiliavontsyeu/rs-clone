const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: { type: String },
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    subscription: {
      type: String,
      enum: ['basic', 'premium'],
      default: 'basic',
      required: true
    }
  },
  { collection: 'users', versionKey: false }
);

const toResponse = user => {
  const { id, name, login, subscription } = user;
  return { id, name, login, subscription };
};

module.exports = {
  User: mongoose.model('users', User),
  toResponse
};
