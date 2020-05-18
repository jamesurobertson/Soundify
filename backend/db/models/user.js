'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Follower, {
      foreignKey: 'followableId',
      constraints: false,
      scope: {
        followableType: 'user'
      }
    })
    User.hasMany(models.Playlist, {
      foreignKey: "createdBy"
    })
    User.hasMany(models.Follower, {
      foreignKey: "userId"
    })
  };
  return User;
};
