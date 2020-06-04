const router = require('express').Router()
const Game = require('../db/game')

router.get('/', async (req, res, next) => {
    try {
        res.json(await Game.findAll())
    } catch (err){
        console.log('Error in get games', err)
        next(err)
    }
})

module.exports = router
