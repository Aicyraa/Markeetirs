interface Item {
   name: string
   price: number
   stock: number
   cost: number
   unit: string
   status: string
   category: string
}

interface QueryParams {
   value?: string
} 

export type { Item, QueryParams }
