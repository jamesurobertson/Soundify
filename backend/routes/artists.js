const express = require('express');
const { Artist, Album, Song } = require('../db/models');
const { asyncHandler } = require('../utils');
const { requireAuth } = require('../auth');

const router = express.Router();
router.use(requireAuth);

//Checks for empty artist
const artistNotFound = (id) => {
    const err = new Error(`Artist was not found`);
    err.status = 404
    err.title = "Artist was not found"
    return err
}

router.get('/:id', asyncHandler(async (req, res, next) => {
    const artistId = parseInt(req.params.id, 10);
    const artist = await Artist.findByPk(artistId);
    if (artist) {
        res.json({ artist });
    } else {
        next(artistNotFound(artistId));
    }

}))

router.get('/:id/album', asyncHandler(async (req, res, next) => {
    const artistId = parseInt(req.params.id, 10);
    const albums = await Album.findAll({
        where: { artistId },
        include: [{ model: Song }]
    })
    res.json({ albums })
}))

router.get('/', asyncHandler(async (req, res, next) => {
    const artists = await Artist.findAll();
    res.json({ artists })
}))

module.exports = router;
