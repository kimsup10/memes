var multer = require('multer');
var uuid = require('uuid');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + uuid())
    }
});

module.exports = multer({storage: storage});

