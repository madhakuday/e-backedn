import multer from 'multer'
import path from 'path'
import { Request, Express } from 'express'
const aws = require('aws-sdk')
// import slugify from 'slugify'
import {s3config} from '../helpers/s3-client';
import ResponseError from './Response/ResponseError'

const multerS3 = require('multer-s3');

interface MulterSetupProps {
  dest?: string
  allowedExt?: string[]
  limit?: {
    fieldSize?: number
    fileSize?: number
  }
}

const defaultFieldSize = 10 * 1024 * 1024 // 10mb
const defaultFileSize = 1 * 1024 * 1024 // 1mb
const defaultDestination = 'public/uploads/'
const defaultAllowedExt = ['.png', '.jpg', '.jpeg', '.xlsx', '.xls', '.pdf']

const multerSetup = (props: MulterSetupProps) => {
  // config storage
//   const storage2 = multer.diskStorage({
//     destination: props.dest || defaultDestination,
//     filename(req: Request, file: Express.Multer.File, cb): void {
//       const slugFilename = slugify(file.originalname, {
//         replacement: '_',
//         lower: true,
//       })
//       cb(null, [Date.now(), slugFilename].join('-'))
//     },
//   })
console.log(">>>",s3config);
// aws.config.update({
//   secretAccessKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
//   accessKeyId: 'XXXXXXXXXXXXXXX',
//   region: 'us-east-1'
// });

//   let s3 = new aws.S3();


 const storage = multerS3({
    s3: s3config,
    bucket: process.env.AWS_BUCKET_NAME,
    contentDisposition(req: Request, file: Express.Multer.File, cb: (arg0: null, arg1: string) => void): void {
      let contentDisposition = 'inline; filename="' + file.filename + '"';
      if ((file.mimetype.toLowerCase()).includes('pdf')) {
        contentDisposition = 'attachment; filename="' + file.filename + '"'; // save original file name for downloading
      }
      cb(null, contentDisposition);
  },
    metadata(req: Request, file: Express.Multer.File, cb: (arg0: null, arg1: { fieldName: string; }) => void): void {
        cb(null, { fieldName: file.fieldname });
    },
    key(req: Request, file: Express.Multer.File, cb: (arg0: null, arg1: string) => void): void {
        console.log(file)
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
});




  // config multer upload
  const ConfigMulter = multer({
    storage,
    fileFilter(req, file, cb) {
      const ext = path.extname(file.originalname)
      const allowedExt = props.allowedExt || defaultAllowedExt

      if (!allowedExt.includes(ext.toLowerCase())) {
        return cb(
          new ResponseError.BadRequest(
            `Only ${allowedExt.join(', ')} ext are allowed`
          )
        )
      }

      cb(null, true)
    },
    limits: props.limit || {
      fieldSize: defaultFieldSize,
      fileSize: defaultFileSize,
    },
  })

  return ConfigMulter
}

export default multerSetup