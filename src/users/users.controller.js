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

export default {
  getUser,
  getUsers,
  createUser,
};
