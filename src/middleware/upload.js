const multer = require("multer");
const path = require("path");
const { failed } = require("../helpers/response");

const multerUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public");
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `${Date.now()}${ext}`;
      cb(null, filename);
    },
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext === ".jpg" || ext === ".png" || ext === ".mp4") {
      cb(null, true);
    } else {
      const error = {
        message: "file must be jpg or png",
      };
      cb(error, false);
    }
  },
  limits: {
    files: 1, // allow only 1 file per request
    fileSize: 2048 * 2048, // 1 MB (max file size)
  },
});

const upload = (req, res, next) => {
  const multerSingle = multerUpload.single("gambar");
  multerSingle(req, res, (err) => {
    if (err) {
      failed(res, err, "error", "gagal");
    } else {
      next();
    }
  });
};

module.exports = upload;
