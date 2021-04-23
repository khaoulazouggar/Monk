const express = require("express");
const router = express.Router();
const db = require("../db");
const fs = require("fs");
const md5 = require("md5");
const jimp = require("jimp");

saveImage = (image, folder) => {
  return new Promise((resolve, reject) => {
    const imgName = md5(new Date().getTime()) + ".jpg";
    const imgDest = `${folder}/${imgName}`;

    const base64Data = image ? image.replace(/^data:image\/\w+;base64,/, "") : "";
    const buffer = Buffer.from(base64Data, "base64");
    jimp.read(buffer, (err, rslt) => {
      if (err) {
      } else {
        fs.writeFile(imgDest, base64Data, "base64", function (err) {
          if (err) {
            reject("error_1");
          } else {
            resolve(imgName);
          }
        });
      }
    });
  });
};

router.post("/", (req, res) => {
  const content = req.body.content;
  const folder = "./images";
  if (!fs.existsSync(folder)) fs.mkdirSync(folder);
  saveImage(content, folder).then((rslt) => {
    if (rslt) {
      db.query("INSERT INTO `images`(`image`) VALUES (?)", [rslt]);
      res.send("updated");
    }
  });
});

module.exports = router;
