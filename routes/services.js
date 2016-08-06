/**
 * Created by Sharon on 8/3/2016.
 */
var express = require('express');
var router = express.Router();
var pl = require('../pricelist.json');
var pl1 = require('../pricelist1.json');
var pl2 = require('../pricelist2.json');

/* GET services page */
router.get('/', function(req, res, next) {
    res.render('services',
        {
            title: 'Elite Nails | Willow Park, TX',
            priceList: pl,
            priceList1: pl1,
            priceList2: pl2
            
        }
    );
});

module.exports = router;
