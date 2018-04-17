var uuid = require('uuid/V4');
// genetatedId:uuid()
var Model = require('../../models');
var sequelize = Model.sequelize;//for sequilize
import api_users from '../../model_fns/api_users';
import api_user_passwords from '../../model_fns/api_user_passwords';

export const create = (req, res, next) => {
  return sequelize.transaction(function (t) {
    console.log("passwod 1", req.body.password)
    // return Model.users.create({ //for every function in transction hav to write return
    //   User_Id: uuid(),
    //   First_Name: req.body.first_Name,
    //   Last_Name: req.body.last_Name,
    //   Email_Address: req.body.email,
    // }, { transaction: t })
    return api_users.create(req.body.first_Name, req.body.last_Name, req.body.email, t)//for every function in transction, hav to write return
      .then(function (user) {
        console.log("passwod 2", req.body.password)
        // return Model.user_passwords.create({
        //   Password_Id: uuid(),
        //   Password: req.body.password,
        //   User_Id: user.User_Id,
        //   Password_Status: 1
        // }, { transaction: t });
        return api_user_passwords.create(req.body.password, user.User_Id, t)
      });
  })
    .then((user) => {
      // user = user.get({ plain: true });//to get data object not in sequilize obj in console
      console.log("user", user);
      res.status(200).json(user).end();
    })
    .catch((err) => {
      // console.log("Catch block", err);
      if (err) res.status(400).end();
    })

}

export const index = (req, res, next) => {
  /*Model.users.findAll({
    attributes: ['User_Id', 'First_Name', 'Last_Name', 'Email_Address'],
    // where: {
    //   User_Id: req.params.id
    // },
    include: [{
      model: Model.user_passwords,
      as: 'password', attributes: ['Password']
    }],
    raw: true
  }) */
  api_users.getAllUsers()
    .then((user) => {
      //console.log("user", user);
      res.status(200).json(user).end();
    })
    .catch((err) => {
      if (err) res.status(400).end();
    })
}

//attributes: ['First_Name', 'Last_Name', 'Email_Address'],
export const show = (req, res, next) => {
  Model.users.find({
    where: {
      User_Id: req.params.id
    },
    include: [{
      model: Model.user_passwords,
      as: 'password', attributes: ['Password']
    }],
    raw: true
  })
    .then((user) => {
      console.log("user", user);
      res.status(200).json(user).end();
    })
    .catch((err) => {
      if (err) res.status(400).end();
    })
}


export const update = (req, res, next) => {
  return sequelize.transaction(function (t) {
    // return Model.users.update({
    //   First_Name: req.body.first_Name,
    //   Last_Name: req.body.last_Name,
    //   Email_Address: req.body.email
    // },
    //   {
    //     where: {
    //       User_Id: req.params.id
    //     }
    //   }, { transaction: t })
    return api_users.update(req.body.first_Name, req.body.last_Name, req.body.email, req.params.id, t)
      .then(function (user) {
        // user = user.get({ plain: true });//have to write only while reading and writing
        //   return Model.user_passwords.update({
        //     Password: req.body.password
        //   }, {
        //       where: {
        //         User_Id: req.params.id
        //       },
        //     }, { transaction: t });
        // });
        return api_user_passwords.update(req.body.password, req.params.id, t)
      })
  })
    .then((user) => {
      //user = user.get({ plain: true });//to get data object not in sequilize obj in console
      console.log("user", user);
      res.status(200).json(user).end();
    })
    .catch((err) => {
      // console.log("Catch block", err);
      if (err) res.status(400).end();
    })
}


export const destroy = (req, res, next) => {
  // return sequelize.transaction(function (t) {
  //   return Model.user_passwords.destroy({
  //     where: {
  //       User_Id: req.params.id
  //     }
  //   }, { transaction: t })
  return api_users.destroy(req.params.id, t)
      .then(function (user) {        // raw: true;

      //   return Model.users.destroy({
      //     where: {
      //       User_Id: req.params.id
      //     }
      //   }, { transaction: t });
      // });
  return api_user_passwords.destroy(req.params.id, t)
  })
    .then((user) => {
     // console.log("user", user);
      res.status(200).json(user).end();
    })
    .catch((err) => {
      // console.log("Catch block", err);
      if (err) res.status(400).end();
    })
}

