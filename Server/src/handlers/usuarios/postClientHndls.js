const postClient = require("../../controllers/usuarios/postClient.js");

const postClientHndls = async (req, res) => {
  try {
    const { nombre, email,dni} = req.body;
    const newClient = await postClient(nombre, email,dni);
    return res.status(200).json(newClient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports= postClientHndls;