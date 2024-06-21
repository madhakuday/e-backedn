import nodemailer from 'nodemailer'
import { isEmpty } from 'lodash'

require('dotenv').config()

const {
  APP_NAME,
  MAIL_DRIVER,
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USERNAME,
  MAIL_PASSWORD,
  MAIL_AUTH_TYPE,
  MAIL_SECURE
} = process.env


class EmailProvider {
  private mailConfig: nodemailer.SentMessageInfo

  private mailOptions: nodemailer.SendMailOptions | undefined

  public send = (
    to: string | string[],
    subject: string,
    template: string
  ): void | string[] => {
    const dest: string = Array.isArray(to) ? to.join(',') : to
    const text: string = template

    // send an e-mail
    this.sendMail(dest, subject, text)
  }

  private setMailConfig = (): nodemailer.SentMessageInfo => {
    const configTransport: nodemailer.SentMessageInfo = {
      service: MAIL_DRIVER,
      secureConnection: false,
      auth: {
        user: '',
      }
    }

      // SMTP Default
      configTransport.host = MAIL_HOST
      configTransport.port = MAIL_PORT
      configTransport.auth.user = MAIL_USERNAME
      configTransport.auth.pass = MAIL_PASSWORD
      // configTransport.tls.ciphers = MAIL_SECURE

    

    return configTransport
  }

  private setMailOptions = (
    dest: string,
    subject: string,
    text: string
  ): nodemailer.SendMailOptions => {
    return {
      from: `${APP_NAME} <${MAIL_USERNAME}>`,
      to: dest,
      subject,
      html: text,
    }
  }

  private sendMail = (
    dest: string,
    subject: string,
    text: string
  ): void | string[] => {
    this.mailConfig =  this.setMailConfig()
    this.mailOptions = this.setMailOptions(dest, subject, text)
    console.log(this.mailConfig);
    
    // Nodemailer Transport
    const transporter: nodemailer.Transporter = nodemailer.createTransport(
      this.mailConfig
    )
    transporter.sendMail(
      this.mailOptions,
      // @ts-ignore
      (error: Error, info: nodemailer.SentMessageInfo) => {
        if (error) {
          console.log(error)
        } else {
          console.log('successfully', info)
        }
      }
    )
  }
}

export default EmailProvider