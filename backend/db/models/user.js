'use strict';
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        hashedPassword: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {});
    User.associate = function (models) {
        // associations can be defined here
        // User.hasMany(models.Follower, {
        //     foreignKey: 'followableId',
        //     constraints: false,
        //     scope: {
        //         followableType: 'user'
        //     }
        // })

        User.belongsToMany(models.Album, {
            as: 'followedAlbums',
            through: {
                model: 'Follower',
                scope: {
                    followableType: 'album'
                }

            },
            foreignKey: 'userId',
            constraints: false
        })
        User.belongsToMany(models.Artist, {
            as: 'followedArtists',
            through: {
                model: 'Follower',
                scope: {
                    followableType: 'artist'
                }

            },
            foreignKey: 'userId',
            constraints: false
        })
        User.belongsToMany(models.Playlist, {
            as: 'followedPlaylists',
            through: {
                model: 'Follower',
                scope: {
                    followableType: 'playlist'
                }

            },
            foreignKey: 'userId',
            constraints: false
        })
        User.belongsToMany(models.Song, {
            as: 'followedSongs',
            through: {
                model: 'Follower',
                scope: {
                    followableType: 'song'
                }

            },
            foreignKey: 'userId',
            constraints: false
        })
        //To see if this user follows any other user
        User.belongsToMany(models.User, {
            as: 'followedUsers',
            through: {
                model: 'Follower',
                scope: {
                    followableType: 'user'
                }

            },
            foreignKey: 'userId',
            constraints: false
        })

        //To ensure that this user can also be followed 
        User.belongsToMany(models.User, {
            as: 'followers',
            through: {
                model: 'Follower',
                scope: {
                    followableType: 'user'
                }

            },
            foreignKey: 'followableId',
            constraints: false
        })

        User.hasMany(models.Playlist, {
            foreignKey: "createdBy"
        })
        User.hasMany(models.Follower, {
            foreignKey: "userId"
        })
    };

    User.prototype.validatePassword = function (password) {
        // Note that since this function is a model instance method,
        // `this` is the user instance here:
        return bcrypt.compareSync(password, this.hashedPassword.toString());
    };

    return User;
};
