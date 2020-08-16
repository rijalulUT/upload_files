const express = require("express")
const fileUpload = require("express-fileupload")
const cors = require("cors")
const bodyParser = require("body-parser")
const morgan = require("morgan")

const app = express()

app.use(express.static('app/publics'))

//create log
app.use(morgan("combined"))

// enable file upload
app.use(fileUpload({
    createParentPath : true,
    limits:{
        fileSize : 1024 * 1024
    },
    abortOnLimit: true
}))

//route
require("./app/routes/main.routes")(app)

//add another middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//start app
const port = process.env.PORT || 3000

app.listen(port, () => 
console.log(`App is listening to port ${port}`)
)