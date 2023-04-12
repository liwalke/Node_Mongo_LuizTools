var express = require('express');
var router = express.Router();
const db = require("../db")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('newCustomer', { title: "Cadastrar Novo Cliente", customer: {}})
});

router.get('/edit/:customerId', function(req, res, next) {
  const id = req.params.customerId
  db.findCustomer(id)
    .then(customer => res.render('newCustomer', { title: "Editar Cliente", customer}))
    .catch(error => {
      console.log(error)
      res.render('error', { message: "Não foi possível retornar os dados do cliente", error })
    })
});

router.post('/', (req, res, next) => {
  let body = {...req.body}
  const {id, ...customer} = body
  customer.idade = parseInt(customer.idade)

  const promise = id ? db.updateCustomer(id, customer) : db.insertCustomer(customer)

  promise
    .then(result => {
      res.redirect('/')
    })
    .catch(error => {
      console.log(error)
      res.render('error', { message: "Não foi possível salvar o cliente", error })
    })
})

module.exports = router;
