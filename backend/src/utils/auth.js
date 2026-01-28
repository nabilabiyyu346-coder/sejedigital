const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/initDb');

const generateToken = (userId, username) => {
  return jwt.sign(
    { id: userId, username: username },
    process.env.JWT_SECRET || 'your-secret-key-here-change-in-production',
    { expiresIn: process.env.JWT_EXPIRY || '7d' }
  );
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  generateToken,
  hashPassword,
  comparePassword
};
