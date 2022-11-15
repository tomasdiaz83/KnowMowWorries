const router = require('express').Router();
const { User, Listing, SavedListing, Review } = require('../models');

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

        const listings = listingData.map((listing) => listing.get({ plain: true }));

        //res.status(200).json(listingData);
        res.render('home', {
            listings
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/listing/:id', async (req, res) => {
    try {
        const listingData = await Listing.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Review,
                    // attributes: ['comment', 'user_id'],
                    include: [
                        {
                            model: User,
                            attributes: ['name']
                        }
                    ]
                }
            ]
        })

        const listing = listingData.get({ plain: true });

        console.log(listing);

        res.status(200).json(listing);
        // res.render('listingInfo', {
        //     listing
        // });
    } catch (err) {
        res.status(500).json(err)
    }
});

// router.get('/', async (req, res) => {
//     res.render('search');
// });   

router.get('/login', async (req, res) => {
    res.render('login');
});

// router.get('/contact', async (req, res) => {
//     res.render('contact');
// });

// router.get('/', async (req, res) => {
//     res.render('dashboard');
// });

// router.get('/', async (req, res) => {
//     res.render('postlogin');
// });
   

module.exports = router;