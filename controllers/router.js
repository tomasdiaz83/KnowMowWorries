const router = require('express').Router();

router.get('/', async (req, res) => {
    res.render('contact');
});

router.get('/', async (req, res) => {
    res.render('dashboard');
});

router.get('/', async (req, res) => {
    res.render('postlogin');
});

router.get('/', async (req, res) => {
    res.render('search');
});

   
   

module.exports = router;