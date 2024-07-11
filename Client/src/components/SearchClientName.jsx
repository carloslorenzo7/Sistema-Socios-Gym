import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const SearchClientName = ({ nombre }) => {
  const [client, setClient] = useState([]); // donde vamos a obtener datos recibidos de api
  const [error, setError] = useState(null);

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
        setError([]);
      } catch (error) {
        setError("Error al buscar clientes");
        setClient([]); // limpio datos de cleinte en caso de error
      }
    };
    axiosClients();
  }, [nombre]);

  return (
    <div>
      {error && <p>{error}</p>}
      {client.length > 0
        ? client.map((c) => (
            <div key={c.id}>
              <p>{c.nombre}</p>
              <p>{c.mail}</p>
              <p>{c.dni}</p>
            </div>
          ))
        : !error && <p>No se encontraron clientes</p>}
    </div>
  );
};

SearchClientName.propTypes = {
  nombre: PropTypes.string.isRequired,
};

export default SearchClientName;