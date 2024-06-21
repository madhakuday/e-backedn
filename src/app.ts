import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import path from 'path'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import indexRouter from './routes'
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import createError from 'http-errors'
import ExpressErrorYup from './middleware/ExpressErrorYup'
import ExpressErrorResponse from './middleware/ExpressErrorResponse'
import ExpressErrorSequelize from './middleware/ExpressErrorSequelize'
import withState from './helpers/withState'
import ExpressAutoHandleTransaction from './middleware/ExpressAutoHandleTransaction'

const GenerateDoc = require('./utils/GenerateDocs')

const app = express()
app.set('views', path.join(`${__dirname}/../`, 'views'))
app.use(express.static(path.join(`${__dirname}/../`, "public")));
app.set('view engine', 'pug')
app.use(cors({
  origin: true,
  credentials: true,
  methods:['GET','POST','PUT']
}))
app.set('trust proxy', 1);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser(process.env.SECRET));

// Initial Docs Swagger
GenerateDoc(app)

app.use(helmet())
app.use(cookieSession({secret: process.env.SECRET,  secure: true,signed:false}));

app.use((req: Request, res, next) => {
  new withState(req)
  next()
})



// Initial Route
app.use(indexRouter)

async function handleRollbackTransaction(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await req.rollbackTransactions()
    // eslint-disable-next-line no-empty
  } catch (e) {}
  next(err)
}

app.use('/v1/', handleRollbackTransaction)
app.use('/v1/', ExpressErrorYup)
app.use('/v1/', ExpressErrorSequelize)
app.use('/v1/', ExpressErrorResponse)
app.use(ExpressAutoHandleTransaction)

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
    next(createError(404))
  })

  // error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message
  
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})
module.exports = app