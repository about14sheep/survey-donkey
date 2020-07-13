const express = require("express");
const router = express.Router();
const {requireAuth} = require('../auth')

router.get('/dashboard', requireAuth, (req, res) => {
    res.render('dashboard', {
        title: "Dashboard"
    })
})

module.exports = router;
