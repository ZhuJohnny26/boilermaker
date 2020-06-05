const router = require('express').Router()
const User = require('./db/user')

router.get('/me', (req, res, next) => {
    res.json(req.user);
  });

router.post('/signup', async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        req.login(user, err => {
            if (err){
                next(err)
            } else {
                res.json(user)
            }
        })
    } catch (err){
        console.log('Error in Sign up api')
        next(err)
    }
})

router.put('/login', async (req, res, next) => {
    try {
        let user = await User.findOrCreate({
            where: {
                email: req.body.email
            },
            defaults: req.body
        })
        user = user[0]
        if (!user){
            res.status(401).send('User not found')
        }
        else if (!user.correctPassword(req.body.password)){
            res.status(401).send('Incorred Password')
        }
        else {
            req.login(user, err => {
                if (err){
                    console.log('error in put login')
                    next(err)
                }
                else {
                    res.json(user)
                }
            })
        }
    } catch (err){
        console.log('Error in Auth login')
        next(err)
    }
})

router.delete('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy()
    res.sendStatus(204);
  });

router.use('/google', require('./oauth'))

module.exports = router
