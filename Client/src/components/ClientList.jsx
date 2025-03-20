import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClientList = ({ filteredClients = [], handleDelete, loading, error }) => {
  if (loading) {
    return <p className="text-center text-xl text-gray-600">Cargando...</p>;
  }

  if (error) {
    return <p className="text-center text-xl text-red-500">{error}</p>;
  }

  if (!Array.isArray(filteredClients) || filteredClients.length === 0) {
    return <p className="text-center text-xl text-gray-600">No hay clientes disponibles.</p>;
  }

  return (
    <div className="overflow-x-auto bg-white shadow-md ">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mail</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Editar</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eliminar</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredClients.map((client) => (
            <tr key={client.id} className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <Link to={`/dashboard/cliente/${client.id}`} className="hover:text-blue-600">
                  {client.id}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.apellido}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-sm leading-5 font-bold uppercase rounded-full ${client.estado === "activo" ? "bg-green-100 text-green-800" :
                    client.estado === "vencido" ? "bg-red-100 text-red-800" :
                      "bg-gray-100 text-gray-500"
                  }`}>
                  {client.estado}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link to={`/dashboard/cliente/${client.id}`} className="text-indigo-600 hover:text-indigo-900">
                  <FaEdit size={20} />
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onClick={() => handleDelete(client.id)} className="text-red-600 hover:text-red-900">
                  <FaTrashAlt size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ClientList.propTypes = {
  filteredClients: PropTypes.array,
  handleDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

ClientList.defaultProps = {
  filteredClients: [],
};

export default ClientList;
