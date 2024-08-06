import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

const SearchClientName = ({ onSearch, clearSearch }) => {
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState(null);
  const location=useLocation;
  useEffect(() => {
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
<<<<<<< HEAD
        onSearch(response.data);
        setError(null);
=======

        setClient(response.data);
        console.log(setClient);
        
        setError([]);
>>>>>>> 6e0a58cfae50b05455996e91741c0a7f5817cc1f
      } catch (error) {
        setError("Error al buscar clientes");
        onSearch([]); // limpio datos de cliente en caso de error
      }
    };
    axiosClients();
  }, [nombre, onSearch, clearSearch]);

  const handleInputChange = (e) => {
    setNombre(e.target.value);
  };

  useEffect(() => {
    return () => {
      setClient([]);
      setError(null);
    };
  }, [location])
  return (
<<<<<<< HEAD
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
      <input
        type="text"
        value={nombre}
        onChange={handleInputChange}
        placeholder="Buscar por nombre"
        className="w-full p-2 border rounded"
      />
      {error && <p className="text-red-500 text-center">{error}</p>}
=======
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 shadow-md rounded-lg">
      {error && <p>{error}</p>}
      <ul className="mt-4">

      {client.length > 0
        ? client.map((c) => (
            <li key={c.id}  className="pb-4 ">
              <Link to={`/dashboard/cliente/${c.id}`} className="block space-y-2 border-b-2">
              <p><strong>Nombre:</strong>{c.nombre}</p>
              <p><strong>Apellido:</strong>{c.apellido}</p>
              <p><strong>Email:</strong>{c.email}</p>
              <p><strong>Dni:</strong>{c.dni}</p>
              </Link>
            </li>
          ))
        : !error && <p>No se encontraron clientes</p>}

      </ul>
>>>>>>> 6e0a58cfae50b05455996e91741c0a7f5817cc1f
    </div>
  );
};

SearchClientName.propTypes = {
  onSearch: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
};

export default SearchClientName;
