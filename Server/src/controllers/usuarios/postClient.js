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

    return createClient;
  } catch (error) {
    throw error;
  }
};

module.exports = postClient;
