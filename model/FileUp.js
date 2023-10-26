const mongoose = require("mongoose");


const fileuploadSchema = mongoose.Schema({
  filename: {
    type: String,
    require: false,
  },
  barcode: {
    type: String,
    require: false,
  },
  FilePdf: {
    type: String,
    require: true,
  } 

  
  
 


},
  { timestamps: true });

const fileuploadmodel = mongoose.model("fileupload", fileuploadSchema);

module.exports = fileuploadmodel;

