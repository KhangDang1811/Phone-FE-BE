import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import {getAllUser, registerUser, login, DeleteUser} from '../controllers/UserController.js'
import {data} from '../data2.js';
import User  from '../models/UserModel.js';

import {isAuth, isAdmin} from '../untils/until.js';

const UserRouter = express.Router()

UserRouter.post('/register', registerUser)
UserRouter.post('/login', login)

UserRouter.get('/register', registerUser)
UserRouter.get('/login', login)

UserRouter.get('/alluser', getAllUser)
UserRouter.delete('/delete/:id', DeleteUser)

UserRouter.get('/seed',  expressAsyncHandler(async (req,res) => {
    // await User.remove({});
    const createUsers = await User.insertMany(data.user);
    res.send({createUsers});
}));

export default UserRouter
