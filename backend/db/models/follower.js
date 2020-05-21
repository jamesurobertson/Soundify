'use strict';
module.exports = (sequelize, DataTypes) => {
    const Follower = sequelize.define('Follower', {
        title: DataTypes.STRING,
        followableType: DataTypes.STRING,
        followableId: DataTypes.INTEGER,
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users'
            }
        }
    }, {});
    Follower.associate = function (models) {
        // Follower.belongsTo(models.User), {
        //   foreignKey: 'followableId',
        //   constraints: false
        // }

        // Follower.belongsTo(models.Artist), {
        //   foreignKey: 'followableId',
        //   constraints: false
        // }

        // Follower.belongsTo(models.Playlist), {
        //   foreignKey: 'followableId',
        //   constraints: false
        // }

        // Follower.belongsTo(models.Album), {
        //   foreignKey: 'followableId',
        //   constraints: false
        // }

        // Follower.belongsTo(models.User, {
        //     foreignKey: 'userId'
        // })

        // Follower.addHook("afterFind", findResult => {
        //   if (!Array.isArray(findResult)) findResult = [findResult];
        //   for (const instance of findResult) {
        //     if (instance.followableType === "user" && instance.user !== undefined) {
        //       instance.followable = instance.user;
        //     } else if (instance.followableType === "artist" && instance.artist !== undefined) {
        //       instance.followable = instance.artist;
        //     } else if (instance.followableType === "playlist" && instance.playlist !== undefined) {
        //       instance.followable = instance.playlist;
        //     } else if (instance.followableType === "album" && instance.album !== undefined) {
        //       instance.followable = instance.album;
        //     }
        //     // To prevent mistakes:
        //     delete instance.user;
        //     delete instance.dataValues.user;
        //     delete instance.artist;
        //     delete instance.dataValues.artist;
        //     delete instance.playlist;
        //     delete instance.dataValues.playlist;
        //     delete instance.album;
        //     delete instance.dataValues.album;
        //   }
        // })

        // Follower.prototype.getfollowable = function (options) {
        //   if (!this.followableType) return Promise.resolve(null)
        //   const str = this.followableType
        //   const mixinMethodName = `get${str[0].toUpperCase()}${str.substr(1)}`
        //   return this[mixinMethodName](options)
        // }
    };
    return Follower;
};
