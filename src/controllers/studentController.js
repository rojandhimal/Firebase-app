const { db } = require("../utils/auth");

exports.getAllStudents = async (req, res) => {
    let data=[];
    db.collection("students")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let tempData = doc.data();
        tempData.id = doc.id;
        data.push(tempData);
      });
      res.render('students/list', {
        students:data
    })
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
   
}


exports.addStudentForm = async (req, res) => {
    let students = [{id:1,name:"roja"}];
    Promise.all([students]).then(result => {
        res.render('students/form', {

        })
    })

}



exports.addStudentForm = async (req, res) => {
    let students = [{id:1,name:"roja"}];
    Promise.all([students]).then(result => {
        res.render('students/form', {

        })
    })

}

exports.saveStudent = async (req, res) => {
      db.collection("students")
        .doc()
        .set(req.body)
        .then(() => {
          res.redirect("/students");
        })
        .catch((error)=>{
            console.log("error",error)
        })
}

