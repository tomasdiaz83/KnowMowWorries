const User = require("./User")
const SavedListing = require("./SavedListing")
const Review = require("./Review")
const Listing = require("./Listing")

User.hasMany(Listing, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
})

Listing.belongsTo(User, {
    foreignKey: "user_id",
})

User.hasMany(SavedListing, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
})

SavedListing.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
})

User.hasMany(Review, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
})

Review.belongsTo(User, {
    foreignKey: "user_id",
})

Listing.hasMany(Review, {
    foreignKey: "listing_id",
    onDelete: "CASCADE"
})

Review.belongsTo(Listing, {
    foreignKey: "listing_id",
})

Listing.hasMany(SavedListing, {
    foreignKey: "listing_id",
    onDelete: "CASCADE"
})

SavedListing.belongsTo(Listing, {
    foreignKey: "listing_id",
})

module.exports = { User, Listing, Review, SavedListing}