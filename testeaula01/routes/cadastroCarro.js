var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('cadastroCarro', {});
});

router.post('/', function(req, res, next) {
    global,carros.push({ marca: req.body.marca, modelo: req.body.modelo, ano: req.body.ano, })
    res.render('carros', { carros: global.carros });
  });

module.exports = router;
