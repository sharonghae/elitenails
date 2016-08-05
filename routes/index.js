var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Elite Nails | Willow Park, TX' });
});

module.exports = router;

