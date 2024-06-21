import path from 'path'
import handlebars from 'handlebars'
import { readHTMLFile } from './file'
import EmailProvider from '../config/email'
import ResponseError from '../modules/Response/ResponseError'
import { BASE_URL_CLIENT } from '../config/baseURL'

const { APP_NAME } = process.env

class SendEmail {
  
}

export default SendEmail