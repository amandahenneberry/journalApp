const router = require('express').Router()
const { models: { Entry }} = require('../db')
module.exports = router


router.post('/', async (req, res, next) => {
  try {
    // const [user] = await User.findByPk(req.params.id);
    const newEntry = await Entry.create(req.body);
    res.status(201).send(newEntry)
  } catch (err) {
    next(err)
  }
})