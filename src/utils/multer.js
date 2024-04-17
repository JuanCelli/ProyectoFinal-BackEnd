import multer from "multer";


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let uploadDir = `public/uploads/`

        if (file.fieldname === "imgProfile") {
            uploadDir += 'imgProfile/';
        } else if (file.fieldname === 'imgProduct') {
            uploadDir += 'imgProduct/';
        } else {
            uploadDir += 'others/';
        }
        cb(null, uploadDir);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage })

export default upload
