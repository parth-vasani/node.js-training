const jwt=require('jsonwebtoken')

const JWT_SECRET_KEY = "secret-key";

let {users}=require('../usersData')

const registerUser = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new Error("Missing username or password.")
    // res.status(400).json({ error: "Missing username or password." });

  }

  let userExits = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      userExits = true;
      break;
    }
  }

  if (userExits) {
    throw new Error("Username already exists")
    // res.json({ error: "Username already exists." });
    
  }

  const userId = Date.now().toString();
  let user = { userId, username, password };
  try {
    const token = jwt.sign({ userId }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    users.push(user);
    res.status(200).json({ token });
  } catch (err) {
    next(err);
    // res.status(502).json({ error: err.message });
  }
};

const loginUser = (req, res) => {
  const { username, password } = req.body;

  let user = users.filter((u) => u.username === username);
  if (user.length === 0) {
    throw new Error("Username not found.")
    // res.status(200).json({ error: "Username not found." });
    
  }

  user = user[0];
  if (user.password !== password) {
    throw new Error("Incorret password.")
    // res.status(200).json({ error: "Incorret password" });
    
  }

  try {
    let token = jwt.sign({ userId: user.userId }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports={registerUser,loginUser};