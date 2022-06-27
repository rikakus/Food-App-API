const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const app = express();
const cors = require('cors');
require('dotenv');
const path = require('path');

const PORT = process.env.PORT | 3000;
app.use((req, res, next) => {
  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) =>
  res.send('APP ON BOARD')
);

const usersRoute = require('./src/route/users.route');
const recipeRoute = require('./src/route/recipe.route');
const commentRoute = require('./src/route/comment.route');
const authRoute = require('./src/route/auth.route');

app.use(bodyParser.json());
app.use(xss());
app.use(helmet());
app.use(usersRoute);
app.use(recipeRoute);
app.use(commentRoute);
app.use(authRoute);

app.use(
  cors({
    origin: '*'
  })
);

app.listen(PORT || 3000, () => {
  console.log(`service running on PORT ${PORT}`);
});
