const express = require('express');
const { Playlist, PlaylistSong, Song, User, Album, Artist, Follower } = require('../db/models');
const { asyncHandler, handleValidationErrors } = require('../utils')
const { requireAuth } = require('../auth');
const { check, validationResult } = require('express-validator');

const router = express.Router();

//Authorizes user to connect to see user's playlists
router.use(requireAuth);

//Check for a non existent playlist
const playlistNotFound = (id) => {
    const err = new Error(`Playlist was not found`);
    err.status = 404
    err.title = "Playlist was not found"
    return err
}

const validatePlaylistName = [
    check("name")
        .exists({ checkFalsey: true })
        .withMessage('Please provide a value for message')
        .isLength({ max: 50 })
        .withMessage('Playlist name can not be more than 50 characters')
]



router.get('/:id', asyncHandler(async (req, res, next) => {
    const playlistId = parseInt(req.params.id, 10);
    const playlist = await Playlist.findByPk(playlistId, {
        include: [{ model: Song, include: [{ model: Album, include: [{ model: Artist }] }] }, {
            model: User, attributes: ["userName", "id"]
        }]

    })
    if (playlist) {
        res.json({ playlist });
    } else {
        next(playlistNotFound(id));
    }
}))

router.get('/', asyncHandler(async (req, res, next) => {
    const playlists = await Playlist.findAll({
        include: [{
            model: User, attributes: ["userName"]
        }]
    });
    res.json({ playlists })
}))


// UNCOMMENT when form is created
//Create Playlist
router.post('/', validatePlaylistName, asyncHandler(async (req, res, next) => {
    const { name, createdBy } = req.body
    const playlist = await Playlist.create({ name, createdBy, imageURL: '../images/generic-artist.png' })

    res.status(201).json({ playlist });
}))

//Add song to playlist
router.post('/:playlistId/song/:songId', asyncHandler(async (req, res) => {
    const playlistId = parseInt(req.params.playlistId, 10);
    const songId = parseInt(req.params.songId, 10);

    await PlaylistSong.create({
        playlistId: playlistId, songId: songId

    })
    // await Playlist.create({

    // })
    const playlistSongs = await PlaylistSong.findAll()
    res.status(201).json({ playlistSongs })
}))


//Delete Playlist
// router.delete('/:id',asyncHandler(async(req,res,next) => {
//         const playlistId = parseInt(req.params.id)
//         const playlist = await Playlist.findByPk(playlistId);
//         if(playlist){
//             playlist.destroy();
//             res.status(204).end();
//         }else{
//             next(playlistNotFound(playlistId));
//         }

// }))

module.exports = router;
