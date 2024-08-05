import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

const SearchClientName = ({ nombre }) => {
  const [client, setClient] = useState([]); // donde vamos a obtener datos recibidos de api
  const [error, setError] = useState(null);
  const location=useLocation;
  useEffect(() => {
    if (!nombre) return;

    const axiosClients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/cliente/nombre",
          {
            params: { nombre }, // Esto genera una URL como: http://localhost:3001/cliente/nombre?nombre=valor
          }
        );

        setClient(response.data);
        console.log(setClient);
        
        setError([]);
      } catch (error) {
        setError("Error al buscar clientes");
        setClient([]); // limpio datos de cleinte en caso de error
      }
    };
    axiosClients();
  }, [nombre]);

  useEffect(() => {
    return () => {
      setClient([]);
      setError(null);
    };
  }, [location])
  return (
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
    </div>
  );
};

SearchClientName.propTypes = {
  nombre: PropTypes.string.isRequired,
};

export default SearchClientName;
