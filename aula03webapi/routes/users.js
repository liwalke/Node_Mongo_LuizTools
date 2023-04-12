const express = require('express');
const router = express.Router();
const db = require("../models/userModel")
const validationUser = require("../middlewares/middlewareValidation")

router.get('/', (req, res, next) => {
  res.json(db.findUsers())
  //Por padrão envia status 200
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id
  res.json(db.findUser(id))
  //Por padrão envia status 200
});

router.post('/', validationUser, (req, res, next) => {
  const user = db.insertUser(req.body)
  res.status(201).json(user)
})

router.put('/:id', validationUser, (req, res, next) => {
  const id = req.params.id
  const user = db.updateUser(id, req.body, true)
  res.status(200).json(user)
})

router.patch('/id', (req, res, next) => {
  const id = req.params.id
  const user = db.updateUser(id, req.body, false)
  res.status(200).json(user)
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  res.status(200).json(db.deleteUser(id))
})

module.exports = router;
