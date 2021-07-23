import jwt from 'jsonwebtoken'
import express, {request, Request,Response} from 'express'

//@ts-ignore
const verifyAuthToken = (req: Request, res: Response, next) => {
    try {
        const authorizationHeader = req.headers.authorization!
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET!)
        next()
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
}


export default verifyAuthToken