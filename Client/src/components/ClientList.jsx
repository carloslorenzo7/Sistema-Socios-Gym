import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdModeEditOutline } from "react-icons/md";

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
                  <MdModeEditOutline className="text-2xl"/>
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
