var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('test', { title: 'Express test', num: 10 });
});

module.exports = router;
