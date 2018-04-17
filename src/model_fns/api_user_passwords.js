var Model = require('../models');
var uuid = require('uuid/V4');

//for passport
exports.getActiveUserPassword = function (userId) {
    return Model.user_passwords.find({
        raw: true, //to get data object not sequilize obj while create use plain,
        where: {
            User_Id: userId,
            Password_Status: 1
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
exports.create = function (password, user_id, t) {
    return Model.user_passwords.create({
        Password_Id: uuid(),
        Password: password,
        User_Id: user_id,
        Password_Status: 1
    }, { transaction: t })
        .then((user) => {
            user = user.get({ plain: true });
            return user;
        })
        .catch((err) => {
            throw err;
        })

}

exports.update = function (password, id, t) {
    return Model.user_passwords.update({
        Password: password
    }, {
            where: {
                User_Id: id
            },
        }, { transaction: t })
        .then((user) => {
            return user;
        })
        .catch((err) => {
            throw err;
        })
}

exports.destroy = function ( id, t) {
    return Model.users.destroy({
        where: {
            User_Id:id
        }
    }, { transaction: t })
        .then((user) => {
            return user;
        })
        .catch((err) => {
            throw err;
        })
}