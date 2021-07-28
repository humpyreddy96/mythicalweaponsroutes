import client from '../database'

export class DashboardQueries{
    async productsInOrders():Promise<{name:string,price:number,order_id:string}[]>{
        try{
            //@ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT name,price,order_id FROM products JOIN order_products ON products.id=order_products.products_id'
            const result = await conn.query(sql)
            return result.rows
        }catch(err){
            throw new Error(`unable to get the products and orders ${err}`)
        }
    }

    async usersWithOrders(): Promise<{firstName: string, lastName: string}[]> {
        try {
          //@ts-ignore
          const conn = await client.connect()
          const sql = 'SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id'
    
          const result = await conn.query(sql)
    
          conn.release()
    
          return result.rows
        } catch (err) {
          throw new Error(`unable get users with orders: ${err}`)
        } 
      }

      async fiveMostExpensive(): Promise<{name: string, price: number}[]> {
        try {
          //@ts-ignore
          const conn = await client.connect()
          const sql = 'SELECT name, price FROM products ORDER BY price DESC LIMIT 5'
    
          const result = await conn.query(sql)
    
          conn.release()
    
          return result.rows
        } catch (err) {
          throw new Error(`unable get products by price: ${err}`)
        } 
      }
}


