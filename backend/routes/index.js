const express = require('express');
const router = express.Router();
const { handleValidationErrors, asyncHandler } = require("../utils");
const { requireAuth } = require('../auth');

// router.use(requireAuth);

router.get('/', requireAuth, asyncHandler(async (req, res) => {
    res.json({ "message": "test" })
}));

module.exports = router;
