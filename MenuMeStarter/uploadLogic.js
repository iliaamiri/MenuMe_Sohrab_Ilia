const fs = require("fs").promises;
const path = require("path");
const formidable = require("formidable");
const { existsSync, renameSync } = require("fs");
const uploadFolder = path.join(__dirname, "menus");

const processUpload = (request, _) => {
  return new Promise((resolve, reject) => {
    const form = formidable.IncomingForm();
    form.uploadDir = uploadFolder;
    form.parse(request, (err, _, files) => {
      if (JSON.stringify(files) === "{}"){
        reject("Invalid file");
      }
      if (err) {
        reject(err);
      } else {
        const file = files.myFile.path;
        const randomName = (Math.random() + 1).toString(36).substring(7);
        const menuName = `menu_${randomName}.csv`;
        renameSync(file, path.join(file, "..", menuName));
        resolve(menuName);
      }
    });
  });
};

const uploadData = (request, response) => {
  return new Promise((resolve, reject) => {
    if (!existsSync(path.join(__dirname, "menus"))) {
      fs.mkdir(path.join(__dirname, "menus"))
        .then(() => processUpload(request, response))
        .then((menuName) => resolve(menuName))
        .catch((err) => reject(err));
    } else {
      processUpload(request, response)
        .then((menuName) => resolve(menuName))
        .catch((err) => reject(err));
    }
  });
};

module.exports = { uploadData };
