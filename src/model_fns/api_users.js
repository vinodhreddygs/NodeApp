var Model = require('../models');
var uuid = require('uuid/V4');

//for passport
exports.getByEmail = function (email) {
    return Model.users.find({
        raw: true, //to get data object not sequilize obj while create use plain,
        where: {
            Email_Address: email
        }
    })
        .then((user) => {
            return user;
        })
        .catch((err) => {
            throw err;
        })
}

exports.getById = function (id) {
    return Model.users.find({
        raw: true, //to get data object not sequilize obj while create use plain,
        where: {
            User_Id: id
        }
    })
        .then((user) => {
            return user;
        })
        .catch((err) => {
            throw err;
        })
}

//from here for transaction
exports.create = function (firstname, lastname, emailaddress, t) {
    return Model.users.create({
        User_Id: uuid(),
        First_Name: firstname,
        Last_Name: lastname,
        Email_Address: emailaddress,
    }, { transaction: t })
        .then((user) => {
            user = user.get({ plain: true });
            return user;
        })
        .catch((err) => {
            throw err;
        })

}

exports.update = function (firstname, lastname, emailaddress, id, t) {
    return Model.users.update({
        First_Name: firstname,
        Last_Name: lastname,
        Email_Address: emailaddress
    },
        {
            where: {
                User_Id: id
            }
        }, { transaction: t })
        .then((user) => {

            return user;
        })
        .catch((err) => {
            throw err;
        })
}

exports.destroy = function ( id, t) {
    return Model.user_passwords.destroy({
        where: {
            User_Id: id
        }
    }, { transaction: t })
        .then((user) => {

            return user;
        })
        .catch((err) => {
            throw err;
        })
}

exports.getAllUsers = function () {
 return  Model.users.findAll({
        attributes: ['User_Id', 'First_Name', 'Last_Name', 'Email_Address'],
        // where: {
        //   User_Id: req.params.id
        // },
        include: [{
          model: Model.user_passwords,
          as: 'password', attributes: ['Password']
        }],
        raw: true
      })
      .then((users) => {
        return users;
    })
    .catch((err) => {
        throw err;
    })
}
