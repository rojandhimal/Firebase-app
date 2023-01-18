let studentController = require('../controllers/studentController');
var multer = require("multer");
const { uploadMiddleware } = require('../utils/upload');
const path = require("path");
const express = require("express");
const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: function (req, file, callback) {
      var ext = path.extname(file.originalname);
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.PNG' && ext !== '.JPG' && ext !== '.GIF' && ext !== '.JPEG') {
        return callback(new Error('Only images are allowed to upload'))
      }
      callback(null, true)
    }
  });

router.route('/')
    .get(studentController.getAllStudents)
router.route('/add')
    .get(studentController.addStudentForm)
    .post(upload.single("images"), uploadMiddleware,studentController.saveStudent)
router.route("/:id")
  .get(studentController.getStudentDetails)
  .delete(studentController.deleteStudentDetails)

router.route("/delete/:id")
  .get(studentController.deleteStudentDetails)

router.route("/edit/:id")
  .get(studentController.editStudentDetails)
  .post(studentController.editStudentDetails)

  
// router.route('/student/add')
    // .get(studentController.addStudentForm)
    // .post(upload.single("images"), uploadMiddleware,studentController.saveStudent)
    
module.exports = router;