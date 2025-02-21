import mongoose from "mongoose";

export const mongoIdValidity = (req, res, next) => {
  // extract id from req.params
  const id = req.params.id;
  // Check for mongo id validity
  const isValidMongoId = mongoose.isValidObjectId(id);
  // if not valid mongo id throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id" });
  }
  next();
};
