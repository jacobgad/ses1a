const express = require('express');
const router = express.Router();

const { renderMenu } = require('../controllers/menu');

router.route('/').get(renderMenu);


router.route('/filter')


module.exports = router;
