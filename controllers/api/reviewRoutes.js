const router = require('express').Router();
const { User, Listing, Review } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const reviewData = await Review.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name', 'id']
                },
            ]
        });

        res.status(200).json(reviewData);
         } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;