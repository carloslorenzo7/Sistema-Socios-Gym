const { Usuarios } = require("../../db");
const cloudinary = require("cloudinary").v2;

const postClient = async (nombre, apellido, email, dni, file) => {
  try {
    let imageUrl = null;
    // si hay un archivo lo subo a cloudinary
    if (file) {
      const result = await cloudinary.uploader.upload(file.path);
      imageUrl = result.secure_url; // Url de la imagen subida
    }

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
