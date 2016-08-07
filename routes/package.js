/**
 * Created by Sharon on 8/6/2016.
 */
var express = require('express');
var router = express.Router();

/* GET package page. */
router.get('/', function(req, res, next) {
    res.render('package', { title: 'Elite Nails | Willow Park, TX' });
});

module.exports = router;

