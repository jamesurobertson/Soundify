const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../utils');
const { User, Playlist, Song, Album, Artist, Follower } = require('../db/models');


//Creates followed playlist in Follower Table and associates with User
router.post('/:userId/:type/:typeId', asyncHandler(async (req, res) => {
    const userID = parseInt(req.params.userId, 10);
    const typeID = parseInt(req.params.typeId, 10);
    const type = req.params.type

    //Creates followed playlist in Follower Table
    await Follower.create({ userId: userID, followableId: typeID, followableType: type })

    //Finds the user and all associated followed playlist
    const user = await User.findOne({
        where: { id: userID },
        include: ['followedArtists', 'followedPlaylists', 'followedAlbums', 'followedUsers', 'followedSongs']
    })
    res.status(201).json({ user })

    //format json response
    // const payload = {
    //     id: user.id,
    //     username: user.userName,
    //     followedPlaylists: user.followedPlaylist
    // };
    // res.json(payload);
    //Front end should take in values : const { id, username, followedPlaylist} = await res.json();
}))




module.exports = router;
