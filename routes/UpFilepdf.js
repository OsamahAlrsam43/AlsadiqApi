const express = require("express");
const router = express.Router();

const {
    v4: uuidv4
} = require('uuid');

const Multer = require("multer");
const imgdatepath = [{data:uuidv4()}];

const dt = [];

const getRandomName = () => {

  let hexString = uuidv4();

  return hexString;
};

let storgelogo = Multer.diskStorage({

  
  
    destination: function(req, file, cb,) {
        cb(null, "./public/uploads");
  },
  

  filename: function (req, file, cb) {

    
    cb(null, `${Date.now()}-${file.originalname}`);
      //cb([], file.fieldname + '-' + Date.now() + path.extname(file.originalname))

    },
});

//upload image logo company
const uploadlogocompany = Multer({ storage: storgelogo,  limits: { fieldSize: 2 * 250000 * 250000 }
 }).array("FilePdf", 1);

var upload = Multer({ dest: 'uploads/' })



const fileuploadmodel = require("../model/FileUp");


//get All File In Database.
router.get("/", async (req, res) => {
    try {
      const GetAllFile = await fileuploadmodel.find();
      res.status(200).json({ data: GetAllFile });
    } catch (err) {
      console.error(err);
    }
  });

//Get one user  by Id User.
router.get("/:barcode", async (req, res) => {
    try {
    
         const GetAlluser = await fileuploadmodel.find({ "barcode": req.params.barcode });
         res.status(200).json({ success:true,data: GetAlluser });
  
    } catch (err) {
      console.error(err);
    }
  });
  
//Save New File.
router.post("/",uploadlogocompany, async (req, res) => {
    try {

      
      const {filename,barcode } = req.body;

        if (req.files.length > 0) {

 new fileuploadmodel({filename,barcode,FilePdf:req.files[0].filename,}).save();
 res.status(200).json({ msg:"تم رفع الملف بنجاح",success:true,data:await fileuploadmodel.find({ barcode}) });

        
       
   
      }
     
  } catch (err) {
    console.error(err);
  }
});



module.exports = router;