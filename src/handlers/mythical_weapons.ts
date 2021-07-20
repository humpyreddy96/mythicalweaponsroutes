import express, {Request,Response} from 'express'
import {Weapon, MythicalWeaponStore} from '../models/mythical_weapon'

const store = new MythicalWeaponStore()

const index = async (_req:Request,res:Response) =>{
    const weapons = await store.index()
    res.json(weapons)
}

const show = async (req:Request,res:Response)=>{
    const weapon = await store.show(req.body.id)
    res.json(weapon)
}

const mythical_weapon_routes = (app: express.Application) => {
    app.get('/products',index)
    app.get('/products/:id',show)
}

export default mythical_weapon_routes