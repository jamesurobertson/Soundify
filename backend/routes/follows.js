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
    //May need to fix later. It's outputting the hashedpassword for followedUsers
    const user = await User.findOne({
        where: { id: userID },
        include: ['followedArtists', 'followedPlaylists', 'followedAlbums', 'followedUsers', 'followedSongs'],
        attributes: ["id", "userName"]
    })
    res.status(201).json({ user })


}))

//unfollow playlist
router.delete('/:userId/:type/:typeId', requireAuth, asyncHandler(async (req, res, next) => {
    const userId = parseInt(req.params.userId, 10);
    const typeId = parseInt(req.params.typeId, 10);
    const type = req.params.type;

    const follower = await Follower.findOne({
        where: { userId, followableId: typeId, followableType: type }
    })
    if (follower) {
        follower.destroy();
        res.status(204).end();
    } else {
        next(followerNotFound(typeId));
    }

}))



module.exports = router;
