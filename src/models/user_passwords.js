/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_passwords', {
    Password_Id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    Password: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    User_Id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'users',
        key: 'User_Id'
      }
    },
    Password_Status: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    }
  }, {
    tableName: 'user_passwords'
  });
};
