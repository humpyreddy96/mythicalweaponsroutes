import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  POSTGRES_TEST_USER,
  ENV,
} = process.env

console.log(ENV)
let connect
if(!ENV || ENV === 'dev') {
  connect = {
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  }
}
if(ENV === 'test') {
  connect = {
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  }
}
const pool = new Pool(connect);
pool.on('connect', () => {
	console.log(
		`${process.env.NODE_ENV} environment config loaded, db connection established`
	);
});
export default pool;