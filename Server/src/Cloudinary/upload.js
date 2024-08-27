const multer = require('multer');
const path = require('path');
//multer sse usa para manejar la subida de archvios desde el frontend antes de que se suban a cloudinary
// Configura el almacenamiento de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads')); // Carpeta donde se guardan temporalmente los archivos
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`); // genera un nombre unico para cada archivo usando una marca de tiempo (Date.now()) y la xtension original del archivo
    },
});

const upload = multer({ storage });

module.exports = upload;