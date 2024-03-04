import User from '../models/usermodel.js';
import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
  const headerInput = req.headers['authorization'];
  const token = headerInput && headerInput.split(' ')[1];

  if (token == null)
  return res.status(401).json('not authorized');

  const decoded = jwt.verify(token, process.env.SECRET);
  console.log(decoded);

  const user = await User.findByPk(decoded.id);

  req.user = user;

  if (!req.user) 
  return res.status(404).json('user not found');

  next();

};

export default protect;