import { Router } from 'express'
import { getAllItems, getItem } from '../controllers/itemsController.ts'
import searchValidate from '../validator/searchvalidate.ts'

const itemsRouter = Router()

itemsRouter.get('', getAllItems)
itemsRouter.get('/search', getItem)

export default itemsRouter
