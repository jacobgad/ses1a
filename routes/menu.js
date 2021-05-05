const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './public/images/uploads/' });

const menu = require('../controllers/menu');
const { isLoggedIn } = require('../middleware/users');
const { isNotUser } = require('../middleware/admin');

router.route('/')
  .get(menu.renderMenu)
  .post(isLoggedIn, isNotUser, upload.single('image'), menu.createMenuItem);

router.get('/new', isLoggedIn, isNotUser, menu.renderNew);

router.get('/json', menu.jsonMenu);

module.exports = router;
