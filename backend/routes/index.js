const express = require('express');
const router = express.Router();
const db = require('../db/models')
const { handleValidationErrors, asyncHandler } = require("../utils");


router.get('/', asyncHandler( async (req, res)=>{
    const artist = await db.Artist.findByPk(1)
    res.send(artist.followableType)
}));

module.exports = router;
