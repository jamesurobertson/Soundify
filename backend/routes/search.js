const express = require('express');
const { Album, Song, Artist, User } = require('../db/models');
const { requireAuth } = require('../auth');
const { asyncHandler } = require('../utils');

const router = express.Router();
router.use(requireAuth);

router.get('/', asyncHandler(async (req, res) => {
    //const albums = await Album.findAll();
    //{ include: [{ model: Artist }, { model: Song }] }
    const songs = await Song.findAll();
    //const artists = await Artist.findAll();
    //const payload = {
    // albumTitle: albums.title,
    //     songTitle: songs.title,
    //         artistName: artists.name
    // //}
    res.json({ songs });


}))

module.exports = router;