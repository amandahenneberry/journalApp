const router = require('express').Router()
const { models: { User, Entry }} = require('../db')
module.exports = router

//all entries
router.get('/', async (req, res, next) => {
    try {
      const entries = await Entry.findAll({
      attributes: ['title', 'id'], include: [User]
      })
      res.json(entries)
    }
    catch (error) {
      next(error)
    }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const entries = await Entry.findAll({
      where: {
        userId: req.params.userId
      },
      include: [User]
    })
    res.json(entries)
  }
  catch (error) {
    next(error)
  }
})