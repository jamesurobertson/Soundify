'use strict';
module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('Artist', {
    name: DataTypes.STRING,
    biography: DataTypes.TEXT,
    imageURL: DataTypes.STRING
  }, {});
  Artist.associate = function(models) {
    // associations can be defined here
    Artist.hasMany(models.Follower, {
      foreignKey: 'followableId',
      constraints: false,
      scope: {
        commentableType: 'artist'
      }
    })
    Artist.hasMany(models.Album,{
      foreignKey: 'artistId'
    })
  };
  return Artist;
};