import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CLientDetail = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(id);
    const fetchClient = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/cliente/${id}`);

        setClient(response.data);
        setLoading(false);
        console.log(setClient);
      } catch (error) {
        setError("Error al obetener datos de cliente");
        setLoading(false);
      }
    };
    fetchClient()
  },[id]);

  //para formatear fecha 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  if(loading){
    return <p>Cargando...</p>
  }

  if(error){
    return <p>{error}</p>
  }

  return (
  <div>

    <ul>
    <h2>Detalle de cliente</h2>

      <p>Nombre: {client.nombre}</p>
       <p>Email:{client.email} </p>
       <p>Dni:{client.dni}</p>

       {client.Pagos.map(pago=>(
        <li key={pago.id}>

          <p>Monto:{pago.monto}</p>
          <p>Fecha de pago: {formatDate(pago.fechaDePago)}</p>
          <p>Cuota:{pago.cuota}</p>
          <p>Metodo de pago: {pago.metodoPago}</p>
          <p>Estado de pago: {pago.estadoPago}</p>
          <p>Fecha de vencimiento:{formatDate(pago.fechaDeVencimiento)}</p>

        </li>
       ))}



    </ul>

  </div>
);
};


export default CLientDetail;