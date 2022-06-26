const express = require('express');
const { register, login, list } = require('../controllers/auth.controller');

const router = express.Router();
const jwtAuth = require('../middleware/jwtAuth');
const { isCustomer } = require('../middleware/authorization');
const upload = require('../middleware/upload');
const { validate, userValidationRules } = require('../middleware/validation');


router
  .get('/newusers', jwtAuth, isCustomer, list)
  .post('/register', upload,userValidationRules(), validate, register)
  .post('/login', login);

module.exports = router;
