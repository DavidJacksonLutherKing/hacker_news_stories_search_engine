var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Merkle Web Data Integration Platform' });
});

module.exports = router;