import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ClientList = ({ clients, isSearching }) => {
  const [allClients, setAllClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isSearching) {
      setLoading(false);
      return;
    }

    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:3001/clientes");
        setAllClients(response.data);
      } catch (error) {
        setError("Error al obtener los clientes");
        toast.error("Error al obtener los clientes");
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, [isSearching]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/eliminarCliente/${id}`);
      setAllClients(allClients.filter((client) => client.id !== id));
      toast.success("Cliente eliminado con éxito");
    } catch (error) {
      setError("Error al eliminar cliente");
      toast.error("Error al eliminar cliente");
    }
  };

  if (loading) {
    return <p className="text-center text-xl">Cargando...</p>;
  }

  if (error) {
    return <p className="text-center text-xl text-red-500">{error}</p>;
  }

  const displayClients = isSearching ? clients : allClients;

  if (!Array.isArray(displayClients)) {
    return <p className="text-center text-xl text-red-500">Datos de clientes inválidos</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-6 text-center">Lista de clientes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Id</th>
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Mail</th>
              <th className="py-3 px-6 text-left">Estado</th>
              <th className="py-3 px-6 text-left">Editar</th>
              <th className="py-3 px-6 text-left">Eliminar</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {displayClients.map((client) => (
              <tr
                key={client.id}
              >
                <td className="py-3 px-6 text-left whitespace-nowrap text-lg font-medium text-gray-800">
                  <Link to={`/dashboard/cliente/${client.id}`} className="text-black hover:underline">
                    {client.id}
                  </Link>
                </td>
                <td className="py-3 px-6 text-left text-lg font-medium text-gray-800">
                  <Link to={`/dashboard/cliente/${client.id}`} className="text-black hover:underline">
                    {client.nombre}
                  </Link>
                </td>
                <td className="py-3 px-6 text-left text-lg font-medium text-gray-800">
                  <Link to={`/dashboard/cliente/${client.id}`} className="text-black hover:underline">
                    {client.email}
                  </Link>
                </td>
                <td className="py-3 px-6 text-left text-lg font-medium text-gray-800">
                  {client.estado.length > 0 ? (
                    client.estado
                  ) : (
                    <span className="text-red-500">Pago no registrado</span>
                  )}
                </td>
                <td className="py-3 px-6 text-left text-lg font-medium text-gray-800">
                  <Link to={`/dashboard/cliente/${client.id}`} className="text-black hover:text-gray-600">
                    <FaEdit size={20} />
                  </Link>
                </td>
                <td className="py-3 px-6 text-left text-lg font-medium text-gray-800">
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="text-red-600 hover:text-red-800 transition duration-300"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientList;
