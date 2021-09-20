import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import {getAllUser, registerUser, login, DeleteUser} from '../controllers/UserController.js'
import {data} from '../data2.js';
import User  from '../models/UserModel.js';

import {isAuth, isAdmin} from '../untils/until.js';

const UserRouter = express.Router()

UserRouter.post('/register', registerUser)
UserRouter.post('/login', login)
// UserRouter.post('/login',async (req,res) =>{
//     const{email,password} = req.body;
//     try{
//         const user = await User.create({email,password});
//         res.status(201).json(user)
//     }catch(err){
//         console.log(err)
//         res.status(400).send('err')
//     }
// })

// UserRouter.post('/login' ,async (req,res) =>{
//      const {name,email,password,isAdmin} = req.body;
//      let user = {};
//      user.name = name;
//      user.email = email;
//      user.password = password;
//      user.isAdmin = isAdmin;
//      let userModel = new User(user);
//      await userModel.save();
//      res.json(userModel);
//     const dbUser = req.body;
//     User.create(dbUser, (err,data) =>{
//         if(err){
//             res.status(500).send(err)
//         }else{
//             res.status(200).send(data)
//         }
//     })
// });

UserRouter.get('/register', registerUser)
UserRouter.get('/login', login)

UserRouter.get('/', getAllUser)
UserRouter.delete('/delete/:id', DeleteUser)

UserRouter.get('/seed',  expressAsyncHandler(async (req,res) => {
    await User.remove({});
    const createUsers = await User.insertMany(data.user);
    res.send({createUsers});
}));

export default UserRouter
