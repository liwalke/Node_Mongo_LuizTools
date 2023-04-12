const userSchema = require("../models/userSchema")

module.exports = (req, res, next) => {
    const { error } = userSchema.validate(req.body)
  
    if(error) 
      return res.status(422).json({ error: error.details})
    else
      next()
  }