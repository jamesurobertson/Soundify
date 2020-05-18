const express = require('express');
const { Playlist, Artist, Album } = require('../db/models')
const { requireAuth } = require('../auth')
const { asyncHandler } = require('../utils')

const router = express.Router();
//router.use(requireAuth);

router.get('/playlists', asyncHandler(async (req, res) => {
    const playlists = await Playlist.findAll();
    res.json({ playlists });
}))

router.get('/artists', asyncHandler(async (req, res) => {
    const artists = await Artist.findAll();
    res.json({ artists });
}))
router.get('/albums', asyncHandler(async (req, res) => {
    const albums = await Album.findAll();
    res.json({ albums });
}))


module.exports = router;
