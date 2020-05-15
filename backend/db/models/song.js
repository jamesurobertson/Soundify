'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    title: DataTypes.STRING,
    songLength: DataTypes.NUMERIC,
    albumId: DataTypes.INTEGER,
    songURL: DataTypes.STRING
  }, {});
  Song.associate = function(models) {
    Song.belongsTo(models.Album,{foreignKey: 'albumId'})
    
    columnMapping = {
      foreignKey: 'songId',
      through: 'PlaylistSongs',
      otherKey: 'playlistId'
    }

    Song.belongsToMany(models.Playlist,columnMapping)
  };
  return Song;
};