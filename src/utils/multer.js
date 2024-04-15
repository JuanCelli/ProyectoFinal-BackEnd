import multer from "multer";
import rootDir from "./dirname.js";


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let uploadDir = `public/uploads/`

        if (file.fieldname === "imgProfile") {
            uploadDir += 'imgProfile/';
        } else if (file.fieldname === 'imgProduct') {
            uploadDir += 'imgProduct/';
        } else {
            uploadDir += 'other/';
        }
        cb(null, uploadDir);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage })

export default upload
