const express = require('express');
const bcrypt = require('bcryptjs')
const { User, Playlist } = require('../db/models');
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
//requireAuth
router.get('/:id', requireAuth, asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id);
    const playlists = await Playlist.findAll({
        where: createdBy = userId,
        include: [{ model: User, attributes: ["userName"] }]
    })
    res.json({ playlists })
}))

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
router.post('/token', validateUserFields, asyncHandler(async (req, res, next) => {
    const { userName, firstName, lastName, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);

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

}))
module.exports = router;
