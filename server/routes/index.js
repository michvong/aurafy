const express = require('express');
const controller = require('../controllers/index');
const { updateAccessToken } = require('../utils/middleware');

const router = express.Router();

router.use(updateAccessToken);

router.get('/access-token', controller.getAccessToken);
router.get('/user', controller.getUserInfo);
router.get('/playlists', controller.getPlaylists);
router.get('/playlist/:id', controller.getPlaylist);
router.get('/playlist/:track_uri/:id', controller.playTrack);
router.get('/playlist/:context_uri/:id', controller.playContext);
router.get('/shuffle/:state', controller.setShuffleState);

module.exports = router;
