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
   // Profit and Profit_Status
   return await pool.query(
      `
         SELECT categories.name AS category, description, 
            COUNT(*) as total_item,
            ((SUM(total_stock) * SUM(price)) - (SUM(total_stock) * SUM(cost))) as total_profit,
            CASE
               WHEN ((SUM(total_stock) * SUM(price)) - (SUM(total_stock) * SUM(cost))) > (SUM(total_stock) * SUM(cost)) THEN 'yes'
               ELSE 'no' 
            END AS is_profitable
         FROM categories
         JOIN items
         ON categories.category_id = items.category_id
         GROUP BY categories.name, description
      `,
   )
}

export { fetchAllItems, fetchItem, fetchAllCategories }
