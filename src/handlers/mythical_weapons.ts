import express, {request, Request,Response} from 'express'
import {Weapon, MythicalWeaponStore} from '../models/mythical_weapon'
import verifyAuthToken from './verifyAuthToken'

const store = new MythicalWeaponStore()

const index = async (_req:Request,res:Response) =>{
    const weapons = await store.index()
    res.json(weapons)
}

const show = async (req: Request, res: Response) => {
    const weapon = await store.show(req.params.id)
    res.json(weapon)
 }

 const create = async (req: Request, res: Response) => {

    const weapon: Weapon = {
        name: req.body.name,
        type: req.body.type,
        weight:req.body.weight
}
    try {
        const newArticle = await store.create(weapon)
        res.json(newArticle)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}
const update = async (req:Request,res: Response) =>{

    try{
        const weapon:Weapon = {
            name:req.body.name,
            type:req.body.type,
            weight:req.body.weight,
            id:req.body.id
        }
        const updated = await store.update(weapon)
        res.json(updated)
    }catch(err){
        res.status(400)
        res.json(err)
    }

}
const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}


const mythical_weapon_routes = (app: express.Application) => {
    app.get('/weapons',index)
    app.get('/weapons/:id',show)
    app.post('/weapons',verifyAuthToken, create)
  app.delete('/weapons', destroy)
  app.patch('/weapons',update)
}

export default mythical_weapon_routes