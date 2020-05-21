'use strict';
module.exports = (sequelize, DataTypes) => {
    const Artist = sequelize.define('Artist', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        biography: {
            type: DataTypes.TEXT
        },
        imageURL: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {});
    Artist.associate = function (models) {
        // associations can be defined here
        // Artist.hasMany(models.Follower, {
        //   foreignKey: 'followableId',
        //   constraints: false,
        //   scope: {
        //     followableType: 'artist'
        //   }
        // })
        Artist.belongsToMany(models.User, {
            as: 'followers',
            through: {
                model: 'Follower',
                scope: {
                    followableType: 'artist'
                }
            },
            foreignKey: 'followableId',
            constraints: false
        })

        Artist.hasMany(models.Album, {
            foreignKey: 'artistId'
        })
    };
    return Artist;
};
