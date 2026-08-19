import pool from './pool.ts'

async function fetchAllItems() {
   return await pool.query(
      'SELECT name, price, stock, cost, unit, status, category_id FROM items;',
   )
}

export { fetchAllItems }
