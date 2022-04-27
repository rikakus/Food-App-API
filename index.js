const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const app = express();
const cors = require("cors");
require("dotenv");
const path = require("path");

const APP_PORT = process.env.PORT | 3000;
app.use((req, res, next) => {
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});
app.use(express.static(path.join(__dirname, "public")));

const usersRoute = require("./src/route/users.route");
const recipeRoute = require("./src/route/recipe.route");
const commentRoute = require("./src/route/comment.route");
const authRoute = require("./src/route/auth.route");


app.use(
  cors({
    origin: "*",
  })
);


app.use(bodyParser.json());
app.use(xss());
app.use(helmet());
app.use(usersRoute);
app.use(recipeRoute);
app.use(commentRoute);
app.use(authRoute);



app.listen(APP_PORT, () => {
  console.log(`service running on PORT ${APP_PORT}`);
});
