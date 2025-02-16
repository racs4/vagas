import data from "../../fakeData.js";
import { User } from "./users.model.js";
import { binarySearch, cmp } from "../common/utils.js";

/**
 * Wrapper to handle errors
 * @param {Function} fn
 * @returns {Function}
 *
 * @example
 * wrapper(async (req, res, next) => {
 *  const user = await getUser(req.query.name);
 * res.send(user);
 * });
 *
 */
const wrapper = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    res.status(500).send({ message: "Internal users server error" });
  });
};

export const getUser = wrapper((req, res, next) => {
  // Check if the name is in the query params
  if (!req.params || !req.params.id) {
    return res.status(400).send({ message: "Missing id in url params" });
  }

  const id = req.params.id;
  // I changed to search for the id instead of the name
  // This is because the id is unique, so it will always return only one user
  // As the array is already sorted, the search will be faster with the binary search
  const [user, _] = binarySearch(data, (user) => cmp(id, user.id));

  // Check if the user exists
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  // Set the accessed count
  user._accessed++;

  // Send the user
  res.send(user);
});

export const getUsers = wrapper((req, res, next) => {
  res.send(data);
});

export const createUser = wrapper((req, res, next) => {
  // Check if the name and job are in the body
  if (!req.body || !req.body.name || !req.body.job) {
    return res.status(400).send({ message: "Missing name or job in body" });
  }

  var name = req.body.name;
  // (The referred error was here, the name of the variable was wrong)
  var job = req.body.job;
  var newUser = new User(name, job);
  data.push(newUser);
  res.send(newUser);
});

export const deleteUser = wrapper((req, res, next) => {
  // Check if the name is in the query params
  if (!req.params || !req.params.id) {
    return res.status(400).send({ message: "Missing id in url params" });
  }

  const id = req.params.id;
  // Again, I changed to search for the id instead of the name
  const [_, index] = binarySearch(data, (user) => cmp(id, user.id));

  // Check if the user exists
  if (index === -1) {
    return res.status(404).send({ message: "User not found" });
  }

  // Delete the user
  data.splice(index, 1);

  res.send({ message: "User deleted" });
});

export const updateUser = wrapper((req, res, next) => {
  // Check if the name is in the query params
  if (!req.params || !req.params.id) {
    return res.status(400).send({ message: "Missing id in url params" });
  }

  const id = req.params.id;

  // Again, I changed to search for the id instead of the name
  const [user, index] = binarySearch(data, (user) => cmp(id, user.id));

  // Check if the user exists
  if (index === -1) {
    return res.status(404).send({ message: "User not found" });
  }

  // Check if there is a body with a name or job
  if (!req.body || (!req.body.name && !req.body.job)) {
    return res.status(400).send({ message: "Missing name or job in body" });
  }

  // Update the user
  if (req.body.name) {
    user.name = req.body.name;
  }
  if (req.body.job) {
    user.job = req.body.job;
  }

  res.send(user);
});

export const getAccessed = wrapper((req, res, next) => {
  // Check if the id is in the query params
  if (!req.params || !req.params.id) {
    return res.status(400).send({ message: "Missing id in url params" });
  }

  const id = req.params.id;

  // Again, I changed to search for the id instead of the name
  const [user, _] = binarySearch(data, (user) => cmp(id, user.id));

  // Check if the user exists
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  // Send the accessed count
  res.send({ accessed: user._accessed });
});

export const updatePermission = wrapper((req, res, next) => {
  // Check if the id is in the params
  if (!req.body || !req.params.id) {
    return res.status(400).send({ message: "Missing id in body" });
  }

  const id = req.params.id;

  // Again, I changed to search for the id instead of the name
  const [user, _] = binarySearch(data, (user) => cmp(id, user.id));

  // Check if the user exists
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  // Check if there is a body with a name or job
  if (
    !req.body ||
    (req.body.erase === undefined && req.body.update === undefined)
  ) {
    return res.status(400).send({ message: "Missing permission in body" });
  }

  // Check if values are booleans
  if (
    (req.body.erase !== undefined && typeof req.body.erase !== "boolean") ||
    (req.body.update !== undefined && typeof req.body.update !== "boolean")
  ) {
    return res.status(400).send({ message: "Permission must be a boolean" });
  }

  // Update the user
  if (req.body.erase !== undefined) {
    user._permissions.erase = req.body.erase;
  }
  if (req.body.update !== undefined) {
    user._permissions.update = req.body.update;
  }

  res.send(user);
});

export default {
  getUser,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getAccessed,
  updatePermission,
};
