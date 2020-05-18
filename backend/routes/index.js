const express = require('express');
const router = express.Router();
const { handleValidationErrors, asyncHandler } = require("../utils");


router.get('/', asyncHandler(async (req, res) => {
    res.json({ "message": "test" })
}));

module.exports = router;
