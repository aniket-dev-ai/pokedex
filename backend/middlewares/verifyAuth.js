import jwt from "jsonwebtoken";

export const verifyAuth = async (req, res, next) => {
  const token = req.cookies.X_PokAuth_Token;

  try {
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ success: false, message: "Invalid Token" });
    }

    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
