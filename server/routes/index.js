const express = require('express');
const controller = require('../controllers/index');
const { updateAccessToken } = require('../utils/middleware');

const router = express.Router();

router.use(updateAccessToken);

router.get('/user', controller.getUserInfo);
router.get('/playlists', controller.getPlaylists);

module.exports = router;
