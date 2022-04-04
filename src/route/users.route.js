const express = require("express");
const {
  list,
  detail,
  update,
  deleted,
  userControl,
} = require("../controllers/users.controller");
const { isAdmin } = require("../middleware/authorization");
const jwtAuth = require("../middleware/jwtAuth");
const router = express.Router();

router
  // admin
  .put("/users-suspend/:id", jwtAuth, isAdmin, userControl)
  .get("/users", jwtAuth, isAdmin, list)

  // user
  .get("/users/:id", jwtAuth, detail)
  .put("/users/:id", jwtAuth, update)
  .delete("/users/:id", jwtAuth, deleted);
module.exports = router;
