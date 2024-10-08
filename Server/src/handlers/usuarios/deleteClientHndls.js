const deleteClient = require("../../controllers/usuarios/deleteClient");

const deleteClientHdnls = async (req, res) => {
  try {
    const user = await deleteClient(req);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteClientHdnls;
