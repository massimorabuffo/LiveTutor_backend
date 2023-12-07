import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, callBack) {
        callBack(null, './uploads');
    },
    filename: function (req, file, cb) {
        
       cb(null, file.originalname);
    }
});

export const  upload = multer({ storage });
