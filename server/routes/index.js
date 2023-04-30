const express = require('express');
const controller = require('../controllers/index');
const { updateAccessToken } = require('../utils/middleware');

const router = express.Router();

router.use(updateAccessToken);

router.get('/access-token', controller.getAccessToken);
router.get('/user', controller.getUserInfo);
router.get('/playlists', controller.getPlaylists);
router.get('/playlist/:id', controller.getPlaylist);
router.get('/:uri/:id', controller.playContext);

module.exports = router;
