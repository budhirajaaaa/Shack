import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Auth token missing" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, "mySuperSecretKey123");
    req.user = { id: decode.id };
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};
export default authMiddleware;
