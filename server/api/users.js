const router = require('express').Router()
const { models: { User, Entry }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username'], include: ['entries']
    });
    res.json(users);
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {include: ['entries']});
    res.send(user)
  }
  catch (error) {
    next(error)
  }
})


// router.get('/:userId/entries', async (req, res, next) => {
//   try {
//     const entries = await Entry.findAll({
//       where: {
//         userId: req.params.userId
//       },
//       include: [User]
//     })
//     res.json(entries)
//   }
//   catch (error) {
//     next(error)
//   }
// })

router.get('/:userId/:entryId', async (req, res, next) => {
  try {
    const entry = await Entry.findByPk(req.params.entryId, {
      include: [User]
    })
    res.json(entry)
  }
  catch (error) {
    next(error)
  }
})

