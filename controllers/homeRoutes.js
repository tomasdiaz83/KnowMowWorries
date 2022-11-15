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

router.get('/login', async (req, res) => {
    res.render('login');
});

// router.get('/contact', async (req, res) => {
//     res.render('contact');
// });

router.get('/dashboard', async (req, res) => {
    try {
        const listingData = await Listing.findAll({
            where: {
                user_id: req.session.user_id
            },  
            include: [
                {
                    model: User,
                    attributes: ['name', 'id']
                },
                // {
                //     model: Review,
                //     attributes: ['comment'],
                //     include: [
                //         {
                //             model: User, 
                //             attributes: ['name', 'id']
                //         }
                //     ]
                // },
            ]
        })
        const savedListingData = await SavedListing.findAll({
            where: {
                user_id: req.session.user_id
            },  
            include: [
                {
                    model: User,
                    attributes: ['name', 'id']
                },
                {
                    model: Listing,
                    attributes: ['user', 'category', 'pricing'],
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
        const savedListing = savedListingData.map((savedListing) => savedListing.get({plain: true}));
        
        //console.log(listings)
        //res.status(200).json(listingData);
        res.render('dashboard', {
            listings, savedListing
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// router.get('/', async (req, res) => {
//     res.render('postlogin');
// });

// router.get('/', async (req, res) => {
//     res.render('search');
// });   
   

module.exports = router;