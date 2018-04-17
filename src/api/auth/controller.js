import { sign } from '../../services/jwt'
import { success } from '../../services/response/'

export const login = ({ user }, res, next) =>
  sign(user.User_Id,{expiresIn:60*30}) //passing User_Id ((i.e.from response of user) to sign function of jwt and also passing expire time here it is 30 minutes
    .then((token) => ({ token, user: user })) //getting token as a response and forming object with key & value pairs. getting response as resp in below .then()
    .then((resp)=>{
      res.status(201).json(resp).end();
    })
    .catch(next)

// export const login = (req, res, next) =>  {
//   // console.log("req.body",req.body);
//   res.status(200).end();
// }
 
