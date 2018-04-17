import passport from 'passport'
//import { Schema } from 'bodymen'
import { BasicStrategy } from 'passport-http'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { jwtSecret, masterKey } from '../../config'
//import User, { schema } from '../../api/user/model'
import Model from '../../models'
import api_users from '../../model_fns/api_users'
import api_user_passwords from '../../model_fns/api_user_passwords'
export const password = () => (req, res, next) =>
  passport.authenticate('password', { session: false }, (err, user, info) => {
    if (err && err.param) {
      return res.status(400).json(err)
    } else if (err || !user) {
      console.log("Going to send 401");
      return res.status(401).end()
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return res.status(401).end()
      next()
    })
  })(req, res, next)

export const master = () =>
  passport.authenticate('master', { session: false })

export const token = ({ required } = {}) => (req, res, next) =>
  passport.authenticate('token', { session: false }, (err, user, info) => {
    if (err || (required && !user)) { // if err or no record then send 401 response
      return res.status(401).end()
    }
    req.logIn(user, { session: false }, (err) => {
      console.log("In here at login")
      if (err) return res.status(401).end()
      next()
    })
  })(req, res, next)

passport.use('password', new BasicStrategy((email, password, done) => {
  console.log("email", email);
  console.log("password", password);
  // const userSchema = new Schema({ email: schema.tree.email, password: schema.tree.password })

  // userSchema.validate({ email, password }, (err) => {
  //   if (err) done(err)
  // })

  // User.findOne({ email }).then((user) => {
  //   if (!user) {
  //     done(true)
  //     return null
  //   }
  //   return user.authenticate(password, user.password).then((user) => {
  //     done(null, user)
  //     return null
  //   }).catch(done)
  // })
  api_users.getByEmail(email)
    .then((user) => {
      if (!user) {
        console.log("User is not present in db");
        done(true);
        return null
      }
      console.log("Email is present in db", user);
      api_user_passwords.getActiveUserPassword(user.User_Id)
        .then((passRecord) => {
          if (!passRecord) {
            done(true);
            return null
          }
          console.log("password record", passRecord);
          Model.user_passwords.authenticate(password, passRecord)
            .then((matched) => {
              console.log("Received ", matched);
              if (!matched) {
                console.log("Incorrect password");
                done(true);
                return null
              }
              else {
                done(null, user);
                return null;
              }
            })
            .catch((err) => {
              done();
            })
        })

    })
    .catch((err) => {
      done();
    })
}))

passport.use('master', new BearerStrategy((token, done) => {
  if (token === masterKey) {
    done(null, {})
  } else {
    done(null, false)
  }
}))

passport.use('token', new JwtStrategy({
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromUrlQueryParameter('access_token'),
    ExtractJwt.fromBodyField('access_token'),
    ExtractJwt.fromAuthHeaderWithScheme('Bearer')// id will be extracted from bearer or token i.e. id
  ])
}, ({ id }, done) => {
  // User.findById(id).then((user) => {
  //   done(null, user)
  //   return null
  // }).catch(done)
  api_users.getById(id) // if id in the token matches the user-id of users in table then get the user
    .then((user) => { //getting record
      done(null, user) //send the user record to the above function
      return null
    })
    .catch(done)
}))
