import data from "../../fakeData.js";
import { binarySearch, cmp } from "./utils.js";

export const permissionCheck = (req, res, next) => {
  const id = req.headers.author;

  // Check if the author is in the header
  if (!id) {
    return res
      .status(400)
      .send({
        message:
          "Must provide an `author` key in header with the id of the user authoring the modification.",
      });
  }

  const [user, _] = binarySearch(data, (user) => cmp(id, user.id));

  // Check if the user exists
  if (!user) {
    return res
      .status(404)
      .send({ message: "User provided in header was not found." });
  }

  // Check if the user has permission to update or delete
  if (!user._permissions.erase && req.method === "DELETE") {
    return res
      .status(401)
      .send({ message: "User `author` does not have permission to delete." });
  }

  // Check if the user has permission to update or delete
  if (!user._permissions.update && req.method === "PUT") {
    return res
      .status(401)
      .send({ message: "User `author` does not have permission to update." });
  }
  next();
};
