const express = require("express");
const bosyparser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieparser = require("cookie-parser");

//Database

const db = require("./db");
db("alsadiq");


//Dotenv
const dotenv = require("dotenv")
dotenv.config()

global.__basedir = __dirname;


//Setting App
const app = express();
app.use(morgan("dev"));
app.use(helmet());

app.use(cors());
app.use(bosyparser.urlencoded({ extended: false }));
app.use(bosyparser.json());
app.use(cookieparser());

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

//use image up;oads
const serveIndex = require('serve-index');


//show image
app.use('/ftp/:token&:role', express.static('public'), serveIndex('public', {
  'icons': true
}));

app.use('/ftp/', express.static('public'));

// -> route users
app.use("/api/v1/fileupload", require("./routes/UpFilepdf"));

//Connect & Port
//const port =process.env.PORTSERVER;
//app.listen(8083, () => console.log(`server start on the port 8083`));

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

