const express = require('express');
const { Playlist, Artist, Album } = require('../db/models')
const { requireAuth } = require('../auth')
const { asyncHandler } = require('../utils')

const router = express.Router();
router.use(requireAuth);

router.get('/:id/playlists', asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const playlists = await Playlist.findAll({
        where: createdBy = userId
    });
    res.json({ playlists });
}))

router.get('/:id/artists', asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const artists = await Artist.findAll({
        where: createdBy = userId
    });
    res.json({ artists });
}))
router.get('/:id/albums', asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const albums = await Album.findAll({
        where: createdBy = userId
    });
    res.json({ albums });
}))


module.exports = router;
