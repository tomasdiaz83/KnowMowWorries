const router = require('express').Router();
const listingRoutes = require('./listingRoutes');
const reviewRoutes = require('./reviewRoutes')
const userRoutes = require("./userRoutes")

router.use('/listings', listingRoutes);
router.use('/reviews', reviewRoutes);
router.use('/users', userRoutes)

module.exports = router;