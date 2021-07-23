import express, {request, Request,Response} from 'express'
import {User,Users} from '../models/user'
import jwt from 'jsonwebtoken'


const user_data = new Users()

const index = async(req:Request,res:Response)=>{
    const users = await user_data.index()
    res.json(users)
}

const create = async(req:Request,res:Response)=>{
    const user = {
        username : req.body.username,
        password : req.body.password
    }

    try{
        const new_user = await user_data.create(user)
        var token = jwt.sign({ user: new_user }, process.env.TOKEN_SECRET!);
        res.json(token)

    }catch(err){
        res.status(400)
        res.json(err + user)
    }
}

const authenticate = async(req:Request,res:Response)=>{
    
    const user = {
        username : req.body.username,
        password : req.body.password
    }
    try{

        const authenticate_user = await user_data.authenticate(user.username,user.password)
        var token = jwt.sign({ user: authenticate_user }, process.env.TOKEN_SECRET!);
        res.json(token)
    }
    catch(err){
        res.status(401)
        res.json({err})
    }
}

const users_routes = (app:express.Application) =>{
    app.get('/users',index)
    app.post('/users',create)
    app.post('/users/authenticate',authenticate)
    
}

export default users_routes