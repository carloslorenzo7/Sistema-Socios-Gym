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


  if(loading){
    return <p>Cargando...</p>
  }

  if(error){
    return <p>{error}</p>
  }

  return (
    <div>
    <h2>Lista de clientes</h2>
    <ul>
      {clients.map((client) => (
        <li key={client.id}>
          <Link to={`/dashboard/cliente/${client.id}`}>
         
          {client.nombre} - {client.email}
         </Link>
        </li>
      ))}
    </ul>
  </div>
  ) 
};

export default ClientList;
