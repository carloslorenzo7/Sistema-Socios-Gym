
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import ClientList from "./ClientList";
import FilterStatusClient from "./FilterStatusClient";
import SearchClientName from "./SearchClientName";
const apiUrl = import.meta.env.VITE_BACK_URL;

const ClientManagement = () =>{
    const [allClients, setAllClients] = useState([]) // Lista completa de clientes
    const [filteredClients, setFilteredClients] = useState([]) // Lista filtrada
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterState, setFilterState] = useState("todos") // Estado para el filtro

    useEffect(() => {
        const fetchClients = async () => {
          try {
            const response = await axios.get(`${apiUrl}/clientes`)
            setAllClients(response.data)
            setFilteredClients(response.data) // Mostrar todos los clientes al inicio
          } catch (error) {
            setError("Error al obtener los clientes")
            toast.error("Error al obtener los clientes")
          } finally {
            setLoading(false)
          }
        }
        fetchClients()
      }, [])
    
      // Función para manejar búsqueda y filtrado en tiempo real
      useEffect(() => {
        let filtered = allClients
    
        // Aplicar búsqueda
        if (searchTerm) {
          filtered = filtered.filter((client) =>
            `${client.nombre} ${client.apellido}`.toLowerCase().includes(searchTerm.toLowerCase())
          )
        }
    
        // Aplicar filtro por estado
        if (filterState !== "todos") {
          filtered = filtered.filter((client) => client.estado === filterState)
        }
    
        setFilteredClients(filtered)
      }, [searchTerm, filterState, allClients])
    
      const handleDelete = async (id) => {
        try {
          const response = await axios.delete(`${apiUrl}/cliente/eliminarCliente/${id}`)
    
          if (response.status === 200) {
            setAllClients(allClients.filter((client) => client.id !== id))
            toast.success("Cliente eliminado con éxito")
          } else {
            throw new Error("No se pudo eliminar el cliente. Inténtalo de nuevo.")
          }
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Error al eliminar cliente"
          setError(errorMessage)
          toast.error(errorMessage)
        }
      }
    



    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ToastContainer />
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Lista de clientes</h2>

      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <SearchClientName searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterStatusClient filterState={filterState} setFilterState={setFilterState} />
      </div>

      <ClientList filteredClients={filteredClients} handleDelete={handleDelete} loading={loading} error={error} />
    </div>
        </div>
    )
};

export default ClientManagement;

// import { useState } from "react";
// import SearchClientName from "./SearchClientName";
// import ClientList from "./ClientList";


// const ClientManagement = () => {
//     const [searchedClients, setSearchedClients] = useState([]);
//     const [isSearching, setIsSearching] = useState(false);

//     const handleSearch = (clients) => {
//         setSearchedClients(clients);
//         setIsSearching(true);
//     };

//     const clearSearch = () => {
//         if (isSearching) {
//             setSearchedClients([]);
//             setIsSearching(false);
//         }
//     };

//     return (
//         <div>
//             <SearchClientName onSearch={handleSearch} clearSearch={clearSearch} />
//             <ClientList clients={searchedClients} isSearching={isSearching} />
//         </div>
//     );
// };

// export default ClientManagement;
