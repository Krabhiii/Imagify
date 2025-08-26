import jwt from 'jsonwebtoken';

const userauth = (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) return res.json({ success: false, message: "Token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attaches { id: ... } to req.user
    next();
  } catch (error) {
    res.json({ success: false, message: "Invalid token" });
  }
};

export default userauth;
