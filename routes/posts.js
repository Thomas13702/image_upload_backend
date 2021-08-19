require("dotenv");
const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//start of image upload

const { formatBufferTo64 } = require("./services/data-uri");
const { upload } = require("./services/multer");
const { cloudinaryUpload } = require("./services/cloudinary");

const singleUpload = upload.single("image");

//custom middleware

const singleUploadCtrl = (req, res, next) => {
  singleUpload(req, res, (error) => {
    if (error) {
      return res.status(422).send({ message: "Image upload failed" });
    }
    next();
  });
};

router.post("/image-upload", singleUploadCtrl, async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("Image is not presented ");
    }

    const file64 = formatBufferTo64(req.file);
    const uploadResult = await cloudinaryUpload(file64.content);
    console.log(uploadResult);

    const newPost = new Post({
      url: uploadResult.url,
    });

    const post = await newPost.save();

    return res.json(post);
  } catch (e) {
    return res.status(422).send({ message: e.message });
  }
});

module.exports = router;
