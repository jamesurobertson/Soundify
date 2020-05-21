const express = require('express');
const { asyncHandler } = require('../utils');
const { requireAuth } = require('../auth');
const { Artist, Album, Song } = require('../db/models');

const router = express.Router();
router.use(requireAuth);

router.get('/', asyncHandler(async (req, res) => {
    const albums = await Album.findAll();
    res.json({ albums });
}))

router.get('/artists', asyncHandler(async (req, res) => {
    const artists = await Artist.findAll();
    res.json({ artists });
}))

router.get('/songs', asyncHandler(async (req, res) => {
    const songs = await Song.findAll();
    res.json({ songs });
}))

module.exports = router;
