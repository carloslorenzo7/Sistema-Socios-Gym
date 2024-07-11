import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Memberships = () => {
  const [membresias, setMembresias] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await axios.get("http://localhost:3001/membresias");

        setMembresias(response.data);
        console.log(setMembresias);
      } catch (error) {
        setError(true);
      }
    };
    fetchMemberships();
  }, []);

  if (error) {
    return <div>Error al cargar membresias</div>;
  }

  if (membresias.length === 0) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <p>Membresias</p>

      <ul>
        {membresias.map((membresia) => (
          <li key={membresia.id}>
            <Link to={`/dashboard/membresias/${membresia.id}`}>
              {membresia.nombre} - {membresia.descripcion} -{" "}
              {membresia.duracion} - {membresia.precio}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Memberships;
