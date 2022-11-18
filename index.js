import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import { registerValidation,loginValidation, postCreateValidation } from './validations.js'
import UserModel from './models/User.js'
import checkAuth from './utils/checkAuth.js'
import User from './models/User.js'
import * as UserController from './controllers/UserController.js' 
import * as PostController from './controllers/PostController.js' 
mongoose.connect('mongodb+srv://almanac:080356almanac@cluster0.m7wffkp.mongodb.net/almanac?retryWrites=true&w=majority')
    .then(() => console.log('db ok'))
.catch((err)=>console.log('db ewrror', err))
const app = express();
app.use(express.json())



app.post('/api/login',loginValidation,UserController.login )
app.post('/api/register', registerValidation, UserController.register)
app.get('/api/me', checkAuth, UserController.getMe)


app.get('/posts', PostController.getAll)
app.get('/posts/:id',  PostController.getOne)
app.post('/posts',checkAuth, postCreateValidation,  PostController.create)
app.delete('/posts/:id',checkAuth, PostController.remove)
app.patch('/posts/:id',checkAuth,  PostController.update)

app.listen(3500, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('serv started')
}) 