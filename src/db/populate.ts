#!/usr/bin/env node

import { randomUUID } from 'node:crypto'
import { Client } from 'pg'

const url = process.argv[2]

console.log(url);

if (!url) {
   console.error('Usage: tsx src/db/populate.ts "postgresql://user:pass@host:5432/db"')
   process.exit(1)
}

const categories = [
   ['Produce', 'Fresh fruits and vegetables'],
   ['Dairy & Eggs', 'Milk, cheese, yogurt, and eggs'],
   ['Bakery', 'Breads, pastries, and fresh bakes'],
   ['Meat & Seafood', 'Fresh cuts of meat and fish'],
   ['Beverages', 'Juices, sodas, and bottled water'],
   ['Snacks', 'Chips, bars, and quick bites'],
   ['Frozen Foods', 'Frozen meals and ingredients'],
   ['Household', 'Home goods and paper products'],
   ['Personal Care', 'Toiletries and grooming'],
   ['Cleaning Supplies', 'Soaps, detergents, and cleaners'],
].map(([name, description]) => ({
   category_id: randomUUID(),
   name,
   description,
}))

const items = [
   ['Organic Apples', 'Produce', 2.49, 1.2, 150, 30],
   ['Whole Milk', 'Dairy & Eggs', 3.99, 2.1, 80, 20],
   ['Sourdough Bread', 'Bakery', 4.5, 2.4, 60, 15],
   ['Ground Beef', 'Meat & Seafood', 7.99, 5.1, 40, 10],
   ['Orange Juice', 'Beverages', 4.29, 2.6, 90, 25],
   ['Potato Chips', 'Snacks', 2.99, 1.5, 200, 40],
   ['Frozen Pizza', 'Frozen Foods', 5.99, 3.2, 70, 15],
   ['Paper Towels', 'Household', 6.49, 3.8, 55, 12],
   ['Toothpaste', 'Personal Care', 3.19, 1.7, 100, 25],
   ['All-Purpose Cleaner', 'Cleaning Supplies', 4.79, 2.9, 45, 10],
   ['Bananas', 'Produce', 1.29, 0.6, 180, 35],
   ['Cheddar Cheese', 'Dairy & Eggs', 5.49, 3.3, 50, 12],
   ['Butter Croissants', 'Bakery', 4.99, 2.8, 65, 15],
   ['Chicken Breast', 'Meat & Seafood', 6.79, 4.5, 48, 12],
   ['Bottled Water', 'Beverages', 1.99, 0.8, 300, 60],
   ['Chocolate Bar', 'Snacks', 1.79, 0.9, 250, 50],
   ['Vanilla Ice Cream', 'Frozen Foods', 4.99, 2.9, 35, 8],
   ['Trash Bags', 'Household', 7.29, 4.4, 60, 12],
   ['Shampoo', 'Personal Care', 5.79, 3.5, 40, 10],
   ['Dish Soap', 'Cleaning Supplies', 2.89, 1.4, 120, 30],
].map(([name, category, price, cost, stock, reorder_stock]) => {
   const categoryId = categories.find(c => c.name === category)?.category_id as string

   return {
      item_id: randomUUID(),
      name,
      price,
      cost,
      stock,
      reorder_stock,
      category_id: categoryId,
   }
})

async function run() {
   const client = new Client({ connectionString: String(url) })

   await client.connect()

   try {
      await client.query('BEGIN')

      for (const { category_id, name, description } of categories) {
         await client.query(
            'INSERT INTO categories (category_id, name, description) VALUES ($1, $2, $3)',
            [category_id, name, description],
         )
      }

      for (const item of items) {
         await client.query(
            `INSERT INTO items (item_id, name, price, cost, stock, reorder_stock, category_id)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
               item.item_id,
               item.name,
               item.price,
               item.cost,
               item.stock,
               item.reorder_stock,
               item.category_id,
            ],
         )
      }

      await client.query('COMMIT')

      console.log(`Inserted ${categories.length} categories and ${items.length} items.`)
   } catch (err) {
      await client.query('ROLLBACK')
      console.error('Populate failed:', err)
      process.exit(1)
   } finally {
      await client.end()
   }
}

void run()
