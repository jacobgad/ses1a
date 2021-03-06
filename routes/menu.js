const express = require('express');
const router = express.Router();
const multer = require('multer');

const menu = require('../controllers/menu');
const { isLoggedIn } = require('../middleware/users');
const { isNotUser } = require('../middleware/admin');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
  .get(menu.renderMenu)
  .post(isLoggedIn, isNotUser, upload.single('image'), menu.createMenuItem)
  .delete(isLoggedIn, isNotUser, menu.deleteMenuItem);

router.get('/new', isLoggedIn, isNotUser, menu.renderNew);

router.get('/json', menu.jsonMenu);

module.exports = router;
