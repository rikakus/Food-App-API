const express = require('express');
const jwtAuth = require('../middleware/jwtAuth');
const {
  list,
  detail,
  input,
  update,
  deleted,
  news,
  public,
  recipeControl
} = require('../controllers/recipe.controller');
const { isAdmin } = require('../middleware/authorization');
const upload = require('../middleware/upload');
const { recipeValidatorRules, validate } = require('../middleware/validation');
const router = express.Router();

router
  // admin
  .put('/recipe-suspend/:id', jwtAuth, isAdmin, recipeControl)

  // user
  .get('/recipe', jwtAuth, list)
  .get('/recipe/:id', jwtAuth, detail)
  .post('/recipe', jwtAuth,upload,recipeValidatorRules(),validate, input)
  .put('/recipe/:id', jwtAuth, update)
  .delete('/recipe/:id', jwtAuth, deleted)
  .get('/public', jwtAuth, public)

  // public
  .get('/recipe-news', news);

module.exports = router;
