import { Router } from 'express'
import { getAllItems } from '../controllers/itemsController.ts'

const itemsRouter = Router()

itemsRouter.get('', getAllItems)

export default itemsRouter
