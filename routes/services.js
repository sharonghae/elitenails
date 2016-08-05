/**
 * Created by Sharon on 8/3/2016.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('services', { title: 'Elite Nails | Willow Park, TX' });
});

module.exports = router;
