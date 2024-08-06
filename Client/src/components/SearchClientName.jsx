import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SearchClientName = ({ onSearch, clearSearch }) => {
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Verifica si nombre es una cadena vacía y si clearSearch ya ha sido llamado
    if (nombre === "") {
      clearSearch();
      return;
    }

    const axiosClients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/cliente/nombre",
          {
            params: { nombre },
          }
        );
        onSearch(response.data);
        setError(null);
      } catch (error) {
        setError("Error al buscar clientes");
        onSearch([]); // Limpio datos de cliente en caso de error
      }
    };

    axiosClients();
  }, [nombre]);

  const handleInputChange = (e) => {
    setNombre(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
      <input
        type="text"
        value={nombre}
        onChange={handleInputChange}
        placeholder="Buscar por nombre"
        className="w-full p-2 border rounded"
      />
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
};

SearchClientName.propTypes = {
  onSearch: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
};

export default SearchClientName;
