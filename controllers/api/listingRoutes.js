const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Listing, SavedListing, Review } = require('../../models');
const Op = sequelize.Op

router.get('/', async (req, res) => {
    try {
        const listingData = await Listing.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name', 'id']
                },
                {
                    model: Review,
                    attributes: ['comment'],
                    include: [
                        {
                            model: User, 
                            attributes: ['name', 'id']
                        }
                    ]
                },
            ]
        })

        res.status(200).json(listingData);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const listingData = await Listing.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name', 'id']
                },
            ]
        })

        res.status(200).json(listingData);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/create', async (req, res) => {
    try {
        const listingData = await Listing.create({
            ...req.body,
            user_id: req.session.user_id
        })

        res.status(200).json(listingData);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/delete/:id', async (req, res) => {
    try {
        const listingData = await Listing.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        })

        if (!listingData) {
            res.status(404).json({ message: 'No project found with this id!' });
            return;
        }

        res.status(200).json(listingData);
    } catch (err) {
        res.status(500).json(err)
    }
});

router

module.exports = router