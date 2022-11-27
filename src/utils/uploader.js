const { bucket } = require("./auth");
const saltedMd5 = require("salted-md5");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const fs = require("fs");

var upload = (localFile, remoteFile) => {
  let uuid = uuidv4();
  return bucket
    .upload(localFile, {
      destination: remoteFile,
      uploadType: "media",
      metadata: {
        contentType: "image/png",
        metadata: {
          firebaseStorageDownloadTokens: uuid,
        },
      },
    })
    .then((data) => {
      let file = data[0];
      return Promise.resolve(
        "https://firebasestorage.googleapis.com/v0/b/" +
          process.env.STORAGEBUCKET +
          "/o/" +
          encodeURIComponent(file.name) +
          "?alt=media&token=" +
          uuid
      );
    });
};

exports.uploadMiddleware = async (req, res, next) => {
  if (req.file) {
    const name = saltedMd5(req.file.originalname, "SUPER-S@LT!");
    const fileName = name + path.extname(req.file.originalname);
    await sharp(req.file.buffer)
      .toFormat("png")
      .png({ palette: true })
      // .jpeg({ quality: 70 })
      .toFile(`./public/uploads/${fileName}`);

    upload(`./public/uploads/${fileName}`, fileName).then((downloadURL) => {
      req.body.imageUrl = downloadURL;
      fs.unlink(`./public/uploads/${fileName}`, (err) => {
        if (err) {
          console.log("unlink error", err);
        }
      });
      next();
    });
  }
  if (!req.file) {
    req.body.imageUrl = "";
    next();
  }
};