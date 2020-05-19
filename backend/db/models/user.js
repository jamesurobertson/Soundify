'use strict';
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
