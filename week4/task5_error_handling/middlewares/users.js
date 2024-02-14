const jwt=require('jsonwebtoken')

const JWT_SECRET_KEY = "secret-key";


const checkForAdmin = (req, res, next) => {
  if (!req.headers.role || req.headers.role !== "admin") {
    throw new Error("Admin access required.") 
    
  }

  next();
};

const authUser = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    throw new Error("Authentication failed.")
    
  }

  try {
    let userId = jwt.verify(token, JWT_SECRET_KEY);
    req.userId = userId;

    next();
  } catch (err) {
    next(err);
    // res.status(401).json({ error: "Authentication failed." });
  }
};

module.exports={checkForAdmin,authUser};