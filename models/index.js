const User = require("./User")
const SavedListing = require("./SavedListing")
const Review = require("./Review")
const Listing = require("./Listing")

User.hasMany(SavedListing, {
    foreignKey: "userID",
    onDelete: "CASCADE"
})
User.hasMany(Review, {
    foreignKey: "userID",
    onDelete: "CASCADE"
})
User.hasMany(Listing, {
    foreignKey: "userID",
    onDelete: "CASCADE"
})

Listing.belongsTo(User, {
    foreignKey: "userID",
})

Listing.hasMany(Review, {
    foreignKey: "listingID",
    onDelete: "CASCADE"
})

Listing.hasMany(SavedListing, {
    foreignKey: "listingRef",
    onDelete: "CASCADE"
})

Review.belongsTo(User, {
    foreignKey: "userID",
})

Review.belongsTo(Listing, {
    foreignKey: "listingID",
})

SavedListing.hasMany(User, {
    foreignKey: "listingRef",
    onDelete: "CASCADE"
})

SavedListing.belongsTo(Listing, {
    foreignKey: "listingRef",
})
