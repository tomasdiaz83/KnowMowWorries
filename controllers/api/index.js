const router = require('express').Router();
const listingRoutes = require('./listingRoutes');
const reviewRoutes = require('./reviewRoutes')

router.use('/listings', listingRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;