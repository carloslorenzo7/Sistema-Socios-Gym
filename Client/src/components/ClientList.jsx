import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const ClientList = ({ clients, isSearching }) => {
  const [allClients, setAllClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isSearching) {
      setLoading(false)
      return
    }

    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:3001/clientes")
        setAllClients(response.data)
        console.log(response.data)
      } catch (error) {
        setError("Error al obtener los clientes")
        toast.error("Error al obtener los clientes")
      } finally {
        setLoading(false)
      }
    }
    fetchClients()
  }, [isSearching])

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/cliente/eliminarCliente/${id}`)

      if (response.status === 200) {
        console.log(`Cliente con ID ${id} eliminado.`)
        setAllClients(allClients.filter((client) => client.id !== id))
        toast.success("Cliente eliminado con éxito")
      } else {
        throw new Error("No se pudo eliminar el cliente. Inténtalo de nuevo.")
      }
    } catch (error) {
      console.error("Error al eliminar cliente:", error)
      const errorMessage = error.response?.data?.message || "Error al eliminar cliente"
      setError(errorMessage)
      toast.error(errorMessage)
    }
  }

  if (loading) {
    return <p className="text-center text-xl text-gray-600">Cargando...</p>
  }

  if (error) {
    return <p className="text-center text-xl text-red-500">{error}</p>
  }

  const displayClients = isSearching ? clients : allClients

  if (!Array.isArray(displayClients)) {
    return <p className="text-center text-xl text-red-500">Datos de clientes inválidos</p>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ToastContainer />
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Lista de clientes</h2>
      <div className="overflow-x-auto bg-white shadow-md ">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Id
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nombre
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Apellido
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Mail
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Estado
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Editar
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Eliminar
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayClients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link
                    to={`/dashboard/cliente/${client.id}`}
                    className="hover:text-blue-600 transition-colors duration-200"
                  >
                    {client.id}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <Link
                    to={`/dashboard/cliente/${client.id}`}
                    className="hover:text-blue-600 transition-colors duration-200"
                  >
                    {client.nombre}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <Link
                    to={`/dashboard/cliente/${client.id}`}
                    className="hover:text-blue-600 transition-colors duration-200"
                  >
                    {client.apellido}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <Link
                    to={`/dashboard/cliente/${client.id}`}
                    className="hover:text-blue-600 transition-colors duration-200"
                  >
                    {client.email}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* {client.estado.length > 0 ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {client.estado}
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Pago no registrado
                    </span>
                  )} */}

                  {client.estado === 'activo' ? (
                    <span className="px-2 inline-flex text-sm leading-5 font-bold uppercase rounded-full bg-green-100 text-green-800">
                      Activo
                    </span>
                  ) :client.estado ==='vencido' ?(
                    <span>
                      <span className="px-2 inline-flex text-sm leading-5 font-bold uppercase rounded-full bg-red-100 text-red-800">
                      Vencido
                    </span>
                    </span>

                  ):(
                    <span className="px-2 inline-flex text-sm leading-5 font-bold uppercase rounded-full bg-gray-100 text-gray-500">
                      sin membresia
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    to={`/dashboard/cliente/${client.id}`}
                    className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                  >
                    <FaEdit size={20} />
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="text-red-600 hover:text-red-900 transition-colors duration-200"
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
  )
}

export default ClientList

