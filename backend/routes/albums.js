const express = require('express');
const { Album, Song, Artist } = require('../db/models');
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

router.get('/:id', asyncHandler(async (req, res, next) => {
    const albumId = parseInt(req.params.id, 10);
    const album = await Album.findByPk(albumId, {
        include: [{ model: Artist }, { model: Song, attributes: ["title", "songLength"] }],
        attributes: ["id", "title"]
    });
    if (album) {
        res.json({ album });
    } else {
        next(albumNotFound(albumId))
    }
}))

module.exports = router;
