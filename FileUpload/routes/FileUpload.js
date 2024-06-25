const express = require("express");
const router = express.Router();

// import handler functions from controllers
const {imageUpload, videoUpload, imageReducerUpload, localFileUpload} = require("../controllers/fileupload");

// defines api routes
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageReducerUpload", imageReducerUpload);
router.post("/localFileUpload", localFileUpload);

module.exports = router;

