import { mySql } from '../config';
import Sequelize from 'sequelize';
import bcrypt from 'bcryptjs';
import { env } from '../config'
var fs = require('fs-extra');
var path = require('path');

var db = {
  Sequelize: Sequelize,
  sequelize: new Sequelize(mySql.config.database, mySql.config.user, mySql.config.password, {
    host: mySql.config.host,
    dialect: mySql.config.dialect,
    port: mySql.config.port,
    define: {
      timestamps: false
    },
    isolationLevel: "READ COMMITTED"        //Initial setting for sequelize transaction
  })
};



db.sequelize
  .authenticate()
  .then(function (err) {
    console.log('Connected  to Mysqldb successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:', err);
  });


//Concat all the model files 
//creating common model object for all the models and then import at each entity
fs.readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function (file) {
    var model = db.sequelize.import(path.join(__dirname, file));
    if (model.primaryKeyAttributes[0] == 'id') model.removeAttribute('id')
    db[model.name] = model;
  });

  //for join
db.users.hasMany(db.user_passwords, { as: 'password', foreignKey: 'User_Id' })

//hooks 
//for encrypting the user password before saving to db
db.user_passwords.hook('beforeCreate', function (passEntry) {
  console.log("Inside beforeSave");
  console.log("Before Encryption ", passEntry.Password);
  const rounds = env === 'test' ? 1 : 9;
  return bcrypt.hash(passEntry.Password, rounds)
    .then((hash) => {
      passEntry.Password = hash;
      console.log("After Encryption ", passEntry.Password);
    })
    .catch();
})

// export connection
module.exports = db;