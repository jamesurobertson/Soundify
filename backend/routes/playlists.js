const express = require('express');
const { Playlist, PlaylistSong, Song } = require('../db/models');
const { asyncHandler, handleValidationErrors } = require('../utils')
const { requireAuth } = require('../auth');
const { check, validationResult } = require('express-validator');

const router = express.Router();

//Authorizes user to connect to see user's playlists
//router.use(requireAuth);

//Check for a non existent playlist
const playlistNotFound = (id) => {
    const err = new Error(`Playlist was not found`);
    err.status = 404
    err.title = "Playlist was not found"
    return err
}


const validatePlaylistErrors = [
    check("name")
        .exists({ checkFalsey: true })
        .withMessage('Please provide a value for message')
        .isLength({ max: 50 })
        .withMessage('Playlist name can not be more than 50 characters')
]

router.use('/:id', asyncHandler(async (req, res, next) => {
    const playlistId = parseInt(req.params.id, 10);
    const playlist = await Playlist.findByPk(playlistId, {
        include: [{ model: Song }]
    })
    if (playlist) {
        res.json({ playlist });
    } else {
        next(playlistNotFound(id));
    }
}))

router.post('/', validatePlaylistErrors, asyncHandler(async (req, res, net) => {
    const { name, description, }
}))


module.exports = router;