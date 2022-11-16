const router = require("express").Router();
const { User, Listing, SavedListing, Review } = require("../models");

router.get("/", async (req, res) => {
    try {
        const listingData = await Listing.findAll({
            include: [
                {
                    model: User,
                    attributes: ["name", "id"],
                },
            ],
        });

        const listings = listingData.map((listing) =>
            listing.get({ plain: true })
        );

        //res.status(200).json(listingData);
        res.render("home", {
            listings,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
router.get("/listing/:id", async (req, res) => {
    try {
        const listingData = await Listing.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["name", "email", "phone"],
                },
                {
                    model: Review,
                    // attributes: ['comment', 'user_id'],
                    include: [
                        {
                            model: User,
                            attributes: ["name"],
                        },
                    ],
                },
            ],
        });

        const listing = listingData.get({ plain: true });

        // res.status(200).json(listing);
        res.render("listingInfo", {
            listing,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/search", async (req, res) => {
    res.render("search", {
        logged_in: req.session.logged_in,
    });
});

router.post('/searchResults', async (req, res) => {
    try {
        let listingData;

        if (req.params.cat) {
            listingData = await Listing.findAll({
                where: {
                    location: req.body.location,
                    category: req.body.category
                },
                include: [
                    {
                        model: User,
                        attributes: ['name']
                    }
                ]
            })

        } else if (req.body.category) {
            listingData = await Listing.findAll({
                where: {
                    category: req.body.category
                },
                include: [
                    {
                        model: User,
                        attributes: ['name']
                    }
                ]
            })

        } else if (req.body.location) {
            listingData = await Listing.findAll({
                where: {
                    location: req.body.location
                },
                include: [
                    {
                        model: User,
                        attributes: ["name"],
                    },
                ],
            });
        }

        const listings = listingData.map((listing) => listing.get({ plain: true }));
        
        //res.status(200).json(listingData)
        res.render('searchResults', {
            listings,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/login", async (req, res) => {
    res.render("login");
});

router.get("/register", async (req, res) => {
    res.render("register");
});

router.get("/dashboard", async (req, res) => {
    try {
        const listingData = await Listing.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: User,
                    attributes: ["name", "id"],
                },
            ],
        });
        const savedListingData = await SavedListing.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: Listing,
                    attributes: ["title", "user_id", "category", "description"]
                },
            ],
        });

        const listings = listingData.map((listing) =>
            listing.get({ plain: true })
        );
        const savedListing = savedListingData.map((savedListing) =>
            savedListing.get({ plain: true })
        );

        res.render("dashboard", {
            listings,
            savedListing,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/newListing", async (req, res) => {
    res.render("newListing", {
        logged_in: req.session.logged_in,
    });
});

module.exports = router;
