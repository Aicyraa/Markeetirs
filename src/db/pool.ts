import { Pool, type PoolConfig } from 'pg'

const { DB_PORT, DB, USERNAME, PASSWORD } = process.env

const config: Readonly<PoolConfig> = {
   connectionString: `postgresql://${USERNAME}"${PASSWORD}@localhost:${DB_PORT}/${DB}`,
}

export default new Pool(config)
