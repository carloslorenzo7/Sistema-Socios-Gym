import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClientList = ({ filteredClients, handleDelete, loading, error }) => {
  if (loading) {
    return <p className="text-center text-xl text-gray-600">Cargando...</p>;
  }

  if (error) {
    return <p className="text-center text-xl text-red-500">{error}</p>;
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
                <span className={`px-2 inline-flex text-sm leading-5 font-bold uppercase rounded-full ${
                  client.estado === "activo" ? "bg-green-100 text-green-800" :
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
  filteredClients: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
  error: PropTypes.func.isRequired,
};

export default ClientList;


// import { useState, useEffect } from "react"
// import axios from "axios"
// import { Link } from "react-router-dom"
// import { FaEdit, FaTrashAlt } from "react-icons/fa"
// import { toast, ToastContainer } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"

// const ClientList = () => {
//   const [allClients, setAllClients] = useState([]) // Lista completa de clientes
//   const [filteredClients, setFilteredClients] = useState([]) // Lista filtrada
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [filterState, setFilterState] = useState("todos") // Estado para el filtro

//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/clientes")
//         setAllClients(response.data)
//         setFilteredClients(response.data) // Mostrar todos los clientes al inicio
//       } catch (error) {
//         setError("Error al obtener los clientes")
//         toast.error("Error al obtener los clientes")
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchClients()
//   }, [])

//   // Función para manejar búsqueda y filtrado en tiempo real
//   useEffect(() => {
//     let filtered = allClients

//     // Aplicar búsqueda
//     if (searchTerm) {
//       filtered = filtered.filter((client) =>
//         `${client.nombre} ${client.apellido}`.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     }

//     // Aplicar filtro por estado
//     if (filterState !== "todos") {
//       filtered = filtered.filter((client) => client.estado === filterState)
//     }

//     setFilteredClients(filtered)
//   }, [searchTerm, filterState, allClients])

//   const handleDelete = async (id) => {
//     try {
//       const response = await axios.delete(`http://localhost:3001/cliente/eliminarCliente/${id}`)

//       if (response.status === 200) {
//         setAllClients(allClients.filter((client) => client.id !== id))
//         toast.success("Cliente eliminado con éxito")
//       } else {
//         throw new Error("No se pudo eliminar el cliente. Inténtalo de nuevo.")
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || "Error al eliminar cliente"
//       setError(errorMessage)
//       toast.error(errorMessage)
//     }
//   }

//   if (loading) {
//     return <p className="text-center text-xl text-gray-600">Cargando...</p>
//   }

//   if (error) {
//     return <p className="text-center text-xl text-red-500">{error}</p>
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <ToastContainer />
//       <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Lista de clientes</h2>

//       {/* Barra de búsqueda y filtros */}
//       <div className="flex flex-col sm:flex-row justify-between mb-4">
//         {/* Input de búsqueda */}
//         <input
//           type="text"
//           placeholder="Buscar cliente..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         {/* Filtro por estado */}
//         <select
//           value={filterState}
//           onChange={(e) => setFilterState(e.target.value)}
//           className="w-full sm:w-1/4 mt-2 sm:mt-0 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="todos">Todos</option>
//           <option value="activo">Activos</option>
//           <option value="vencido">Vencidos</option>
//           <option value="sin membresia">Sin membresía</option>
//         </select>
//       </div>

//       <div className="overflow-x-auto bg-white shadow-md ">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mail</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Editar</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eliminar</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredClients.map((client) => (
//               <tr key={client.id} className="hover:bg-gray-50 transition-colors duration-200">
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   <Link to={`/dashboard/cliente/${client.id}`} className="hover:text-blue-600">
//                     {client.id}
//                   </Link>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.nombre}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.apellido}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.email}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-2 inline-flex text-sm leading-5 font-bold uppercase rounded-full ${
//                     client.estado === "activo" ? "bg-green-100 text-green-800" :
//                     client.estado === "vencido" ? "bg-red-100 text-red-800" :
//                     "bg-gray-100 text-gray-500"
//                   }`}>
//                     {client.estado}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <Link to={`/dashboard/cliente/${client.id}`} className="text-indigo-600 hover:text-indigo-900">
//                     <FaEdit size={20} />
//                   </Link>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <button onClick={() => handleDelete(client.id)} className="text-red-600 hover:text-red-900">
//                     <FaTrashAlt size={20} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default ClientList
