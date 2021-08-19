const multer = require("multer");

const ALLOWED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];

const storage = multer.memoryStorage();
exports.upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    //cb is callback
    //can check here for size, extension of image etc...
    if (ALLOWED_FORMATS.includes(file.mimetype)) {
      //check to see correct file extention
      cb(null, true);
    } else {
      cb(new Error("Not supported file type!"), false);
    }
  },
});
