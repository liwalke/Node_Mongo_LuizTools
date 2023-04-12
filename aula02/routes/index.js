const express = require('express');
const router = express.Router();
const db = require("../db")

/* GET home page. */
router.get('/', function(req, res, next) {
  db.findCustomers()
    .then(customers => {
      res.render('index', { title: 'Express', customers });
    })
    .catch(error => {
      console.log(error)
      res.render('error', { message: "Não foi possível listar os clientes", error })
    })
});

router.get('/delete/:customerId', (req, res, next) => {
  const id = req.params.customerId
  db.deleteCustomer(id)
    .then(result => res.redirect('/'))
    .catch(error => {
      console.log(error)
      res.render('error', { message: "Não foi possível excluir os dados do cliente", error })
    })
})

module.exports = router;
