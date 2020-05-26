const express = require('express');
const bcrypt = require('bcryptjs')
const { User, Playlist, Artist, Album, Song, Follower } = require('../db/models');
const { asyncHandler } = require('../utils');
const { requireAuth, getUserToken } = require('../auth');
const { check, validationResult } = require('express-validator')

const router = express.Router();

validateUserFields = [
    check("username")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a username"),
    check("firstName")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a first name"),
    check("lastName")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a last name"),
    check("email")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a valid email"),
    check("password")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a valide email")
]

const validateEmailPassword = [
    check("email")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a valid email"),
    check("password")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a valide email")
]

//Grabs all playlists created by user
//CHANGED ROUTE. CHANGE ROUTE ON FRONTEND
router.get('/:id/playlist', requireAuth, asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const playlists = await Playlist.findAll({
        where: {
            createdBy: userId,
        },
        include: [{ model: User, attributes: ["userName"] }]
    })
    res.json({ playlists })
}))


//Grabs users followed items
router.get('/:id/follows', requireAuth, asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findOne({
        where: { id: userId },
        include: ['followedArtists', 'followedPlaylists', 'followedAlbums', 'followedUsers', 'followedSongs']
    });

    //Format Json response

    let followedUserNames = []
    user.followedUsers.forEach(obj => followedUserNames.push(obj.id));
    const payload = {
        id: user.id,
        username: user.userName,
        followedArtists: user.followedArtists,
        followedPlaylists: user.followedPlaylists,
        followedAlbums: user.followedAlbums,
        followedUsers: user.followedUsers,
        followedSongs: user.followedSongs
    };
    //Front end should take in values : const { id, username, followedPlaylists} = await res.json();
    res.json(payload);
}))

//Grabs followers of user
router.get('/:id/followers', requireAuth, asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10)
    const user = await User.findOne({
        where: { id: userId },
        include: ['followers']
    });
    const payload = {
        id: user.id,
        username: user.username,
        followers: user.followers
    };
    //Front end should take in values : const { id, username, followers} = await res.json();
    res.json(payload);
})
);

//signing up
router.post('/', validateUserFields, asyncHandler(async (req, res) => {
    const { userName, firstName, lastName, email, password } = req.body // Takes content from form
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ userName: userName, firstName: firstName, lastName: lastName, email: email, hashedPassword: hashedPassword });

    const token = getUserToken(user);
    res.status(201).json({
        user: { id: user.id },
        token
    })
}))

//logging in
router.post('/token', validateEmailPassword, asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({
        where: {
            email
        }
    })
    if (!user || !user.validatePassword(password)) {
        const err = new Error("Login failed");
        err.status = 401;
        err.title = "Login failed";
        err.errors = ["the provided credentials were invalid"];
        return next(err);
    }
    const token = getUserToken(user);

    res.json({
        token,
        user: { id: user.id }
    });



}
))

router.post('/')
module.exports = router;
