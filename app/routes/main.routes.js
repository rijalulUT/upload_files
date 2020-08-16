var multer  = require('multer')
const multers = multer({});
module.exports = app => {
    const upload = require("../controllers/upload")

    var express = require("express")
    var apps = express.Router()

    app.post('/upload-avatar',upload.uploadAvatar)
    app.post('/upload-photos',upload.uploadPhotos)
    app.post('/upload-pisah',upload.uploadPisah)
    app.post('/upload-pdf',multers.single('pdf'),upload.uploadPdf)
    app.use("/",apps)
}