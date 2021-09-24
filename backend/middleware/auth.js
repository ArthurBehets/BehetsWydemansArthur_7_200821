const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try { 
    
      const token = req.headers.authorization;

      const decodedToken = jwt.verify(token, `${process.env.ACCESS_SECRET_TOKEN}`); 
      const userId = decodedToken.userId; 
      if (req.headers.user && req.headers.user !== userId) {
        throw 'Invalid user ID';
      } else {
      next();
      }
    }
 
  catch {
      res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};