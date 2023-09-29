import multer from 'multer'
import path from 'path'
import { v4 as uuid } from 'uuid'

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dest = path.join(__dirname, '..', '..', 'uploads/')
        cb(null, dest)
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        cb(null, uuid()+ '.' + ext)
    }
})

export const fileUpload = multer({ storage: fileStorage })