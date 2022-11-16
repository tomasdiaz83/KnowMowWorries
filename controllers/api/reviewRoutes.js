const router = require('express').Router();
const { User, Listing, SavedListing, Review } = require('../../models');

router.get('/', async (req, res) => {
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
});

router.post('/', async (req, res) => {
    try {
        const comment_data = await Review.create({
            comment: req.body.comment,
            listing_id: req.body.listing_id,
            user_id: req.session.user_id
        });
        
        res.status(200).json(comment_data);
    } catch {
        res.status(400)
    }
})

module.exports = router;