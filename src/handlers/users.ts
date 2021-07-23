import express, {request, Request,Response} from 'express'
import {User,Users} from '../models/user'
import jwt from 'jsonwebtoken'
import verifyAuthToken from './verifyAuthToken'


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
        var token = jwt.sign({user:authenticate_user},process.env.TOKEN_SECRET!)
        res.json(token)
    }
    catch(err){
        res.status(401)
        res.json({err})
    }
}

const update = async (req: Request, res: Response) => {
    const user: User = {
        id: parseInt(req.params.id),
        username: req.body.username,
        password: req.body.password,
    }
    // try {
    //     const authorizationHeader = req.headers.authorization!
    //     const token = authorizationHeader.split(' ')[1]
    //     console.log(token)

    //     const decoded = jwt.verify(token, process.env.TOKEN_SECRET!)
    //     //@ts-ignore
    //     if(decoded.id !== user.id) {
            
    //         throw new Error('User id does not match!')
    //     }
    // } catch(err) {
    //     res.status(401)
    //     res.json(err)
    //     return
    // }

    try {
        const updated = await user_data.update(user)
        res.json(updated)
    } catch(err) {
        res.status(400)
        res.json(err + user)
    }
}

const users_routes = (app:express.Application) =>{
    app.get('/users',index)
    app.post('/users',create)
    app.post('/users/authenticate',authenticate)
    app.post('/users/:id',update)
    
}

export default users_routes