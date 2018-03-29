const {
  User,
} = require('../models/user.model');

exports.getUsers = async function getUsers(query, page, limit) {
  // Options setup for the mongoose paginate
  const options = {
    page,
    limit,
  };

  // Try Catch the awaited promise to handle the error

  try {
    const todos = await User.paginate(query, options); // TODO: User.paginate
    return todos;
  } catch (e) {
    throw Error('Error while Paginating Users');
  }
};

exports.getUser = async function getUsers(id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (e) {
    throw Error('Error while getting user');
  }
};

exports.getUserByName = async function getUserByName(userName) {
  try {
    const user = await User.findOne({
      name: userName,
    });
    return user;
  } catch (e) {
    throw Error('Error while getting user');
  }
};

exports.createUser = async function createUser(user) {
  try {
    const newUser = new User({
      name: user.name,
      password: user.password,
      // sex: 'M', // TODO:
    });

    const savedUser = await newUser.save();
    return savedUser;
  } catch (e) {
    throw Error('Error while creating user');
  }
};

exports.updateUser = async function updateUser(user) {
  const {
    id,
  } = user;
  const newUser = user;

  try {
    const oldUser = await User.findByIdAndUpdate(id, newUser);
    return oldUser;
  } catch (e) {
    throw Error('Error occured while updating the user');
  }
};

exports.deleteUser = async function deleteUser(id) {
  try {
    const deleted = await User.findByIdAndRemove(id);
    return deleted;
  } catch (e) {
    throw Error('Error occured while deleting the user');
  }
};
