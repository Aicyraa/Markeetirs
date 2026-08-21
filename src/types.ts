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
}

interface QueryParams {
   value?: string
}


export type { Item, QueryParams, Categories }
