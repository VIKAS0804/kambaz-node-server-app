import { v4 as uuidv4 } from "uuid";
import UserModel from "./model.js";

export default function UsersDao(db) {
  const findAllUsers = () => UserModel.find();
  
  const findUserById = (userId) => UserModel.findById(userId);
  
  const findUserByUsername = (username) => 
    UserModel.findOne({ username });
  
  const findUserByCredentials = (username, password) =>
    UserModel.findOne({ username, password });
  
  const updateUser = (userId, userUpdates) => {
    return UserModel.updateOne({ _id: userId }, { $set: userUpdates });
  };
  
  const deleteUser = (userId) => {
    return UserModel.deleteOne({ _id: userId });
  };
  
  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    return UserModel.create(newUser);
  };

  const findUsersByRole = (role) => {
    return UserModel.find({ role });
  };

  const findUsersByPartialName = (name) => {
    const regex = new RegExp(name, "i");
    return UserModel.find({
      $or: [
        { firstName: regex },
        { lastName: regex }
      ]
    });
  };
  
  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    updateUser,
    deleteUser,
    findUsersByRole,
    findUsersByPartialName
  };
}
