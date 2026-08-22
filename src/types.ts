interface Item {
   item: string
   price: number
   stock: number
   cost: number
   unit: string
   status: string
   category: string
}

interface Categories {
   name: string
   description: string
   total_items: number
   total_profit: number
   isProfitable: 'yes' | 'no'
}

interface QueryParams {
   value?: string
}

export type { Item, QueryParams, Categories }
