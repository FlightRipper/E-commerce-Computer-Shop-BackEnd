import jwt from 'jsonwebtoken';
import User from '../models/usermodel.js';

const protectCreator = async (req, res, next) => {
  const headerInput = req.headers['authorization'];
  const token = headerInput && headerInput.split(' ')[1];
  if (token == null) 
  return res.status(401).json('not authorized');

  const decoded = jwt.verify(token, process.env.SECRET);

  const admin = await User.findByPk(decoded.id);

  req.user = admin;

  // console.log(admin)

  if (!req.user) 
  return res.status(404).json('user not found');


  if(!admin.userType === "admin") 
  return res.status(404).json('Missing permission');

  next();

};

export default protectCreator;