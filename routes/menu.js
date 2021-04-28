const express = require('express');
const router = express.Router();

const { renderMenu, jsonMenu } = require('../controllers/menu');

router.route('/').get(renderMenu);

router.get('/json', jsonMenu);

module.exports = router;
