const { Usuarios } = require("../../db");
//const cloudinary = require("cloudinary").v2;
const cloudinary= require ("../../Cloudinary/cloudinary");
const postClient = async (nombre, apellido, email, dni, file) => {
  try {
    let imageUrl = null;
    // si hay un archivo lo subo a cloudinary
    if (!file) {
      throw new Error("La imagen es requerida"); // Error si no se proporciona imagen
    }
    
    const result = await cloudinary.uploader.upload(file.path);
    imageUrl = result.secure_url; // Url de la imagen subida

    const createClient = await Usuarios.create({
      nombre,
      apellido,
      email,
      dni,
      imagen: imageUrl, // guardo la imagen en la base de datos
    });
    console.log("Cliente creado", createClient);
    
    return createClient;
  } catch (error) {
    console.error("Error en postClient:", error);
    throw error;
  }
};

module.exports = postClient;
