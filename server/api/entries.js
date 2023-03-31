const router = require('express').Router()
const { models: { User, Entry }} = require('../db')
module.exports = router


router.post('/', async (req, res, next) => {
    try{
        const user = await User.findAll({
            where:{
                userId: req.params.userId
            }
        })
        const entry = Entry.build(req.body);
        entry.setUser(user, {save: false});
        await entry.save();
    } catch (err) {
        next(err)
    }
})




