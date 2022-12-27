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

/*exports.viewStudentdetail = async (req, res) => {
  let students = [{id:1,name:"roja"}];
  Promise.all([students]).then(result => {
      res.render('students/form', {

      })
  })

}*/

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

exports.getStudentDetails = async (req, res) => {
  const {id} = req.params;
  console.log("id",id);
  db.collection("students")
    .doc(id)
    .get()
    .then((docs) => {
      const student = docs.data()

      res.render("students/view",{student})
    })
    .catch((error)=>{
        console.log("error",error)
    })
}


exports.editStudentDetails = async (req, res) => {
  const {id} = req.params;
  console.log("id",id);
  db.collection("students")
    .doc(id)
    .get()
    .then((docs) => {
      const student = docs.data()

      res.render("students/edit",{student})
    })
    .catch((error)=>{
        console.log("error",error)
    })
}

exports.deleteStudentDetails = async (req, res) => {
  const {id} = req.params;
  console.log("id",id);
  db.collection("students")
    .doc(id)
    .delete()
    .then(() => {
      res.redirect("/students")
    })
    .catch((error)=>{
        console.log("error",error)
    })
}
