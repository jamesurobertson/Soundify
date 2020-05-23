const express = require('express');
const { Album, Song, Artist, User } = require('../db/models');
const { requireAuth } = require('../auth');
const { asyncHandler } = require('../utils');

const router = express.Router();
router.use(requireAuth);

router.get('/search', asyncHandler, (req, res) => {
    console.log('he');

})
