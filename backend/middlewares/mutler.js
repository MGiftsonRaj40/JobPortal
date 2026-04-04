import multer from "multer";

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
    return;
  }

  cb(new Error("Only PDF, DOC, and DOCX files are allowed"));
};

export const singleUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
}).single("file");
