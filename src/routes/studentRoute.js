let studentController = require('../controllers/studentController');
var multer = require("multer");
const { uploadMiddleware } = require('../utils/uploader');
const path = require("path");

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

module.exports = (app) => {
    app.route('/students')
        .get(studentController.getAllStudents)
    app.route('/addstudent')
        .get(studentController.addStudentForm)
        .post(upload.single("images"), uploadMiddleware,studentController.saveStudent)
    app.route("/student/:id")
      .get(studentController.getStudentDetails)
      .delete(studentController.deleteStudentDetails)

    app.route("/student/delete/:id")
      .get(studentController.deleteStudentDetails)

    app.route("/student/edit/:id")
      .get(studentController.editStudentDetails)
      .post(studentController.editStudentDetails)

      
    // app.route('/student/add')
        // .get(studentController.addStudentForm)
        // .post(upload.single("images"), uploadMiddleware,studentController.saveStudent)
        
}