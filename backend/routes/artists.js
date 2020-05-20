const express = require('express');
const { Artist, Album } = require('../db/models');
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
    console.log(req)
    const artistId = parseInt(req.params.id, 10);
    const artist = await Artist.findByPk(artistId);
    if (artist) {
        res.json({ artist });
    } else {
        next(artistNotFound(artistId));
    }

}))


module.exports = router;
