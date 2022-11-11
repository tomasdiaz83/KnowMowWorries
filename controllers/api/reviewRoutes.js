const router = require('express').Router();
const { User, Listing, SavedListing, Review } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const reviewData = await Review.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Listing,
                    attributes: ['id']
                },
            ]
        });

        res.status(200).json(reviewData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

module.exports = router;