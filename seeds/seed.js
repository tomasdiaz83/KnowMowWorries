const sequelize = require('../config/connection');
const { User, Listing, Review, SavedListing } = require('../models')

const userData = require('./user-seeds.json');
const listingData = require('./listing-seeds.json');
const reviewData = require('./review-seeds.json')

const seedDatabase = async () => {
    const listingArray = [];
    const reviewArray = [];
    
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const listing of listingData) {
        
        const listingInfo = await Listing.create({
            ...listing,
            user_id: users[Math.floor(Math.random() * users.length)].id
        })

        listingArray.push(listingInfo);
    }

    for (const review of reviewData) {
        const reviewInfo = await Review.create({
            ...review,
            user_id: users[Math.floor(Math.random() * users.length)].id,
            listing_id: listingArray[Math.floor(Math.random() * listingArray.length)].id
        })

        reviewArray.push(reviewInfo)
    }

    for (let i = 0; i < 5; i++) {
        await SavedListing.create({
            user_id: users[Math.floor(Math.random() * users.length)].id,
            listing_id: listingArray[Math.floor(Math.random() * listingArray.length)].id
        })
    }

    process.exit(0);
};

seedDatabase();