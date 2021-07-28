import express, {request, Request, Response} from "express";
import { isConstructorDeclaration } from "typescript";
import {Order, OrderStore} from "../models/order";

const store = new OrderStore()

const index = async(_req:Request,res:Response) =>{
    const orders = await store.index()
    res.json(orders)
}

const show = async(req:Request,res:Response) =>{
    try{
        const get_order = await store.show(req.params.id)
        console.log(get_order)
        res.json(get_order)
    }catch(err){
        res.status(400)
        res.json(err)
    }
    
}

const create = async(req:Request,res:Response)=>{
    const order:Order = {
        status:req.body.status,
        user_id:req.body.user_id
    
    }
    try{
        const order_created = await store.create(order)
        res.json(order_created)
    }
    catch(err){
        res.status(400)
        res.json(err)
    }
   
}

const deleteOrder = async(req:Request,res:Response) =>{
    try{
        const del_order = await store.delete(req.params.id)
        res.json(del_order)
    }catch(err){
        res.status(400)
        res.json(err)
    }
    
}

const addProduct = async (_req: Request, res: Response) => {
    const orderId: string = _req.params.id
    const productId: string = _req.body.productId
    const quantity: number = parseInt(_req.body.quantity)
    console.log(orderId)
    console.log(productId)
    console.log(quantity)
    try {

      const addedProduct = await store.addProduct(quantity, orderId, productId)
      console.log(addProduct)
      res.json(addedProduct)
    } catch(err) {
      res.status(400)
      res.json(err)
    }
  } 

const order_routes = (app:express.Application) =>{
    app.get('/orders',index)
    app.post('/orders',create)
    app.get('/orders/:id',show)
    app.delete('/orders/:id',deleteOrder)
    app.post('/orders/:id/products', addProduct)

}

export default order_routes