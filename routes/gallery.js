const express = require('express');
const router = express.Router();

const { renderGallery, jsonGallery } = require('../controllers/gallery');

router.route('/').get(renderGallery);

router.get('/json', jsonGallery);

module.exports = router;