import { Pool, type PoolConfig } from 'pg'

const { DB_PORT, DB, USERNAME, PASSWORD } = process.env

const config: PoolConfig = {
   // connectionString: `postgres://${USERNAME}:${encodeURIComponent()}@localhost:${Number(DB_PORT)}/${DB}`
   host: 'localhost',
   database: 'food_inventory_system',
   user: 'jee',
   password: 'xx.jeeDB_06',
   port: 5432
}

export default new Pool({ ...config })
