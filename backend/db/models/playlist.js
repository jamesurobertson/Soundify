'use strict';
module.exports = (sequelize, DataTypes) => {
    const Playlist = sequelize.define('Playlist', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageURL: {
            type: DataTypes.STRING
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {});
    Playlist.associate = function (models) {
        // associations can be defined here
        // Playlist.hasMany(models.Follower, {
        //     foreignKey: 'followableId',
        //     constraints: false,
        //     scope: {
        //         followableType: 'playlist'
        //     }
        // })

        Playlist.belongsToMany(models.User, {
            as: 'followers',
            through: {
                model: 'Follower',
                scope: {
                    followableType: 'playlist'
                }
            },
            foreignKey: 'followableId',
            constraints: false
        })

        Playlist.belongsTo(models.User, {
            foreignKey: 'createdBy'
        })
        const columnMapping = {
            foreignKey: 'playlistId',
            through: 'PlaylistSongs',
            otherKey: 'songId'
        }
        Playlist.belongsToMany(models.Song, columnMapping)
    };
    return Playlist;
};
