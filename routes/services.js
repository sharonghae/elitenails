/**
 * Created by Sharon on 8/3/2016.
 */
var express = require('express');
var router = express.Router();
var pl = require('../pricelist.json');

/* GET services page */
router.get('/', function(req, res, next) {
    res.render('services',
        {
            title: 'Elite Nails | Willow Park, TX',
            priceList: pl
        }
    );
});

module.exports = router;
