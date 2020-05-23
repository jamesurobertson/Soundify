const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../utils');
const { User, Playlist, Song, Album, Artist, Follower } = require('../db/models');
const { requireAuth } = require('../auth');


//Creates followed playlist in Follower Table and associates with User
router.post('/:userId/:type/:typeId', requireAuth, asyncHandler(async (req, res) => {
    const userID = parseInt(req.params.userId, 10);
    const typeID = parseInt(req.params.typeId, 10);
    const type = req.params.type

    //Creates followed playlist in Follower Table
    await Follower.findOrCreate({
        where: {
            userId: userID,
            followableId: typeID,
            followableType: type
        }
    })

    //Finds the user and all associated followed playlist
    const user = await User.findOne({
        where: { id: userID },
        include: ['followedArtists', 'followedPlaylists', 'followedAlbums', 'followedUsers', 'followedSongs'],
        attributes: ["userName"]
    })
    res.status(201).json({ user })


}))


//Unfollows playlist
// router.delete('/:userId/:type/:typeId', requireAuth, asyncHandler(async (req, res) => {

// }))



module.exports = router;
