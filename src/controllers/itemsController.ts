import type { Request, Response } from 'express'
import type { QueryParams } from '../types.ts'
import { validationResult } from 'express-validator'
import { fetchAllItems, fetchItem } from '../db/query.ts'

async function getAllItems(req: Request, res: Response) {
   const result = await fetchAllItems()
   res.render('index', { foodCount: result.rowCount, foods: result.rows, search_value: '' })
}

async function getItem(req: Request, res: Response) {
   const query: QueryParams = req.query

   if (!query.value) {
      // alert('Invalid searc!') // replace this with proper error modal
      res.status(400).redirect('/')
   }

   const result = await fetchItem(query?.value as string)
   res.render('index', {
      foodCount: result.rowCount,
      foods: result.rows,
      search_value: query.value,
   })
}

export { getAllItems, getItem }
