import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:3001/clientes");
        setClients(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error al obtener los clientes");
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  //para formatear fecha
  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   return date.toISOString().split('T')[0];
  // };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Lista de clientes</h2>
      <table>
        <thead>
          <tr className="bg-gray-500 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Id</th>
            <th className="py-3 px-6 text-left">Nombre</th>
            <th className="py-3 px-6 text-left">Mail</th>
            <th className="py-3 px-6 text-left">Estado</th>
            <th className="py-3 px-6 text-left">Editar</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="py-3 px-6 text-left">
                <Link to={`/dashboard/cliente/${client.id}`}>{client.id}</Link>
              </td>
              <td className="py-3 px-6 text-left">
                <Link to={`/dashboard/cliente/${client.id}`}>
                  {client.nombre}
                </Link>
              </td>
              <td className="py-3 px-6 text-left">
                <Link to={`/dashboard/cliente/${client.id}`}>
                  {client.email}
                </Link>
              </td>
              <td className="py-3 px-6 text-left">
                {client.estado.length > 0 ? (
                  client.estado
                ) : (
                  <span>Pago no registrado</span>
                )}
              </td>
              <td className="py-3 px-10 text-left">
                <div>
                  {/* boton editar */}
                  <Link to={`/dashboard/cliente/${client.id}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                    </svg>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;
