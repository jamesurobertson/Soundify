'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    imageURL: DataTypes.STRING,
    createdBy: DataTypes.INTEGER
  }, {});
  Playlist.associate = function(models) {
    // associations can be defined here
    Playlist.hasMany(models.Follower, {
      foreignKey: 'followableId',
      constraints: false,
      scope: {
        folloewableType: 'playlist'
      }
    })
    Playlist.belongsTo(models.User,{
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
