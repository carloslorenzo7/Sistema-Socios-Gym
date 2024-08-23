const postClient = require("../../controllers/usuarios/postClient.js");

const postClientHndls = async (req, res) => {
  try {
    const { nombre, apellido,email,dni} = req.body;
    const newClient = await postClient(nombre,apellido, email,dni,req.file);
    return res.status(200).json(newClient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports= postClientHndls;