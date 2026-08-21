import type { QueryResult } from 'pg'
import type { Item } from '../src/types.ts'
import { fetchAllItems, fetchItem } from '../src/db/query.ts'

describe('Retrive Queries', () => {
   // Development Test
   it('Check if items is retrieve', async () => {
      const result: QueryResult = await fetchAllItems()
      expect(result.rows).toHaveLength(20)
   })

   it('Check if searching returns 2 items', async () => {
      const searchValue = 'or' // 
      const result: QueryResult = await fetchItem(searchValue)
      expect(result.rows).toHaveLength(2)
   })

   it('Check if or matches oranges juice', async () => {
      const searchValue = 'or' // Should return orange and organic paste
      const result: QueryResult = await fetchItem(searchValue)
      const firstItem: Item = result.rows[0]
      expect(firstItem.name).toMatch(/or/i)
   })
})
