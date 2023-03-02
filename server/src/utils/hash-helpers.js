const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const hashPassword = async password => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePasswords
};
