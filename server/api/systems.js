const router = require('express').Router()
const System = require('../db/system')

router.get('/', async (req, res, next) => {
    try {
        res.json(await System.findAll())
    } catch (err){
        console.log('Error in get systems', err)
        next(err)
    }
})

module.exports = router
