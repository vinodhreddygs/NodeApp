var uuid = require('uuid/V4');
// genetatedId:uuid()
var Model = require('../../models');
var sequelize = Model.sequelize;//for sequilize



export const create = (req, res, next) => {
  return sequelize.transaction(function (t) {
    console.log("passwod 1", req.body.password)
    return Model.users.create({
      User_Id: uuid(),
      First_Name: req.body.first_Name,
      Last_Name: req.body.last_Name,
      Email_Address: req.body.email,
    }, { transaction: t })
      .then(function (user) {
        user = user.get({ plain: true });
        console.log("passwod 2", req.body.password)
        return Model.user_passwords.create({
          Password_Id: uuid(),
          Password: req.body.password,
          User_Id: user.User_Id,
          Password_Status: 1
        }, { transaction: t });
      });
  })
    .then((user) => {
      user = user.get({ plain: true });//to get data object not in sequilize obj in console
      console.log("user", user);
      res.status(200).json(user).end();
    })
    .catch((err) => {
      // console.log("Catch block", err);
      if (err) res.status(400).end();
    })

}

export const index = (req, res, next) => {
  Model.users.findAll({
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
    .then((user) => {
      console.log("user", user);
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
    return Model.users.update({
      First_Name: req.body.first_Name,
      Last_Name: req.body.last_Name,
      Email_Address: req.body.email
    },
      {
        where: {
          User_Id: req.params.id
        }
      }, { transaction: t })
      .then(function (user) {
        // user = user.get({ plain: true });
        return Model.user_passwords.update({


          Password: req.body.password
        },
          {
            where: {
              User_Id: req.params.id
            },


          }, { transaction: t });
      });
  })
    .then((user) => {
      //user = user.get({ plain: true });//to get data object not in sequilize obj in console
      console.log("user", user);
      res.status(200).json(user).end();
    })
  // .catch((err) => {
  //   // console.log("Catch block", err);
  //   if (err) res.status(400).end();
  // })
}


export const destroy = (req, res, next) => {
  return sequelize.transaction(function (t) {
    return Model.user_passwords.destroy({
      where: {
        User_Id: req.params.id
      }
    }, { transaction: t })
      .then(function (user) {        // raw: true;

        return Model.users.destroy({
          where: {
            User_Id: req.params.id
          }
        }, { transaction: t });
      });
  })
    .then((user) => {
      console.log("user", user);
      res.status(200).json(user).end();
    })
    .catch((err) => {
      // console.log("Catch block", err);
      if (err) res.status(400).end();
    })
}

