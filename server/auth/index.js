const router = require('express').Router()
const { models: {User, Entry}} = require('../db')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body)}); 
  } catch (err) {
    next(err)
  }
})


router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.send({token: await user.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})
//shows empty entries...
router.get('/me', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization, {
      attributes: ['id']
    });
    res.send(user)
  } catch (err) {
    next(err)
  }
})

router.get('/me/entries/:entryId', async (req, res, next) => {
  try {
    const entry = await Entry.findByPk(req.params.entryId)
    res.send(entry)
  } catch (err) {
    next(err)
  }
})
