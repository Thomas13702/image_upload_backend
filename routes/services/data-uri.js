//transform buffer to base64
const path = require("path"); //native to node
const DatauriParser = require("datauri/parser");
const parser = new DatauriParser();

exports.formatBufferTo64 = (file) =>
  parser.format(path.extname(file.originalname).toString(), file.buffer);
//path.extname gets file extension
