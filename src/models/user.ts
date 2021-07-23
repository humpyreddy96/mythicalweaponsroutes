import bcrypt from 'bcrypt'
import { isParameterPropertyDeclaration } from 'typescript'
import client from '../database'

const saltRounds:string= process.env.SALT_ROUNDS!
const pepper = process.env.BCRYPT_PASSWORD

export type User = {
    id?:Number,
    username:string,
    password:string
}

export class Users{
    async index():Promise<User[]>{
        try{
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows

        }catch(err){
            throw new Error(`Cannot get user ${err}`)

        }
    }

    async create(u:User):Promise<User | null>{
        try{
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'INSERT INTO users (username, password_digest) VALUES($1, $2) RETURNING *'

            const hash = bcrypt.hashSync(
                u.password + pepper, 
                parseInt(saltRounds)
              );
      
            const result = await conn.query(sql, [u.username, hash])
            const user = result.rows[0]
      
            conn.release()
      
            return user
          } catch(err) {
            throw new Error(`unable create user (${u.username}): ${err}`)
          } 
        }       
        
        

        async authenticate(username: string, password: string): Promise<User | null> {
            const conn = await client.connect()
            const sql = 'SELECT password_digest FROM users WHERE username=($1)'
        
            const result = await conn.query(sql, [username])
        
            console.log(password+pepper)
        
            if(result.rows.length) {
        
              const user = result.rows[0]
        
              console.log(user)
        
              if (bcrypt.compareSync(password+pepper, user.password_digest)) {
                return user
              }
            }
        
            return null
          }

     
    }
