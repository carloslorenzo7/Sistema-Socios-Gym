import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ClientDetail = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    dni: "",
    estado: ""
  });

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/cliente/${id}`);
        setClient(response.data);
        setFormData({
          nombre: response.data.nombre,
          email: response.data.email,
          dni: response.data.dni,
          estado: response.data.estado
        });
        setLoading(false);
      } catch (error) {
        setError("Error al obtener datos de cliente");
        setLoading(false);
        toast.error("Error al obtener datos de cliente");
      }
    };
    fetchClient();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/cliente/actualizarCliente`, {
        id,
        ...formData
      });
      setClient({ ...client, ...formData });
      setIsEditing(false);
      toast.success("Cliente actualizado con éxito");
    } catch (error) {
      toast.error("Error al actualizar cliente");
    }
  };

  if (loading) {
    return <p className="text-center text-xl">Cargando...</p>;
  }

  if (error) {
    return <p className="text-center text-xl text-red-500">{error}</p>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 shadow-md rounded-lg">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-6 text-center">Detalle de Cliente</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">DNI:</label>
            <input
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Estado:</label>
            <input
              type="text"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm"
            >
              Guardar
            </button>
          </div>
        </form>
      ) : (
        <>
          <ul className="space-y-4">
            <li><strong>Nombre:</strong> {client.nombre}</li>
            <li><strong>Email:</strong> {client.email}</li>
            <li><strong>DNI:</strong> {client.dni}</li>
            <li><strong>Estado:</strong> {client.estado}</li>
          </ul>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm"
          >
            Editar
          </button>
        </>
      )}
      <h3 className="text-xl font-semibold mt-6">Pagos</h3>
      <ul className="mt-4 space-y-4">
        {client.Pagos && client.Pagos.length > 0 ? (
          client.Pagos.map(pago => (
            <li key={pago.idPago} className="border p-4 rounded-lg shadow-sm">
              <p><strong>Monto:</strong> {pago.monto}</p>
              <p><strong>Fecha de pago:</strong> {formatDate(pago.fechaDePago)}</p>
              <p><strong>Cuota:</strong> {pago.cuota}</p>
              <p><strong>Método de pago:</strong> {pago.metodoPago}</p>
              <p><strong>Estado de pago:</strong> {pago.estadoPago}</p>
              <p><strong>Fecha de vencimiento:</strong> {formatDate(pago.fechaDeVencimiento)}</p>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No hay pagos disponibles.</p>
        )}
      </ul>
    </div>
  );
};

export default ClientDetail;
