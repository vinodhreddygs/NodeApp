/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    User_Id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    First_Name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Last_Name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Email_Address: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'users'
  });
};
