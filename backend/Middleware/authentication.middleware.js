import jwt from "jsonwebtoken";
import User from "../User/user.model";

export const isUser = async (req, res, next) => {
  // Extract token from req.headers
  const authorization = req.headers.authorization;
  const splittedValues = authorization?.split("");
  const token = splittedValues?.length == 2 ? splittedValues[1] : undefined;
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  let payload;
  try {
    payload = jwt.verify(token, "myToken");
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  // Find user using user Id from payload
  const user = await User.findOne({ _id: payload.userId });
  // If not user throw error
  if (!user) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  req.loggedInUserId = user._id;
  next();
};
