'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    title: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    artistId: DataTypes.INTEGER
  }, {});
  Album.associate = function (models) {
    // associations can be defined here
    Album.hasMany(models.Follower, {
      foreignKey: 'followableId',
      constraints: false,
      scope: {
        commentableType: 'user'
      }
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