const express = require('express');
const router = express.Router();

const { renderMenu } = require('../controllers/menu');

router.route('/').get(renderMenu);

module.exports = router;
