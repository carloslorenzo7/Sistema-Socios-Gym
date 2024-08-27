require('dotenv').config(); 
const cloudinary = require('cloudinary').v2;
const{CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET}= process.env;

console.log('CLOUDINARY_CLOUD_NAME:', CLOUDINARY_CLOUD_NAME);
console.log('CLOUDINARY_API_KEY:', CLOUDINARY_API_KEY);
console.log('CLOUDINARY_API_SECRET:', CLOUDINARY_API_SECRET);


(async function() {

    
    // Configuracion de credenciales
    cloudinary.config({ 
        cloud_name: CLOUDINARY_CLOUD_NAME, 
        api_key: CLOUDINARY_API_KEY, 
        api_secret: CLOUDINARY_API_SECRET
    });
    
    // Se sube la imagen a cloudinary y se capturan posibles errores
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Desoues de subir la imagen, se puede otimizar y transformar las imagenes segun se necesite
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // transforma la iamgen automaticamente para web
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();

module.exports = cloudinary;