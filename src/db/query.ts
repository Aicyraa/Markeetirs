import { matchedData } from 'express-validator'
import pool from './pool.ts'

async function fetchAllItems() {
   return await pool.query(
      `
         SELECT items.name as item, price, stock, cost, unit, status, categories.name as category FROM items
         LEFT JOIN categories
         ON items.category_id = categories.category_id
      `,
   )
}

async function fetchItem(name: string) {
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

export { fetchAllItems, fetchItem }
