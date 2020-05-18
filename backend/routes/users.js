const express = require('express');
const { User, Playlist } = require('../db/models');
const { asyncHandler } = require('../utils');
const { requireAuth } = require('../auth');

const router = express.Router();

//Authorizes user to connect to User profile
// router.use(requireAuth);

router.get('/:id', asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id);
    const playlists = await Playlist.findAll({
        where: createdBy = userId,
        include: [{ model: User, attributes: ["userName"] }]
    })
    res.json({ playlists })
}))

module.exports = router;