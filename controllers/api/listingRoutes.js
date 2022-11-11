const router = require('express').Router();
const { User, Listing, SavedListing, Review } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const listingData = await Listing.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        })

        res.status(200).json(listingData);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router