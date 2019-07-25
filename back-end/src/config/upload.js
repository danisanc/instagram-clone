const Multer = require('multer')
const path = require('path')

module.exports = {
    storage: new Multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'static', 'uploads'),
        filename: function (req, file, callback) {
            callback(null, file.originalname)
        }
    })
}