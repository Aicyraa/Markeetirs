import type { Express, Request, Response, NextFunction } from 'express'
import express from 'express'
import dotenv from 'dotenv'
import path from 'node:path'
dotenv.config()

const port = process.env.PORT
const app: Express = express()

app.set('views', path.join(import.meta.dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded())

app.use((req: Request, res: Response, next: NextFunction) => {
   console.log(`Request made to ${req.url}`)
   console.dir(req)
})

app.listen(port, err => {
   if (err) {
      throw err.message
   }
})
