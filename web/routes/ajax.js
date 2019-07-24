var express = require('express');
var router = express.Router();
router.get('/search', function (req, res, next) {
    res.send("received request");
});

module.exports = router;