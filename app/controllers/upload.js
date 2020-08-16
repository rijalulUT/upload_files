const dataReq = require('lodash')
var path = require("path")

exports.uploadAvatar = async (req,res) => {
    try {
        if(!req.files){
            res.send({
                status:false,
                message:"No file Uploaded"
            })
        }else{
            //use the name of input
            let avatar = req.files.avatar

            //use the mv() method to place the file in upload directory
            avatar.mv('./uploads/'+avatar.name)

            //sen response
            res.send({
                status: true,
                message: "File is Uploaded",
                data:{
                    name: avatar.name,
                    mimetype:avatar.mimetype,
                    size:avatar.size
                }
            })  
        }
    } catch (error) {
        res.status(500).send(err)
    }
}


exports.uploadPhotos = async (req,res) => {
    try {
        if(!req.files){
            res.send({
                status:false,
                message:"No file Uploaded"
            })
        }else{
           let data = []

           //loop all files
           dataReq.forEach(
                dataReq.keysIn(req.files.photos),
                (key) => {
                    let photo = req.files.photos[key]    

                    //move photo to uploads directory
                    photo.mv('./uploads/'+ photo.size + photo.name)

                    //push file details
                    data.push({
                        name: photo.name,
                        mimetype: photo.mimetype,
                        size : photo.size
                    })
                }
            )
           res.send({
               status: true,
               message: "Files Uploaded",
               data:data
           })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.uploadPisah = async (req,res) => {
    try {
        if(!req.files){
            res.send({
                status:false,
                message:"No file Uploaded"
            })
        }else{
           let data = []

           //loop all files
           dataReq.forEach(
                dataReq.keysIn(req.files.pisahs),
                (key) => {
                    let pisah = req.files.pisahs[key]    
                    let reqPath = path.join(__dirname,'../')
                     //move photo to uploads directory
                    if (pisah.mimetype == 'image/png') {
                        pisah.mv(reqPath+'publics/'+ pisah.size + pisah.name)
                        pisah.mv('./uploads/'+ pisah.size + pisah.name)
                    } else {
                        pisah.mv('./uploads/'+ pisah.size + pisah.name)

                    }
                   
                    //push file details
                    data.push({
                        name: pisah.name,
                        mimetype: pisah.mimetype,
                        size : pisah.size
                    })
                }
            )
           res.send({
               status: true,
               message: "Files Uploaded",
               data:data
           })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.uploadPdf = async(req,res,next)=>{
    const files = req.files
    
    if (!files) {
      const error = new Error('Please choose files')
      error.httpStatusCode = 400
      return next(error)
    }
    let pdf = req.files.pdf
    pdf.mv('./uploads/'+ pdf.size + pdf.name)
      res.send(files)
}
