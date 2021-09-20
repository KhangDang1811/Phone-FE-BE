import User from '../models/UserModel.js';
import {generateToken} from '../untils/until.js';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';


// export const userdata = expressAsyncHandler(async (req,res) => {
//     const createUsers = await UserModel.insertMany(data.user);
//     res.send({createUsers});
// })


export const getAllUser = (req, res) => {
    User.find({})
        .then(user => res.send(user))
        .catch(err => console.log(err))
}

export const registerUser = expressAsyncHandler(async (req, res) => {
    const user = new User({
        // _id: req.body._id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: false,
    })
    // await user.save()
    // res.send({ 
    //   _id: req.body._id,
    //   name: req.body.name, 
    //   email: req.body.email,
    //   password: req.body.password,
    //     token: generateToken(user),
    const createUser = user.save();
    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        token: generateToken(user),
  
     });
})

// export const login =  expressAsyncHandler(async (req, res) => {
//     const user = await User.findOne({ email: req.body.email });
//     if (user) {
//       if (bcrypt.compareSync(req.body.password, user.password)) {
//         res.send({
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           isAdmin: user.isAdmin,
//           // isSeller: user.isSeller,
//           token: generateToken(user),
//         });
//         return;
//       }
//     }
//     res.status(401).send({ message: 'Invalid email or password' });
//   });

export const login = expressAsyncHandler(async (req, res) => {
  const user = await  User.findOne({email: req.body.email, password: req.body.password})
  if(user){ 
      res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
          isAdmin: user.isAdmin,
          token: generateToken(user),
      });
  }else{
      res.status(401).send({message: "invalid email or password"})
  }
})

export const DeleteUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findById({_id: req.params.id})

    if(user){
        await user.remove()
        res.send({message: 'user deleted'})
    }else{
        res.send({message: 'user not exists'})
    }
})
