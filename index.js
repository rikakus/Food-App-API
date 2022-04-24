const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");

const PORT = process.env.PORT | 3000;

const usersRoute = require("./src/route/users.route");
const recipeRoute = require("./src/route/recipe.route");
const commentRoute = require("./src/route/comment.route");
const authRoute = require("./src/route/auth.route");
const app = express();
app.use(bodyParser.json());
app.use(xss());
app.use(helmet());
app.use(usersRoute);
app.use(recipeRoute);
app.use(commentRoute);
app.use(authRoute);

//tesst

app.use(
  cors({
    origin: "*",
  })
);

app.listen(PORT, () => {
  console.log("service running on PORT 3000");
});
