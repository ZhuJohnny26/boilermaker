const router = require('express').Router()

router.use('/games', require('./games'))
router.use('/systems', require('./systems'))

router.use((req, res, next) => {
    const err = new Error('API route not found!')
    err.status = 404
    next(err)
  })

 module.exports = router
