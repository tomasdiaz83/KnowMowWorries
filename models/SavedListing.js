const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class SavedListing extends Model {}

SavedListing.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        listingRef: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'listing',
                key: 'id',
            },
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'savedlisting',
    }
);

module.exports = SavedListing;