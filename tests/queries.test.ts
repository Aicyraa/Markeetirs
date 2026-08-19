import type { QueryResult } from 'pg'
import { fetchAllItems } from '../src/db/query.ts'

describe('Retrive Queries', () => {
   // Development Test
   it('Check if items is retrieve', async () => {
      const result: QueryResult = await fetchAllItems()
      expect(result.rows).toHaveLength(20)
   })
})
