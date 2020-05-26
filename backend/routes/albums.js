const express = require('express');
const { Album, Song, Artist, User } = require('../db/models');
const { requireAuth } = require('../auth');
const { asyncHandler } = require('../utils');

const router = express.Router();
router.use(requireAuth);
//Function to check for empty Album ID
const albumNotFound = (id) => {
    const err = new Error(`Album was not found`);
    err.status = 404
    err.title = "Album was not found"
    return err
}

router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const albumId = parseInt(req.params.id, 10);
    const album = await Album.findByPk(albumId, {
        include: [{ model: Artist }, { model: Song }]
    });
    if (album) {
        res.json({ album });
    } else {
        next(albumNotFound(albumId))
    }
}))
// music / artist / album / song

router.get('/:songURL', asyncHandler(async (req, res) => {
    const songURL = req.params.songURL;
    const song = await Song.findOne({
        where: { songURL },
        include: [{ model: Album, include: [{ model: Artist }] }]
    })
    res.json({ song });
}))

router.get('/', asyncHandler(async (req, res, next) => {
    const albums = await Album.findAll({
        include: [{
            model: Artist, attributes: ["name"]
        }]
    });
    res.json({ albums });
}))



module.exports = router;
