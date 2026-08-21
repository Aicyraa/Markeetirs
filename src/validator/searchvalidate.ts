import { body } from 'express-validator'

export default [body('value').trim().isEmpty().withMessage('Search value cannot be empty!')]
