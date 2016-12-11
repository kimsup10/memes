var multer = require('multer');
var uuid = require('uuid');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname+'/../public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, uuid())
    }
});

module.exports = multer({storage: storage});

