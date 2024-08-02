const putClient = require("../../controllers/usuarios/putClient");

const putClientHndls = async (req, res) => {
  try {
    const result = await putClient(req);

    if (result.error) {
      return res.status(404).json({ message: result.error });
    }

    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = putClientHndls;
