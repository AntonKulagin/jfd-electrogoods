const express = require('express')
const router = express.Router({mergeParams: true})

router.use('/auth', require('./auth.routes'))
router.use('/computer', require('./computer.routes'))
router.use('/laptop', require('./laptop.routes'))

module.exports = router