import { Router } from 'express'
import { getAllItems, getItem, getAllCategories } from '../controllers/itemsController.ts'

const itemsRouter = Router()

itemsRouter.get('', getAllItems)
itemsRouter.get('/search', getItem)
itemsRouter.get('/categories', getAllCategories)

export default itemsRouter
