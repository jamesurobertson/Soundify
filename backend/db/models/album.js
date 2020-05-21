'use strict';
module.exports = (sequelize, DataTypes) => {
    const Album = sequelize.define('Album', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageURL: {
            type: DataTypes.STRING,
            allowNull: false
        },
        artistId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {});
    Album.associate = function (models) {
        // associations can be defined here
        // Album.hasMany(models.Follower, {
        //   foreignKey: 'followableId',
        //   constraints: false,
        //   scope: {
        //     followableType: 'user'
        //   }
        // })
        Album.belongsToMany(models.User, {
            as: 'followers',
            through: {
                model: 'Follower',
                scope: {
                    followableType: 'album'
                }
            },
            foreignKey: 'followableId',
            constraints: false
        })

        Album.hasMany(models.Song, {
            foreignKey: 'albumId'
        })
        Album.belongsTo(models.Artist, {
            foreignKey: 'artistId'
        })
    };
    return Album;
};
