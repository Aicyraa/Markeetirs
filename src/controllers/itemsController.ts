import type { Request, Response } from 'express'
import type { Categories, QueryParams } from '../types.ts'
import { fetchAllCategories, fetchAllItems, fetchItem } from '../db/query.ts'

async function getAllItems(req: Request, res: Response) {
   const result = await fetchAllItems()
   res.render('index', { itemCount: result.rowCount, items: result.rows, search_value: '' })
}

async function getItem(req: Request, res: Response) {
   const query: QueryParams = req.query

   if (!query.value) {
      res.status(400).redirect('/')
   }

   const result = await fetchItem(query?.value as string)
   res.render('index', {
      itemCount: result.rowCount,
      items: result.rows,
      search_value: query.value,
   })
}

async function getAllCategories(req: Request, res: Response) {
   const categories = await fetchAllCategories()
   res.render('categories', { categories: categories.rows })
}

export { getAllItems, getItem, getAllCategories }
