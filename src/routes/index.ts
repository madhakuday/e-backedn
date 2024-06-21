import express, { Request, Response, NextFunction } from 'express'
import ResponseError from '../modules/Response/ResponseError'
import masterRoute from './orderRoute'

const router = express.Router()


/* Forbidden Page. */
router.get('/v1/', function (req: Request, res: Response, next: NextFunction) {
  throw new ResponseError.Forbidden('forbidden, wrong access endpoint')
})

/* Declare Route */
router.use('/v1/order-defects/', masterRoute)

export default router