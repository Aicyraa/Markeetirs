import type { Request, Response } from 'express'
import { fetchAllItems } from '../db/query.ts'

async function getAllItems(req: Request, res: Response) {
   const result = await fetchAllItems()
   res.render('index', { foodCount: result.rowCount, foods: result.rows })
}

export { getAllItems }
