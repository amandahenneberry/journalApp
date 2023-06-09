const router = require('express').Router()
const { models: {User, Entry, ToDos}} = require('../db')
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
      attributes: ['id', 'entries', 'todos']
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

router.get('/me/todos/:todoId', async (req, res, next) => {
  try {
    const todo = await ToDos.findByPk(req.params.todoId)
    res.send(todo)
  } catch (err) {
    next(err)
  }
})

router.post('/me/todos', async (req, res, next) => {
  try {
    const todo = await ToDos.create(req.body)
    res.status(201).send(todo)
  } catch (err) {
    next(err)
  }
})

router.put('/me/todos/:todoId', async (req, res, next) => {
  try {
    const todo = await ToDos.findByPk(req.params.todoId);
    res.send(await todo.update(req.body))
  } catch(err) {
    next(err)
  }
})

router.put('/me/entries/:entryId', async (req, res, next) => {
  try {
    const entry = await Entry.findByPk(req.params.entryId);
    res.send(await entry.update(req.body))
  } catch(err) {
    next(err)
  }
})


router.delete('/me/entries/:entryId', async (req, res, next) => {
  try {
    const entry = await Entry.findByPk(req.params.entryId)
    await entry.destroy();
    res.json(entry)
  } catch (err) {
    next(err)
  }
})

router.post('/me/entries', async (req, res, next) => {
  try {
    // const [user] = await User.findByPk(req.params.id);
    const newEntry = await Entry.create(req.body);
    res.status(201).send(newEntry)
  } catch (err) {
    next(err)
  }
})

router.delete('/me/todos/:todoId', async (req, res, next) => {
  try {
    const todo = await ToDos.findByPk(req.params.todoId)
    await todo.destroy();
    res.json(todo)
  } catch (err) {
    next(err)
  }
})

