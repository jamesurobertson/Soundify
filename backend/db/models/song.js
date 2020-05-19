'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    songLength: {
      type: DataTypes.NUMERIC,
      allowNull: false
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    songURL: {
    type:DataTypes.STRING,
    allowNull: false
  }
  }, {});
  Song.associate = function(models) {
    Song.belongsTo(models.Album,{foreignKey: 'albumId'})

    const columnMapping = {
      foreignKey: 'songId',
      through: 'PlaylistSongs',
      otherKey: 'playlistId'
    }

    Song.belongsToMany(models.Playlist, columnMapping)
  };
  return Song;
};
