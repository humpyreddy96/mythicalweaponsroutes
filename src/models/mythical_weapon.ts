import client from '../database'

export type Weapon = {
    id:Number;
    name:string;
    type:string;
    weight:number;
}

export class MythicalWeaponStore{

    async index():Promise<Weapon[]>{

        try{
            // @ts-ignore
            const conn = await client.connect() 
            const sql = 'SELECT * FROM mythical_weapons' 
            const result = await conn.query(sql)
            conn.release()
            return result.rows
    
        }catch(err){
            throw new Error(`Cannot get wepaons ${err}`)
        }
       
    }
}

