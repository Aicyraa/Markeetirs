import type { Categories, Item } from '../types.ts'
import type { QueryResult } from 'pg'
import pool from './pool.ts'

// Add new column for items "total stock" that derives from stock

async function fetchAllItems(): Promise<QueryResult<Item>> {
   return await pool.query(
      `
         SELECT items.name as item, price, stock, total_stock, cost, unit, status, categories.name as category FROM items
         LEFT JOIN categories
         ON items.category_id = categories.category_id
      `,
   )
}

async function fetchItem(name: string): Promise<QueryResult<Item>> {
   return await pool.query(
      `
         SELECT items.name as item, price, stock, cost, unit, status, categories.name as category FROM items
         LEFT JOIN categories
         ON items.category_id = categories.category_id 
         WHERE items.name ILIKE '%' || $1 || '%' 
         ORDER BY items.name
      `,
      [name],
   )
}

async function fetchAllCategories(): Promise<QueryResult<Categories>> {
   // Reconsider the query
   return await pool.query(
      `
         SELECT name, description FROM categories;
      `,
   )
}

export { fetchAllItems, fetchItem, fetchAllCategories }
