import client from '../database'

export type Order = {
    id?:Number;
    status:string;
    user_id:bigint;
}

export class OrderStore{
    async index():Promise<Order[]>{
        try{
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        }
        catch(err){
            throw new Error(`Not able to get orders ${err}`)
        }
    }

    async show(id:string):Promise<Order>{
        try{
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders where id=($1)'
            const result = await conn.query(sql,[id])
            conn.release()
            console.log(result.rows[0])
            return result.rows[0]
        }
        catch(err){
            throw new Error(`Could not find order ${id}. Error ${err}`)
        }
    }

    async create(o:Order):Promise<Order>{

        try{
            const conn = await client.connect()
            const sql = 'INSERT INTO orders (status,user_id) VALUES($1,$2) RETURNING *'
            const result = await conn.query(sql,[o.status,o.user_id])
            conn.release()
            return result.rows[0]
        }catch(err){
            throw new Error(`Could not add new products ${o.id}. Error: ${err}`)
        }
         
    }

    async delete(id: string): Promise<Order> {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)'
            // @ts-ignore
            const conn = await client.connect()

            const result = await conn.query(sql, [id])

            const product = result.rows[0]

            conn.release()

            return product
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`)
        }
    }
    async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
        try {
          const sql = 'INSERT INTO order_products (quantity,order_id,products_id) VALUES($1,$2,$3) RETURNING *'
          //@ts-ignore
          const conn = await client.connect()

          const result = await conn
              .query(sql,[quantity, orderId, productId])
            console.log(result)
          const order = result.rows[0]
    
          conn.release()
    
          return order
        } catch (err) {
          throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
      }

}

