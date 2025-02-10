import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment-timezone";

const ClientDetail = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  console.log(client);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    dni: "",
  });
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [paymentData, setPaymentData] = useState({
    fechaDePago: "",
    idMembresia: "",
    estadoPago: "pagado", // Default value changed to "ppagado"
  });

  const [membresias, setMembresias] = useState([]);

  useEffect(() => {
    const fetchClient = async () => {
      setLoading(true); // Reiniciar el estado de carga cada vez que cambia el ID
      setError(null); // Reiniciar el estado de error cada vez que cambia el ID
      try {
        const response = await axios.get(`http://localhost:3001/cliente/${id}`);
        setClient(response.data);
        setFormData({
          nombre: response.data.nombre,
          apellido: response.data.apellido,
          email: response.data.email,
          dni: response.data.dni,
        });
        setLoading(false);
      } catch (error) {
        setError("Error al obtener datos de cliente");
        setLoading(false);
        toast.error("Error al obtener datos de cliente");
      }
    };

    const fetchMembresias = async () => {
      try {
        const response = await axios.get("http://localhost:3001/membresias");
        setMembresias(response.data);
        console.log(response.data);
      } catch (error) {
        toast.error("Error al obtener membresías");
      }
    };

    fetchClient();
    fetchMembresias();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/cliente/actualizarCliente`, {
        id,
        ...formData,
      });
      setClient({ ...client, ...formData });
      setIsEditing(false);
      toast.success("Cliente actualizado con éxito");
    } catch (error) {
      toast.error("Error al actualizar cliente");
    }
  };

  const handleAddPayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/clientes/pago`, {
        idUsuario: id,
        ...paymentData,
      });
      setClient({ ...client, Pagos: [...client.Pagos, response.data.pago] });
      setIsAddingPayment(false);
      toast.success("Pago añadido con éxito");
    } catch (error) {
      toast.error("Error al añadir pago");
    }
  };

  const handleDeletePayment = async (idPago) => {
    try {
      await axios.delete(
        `http://localhost:3001/cliente/pago/eliminarPago/${idPago}`
      );
      setClient({
        ...client,
        Pagos: client.Pagos.filter((pago) => pago.idPago !== idPago),
      });
      toast.success("Pago eliminado con éxito");
    } catch (error) {
      toast.error("Error al eliminar pago");
    }
  };

  if (loading) {
    return <p className="text-center text-xl">Cargando...</p>;
  }

  if (error) {
    return <p className="text-center text-xl text-red-500">{error}</p>;
  }

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   return date.toISOString().split('T')[0];
  // };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 shadow-md rounded-lg">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Detalle de Cliente
      </h2>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre:
            </label>
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
            <label className="block text-sm font-medium text-gray-700">
              Apellido:
            </label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
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
            <label className="block text-sm font-medium text-gray-700">
              DNI:
            </label>
            <input
              type="text"
              name="dni"
              value={formData.dni}
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
            <li>
              <strong>Nombre:</strong> {client.nombre}
            </li>
            <li>
              <strong>Apellido:</strong> {client.apellido}
            </li>
            <li>
              <strong>Email:</strong> {client.email}
            </li>
            <li>
              <strong>DNI:</strong> {client.dni}
            </li>
            <li>
              <strong>Estado:</strong> {client.estado}
            </li>
            <li>
              <strong>Registro:</strong>{" "}
              {moment(client.createdAt)
                .tz("America/Argentina/Buenos_Aires")
                .format("DD/MM/YYYY HH:mm:ss")}
            </li>
            <li>
              <strong>Actualizacion:</strong>{" "}
              {moment(client.updatedAt)
                .tz("America/Argentina/Buenos_Aires")
                .format("DD/MM/YYYY HH:mm:ss")}
            </li>
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
          client.Pagos.map(
            (pago) =>
              pago && (
                <li
                  key={pago.idPago}
                  className="border p-4 rounded-lg shadow-sm flex justify-between items-center"
                >
                  <div>
                    <p>
                      <strong>Monto:</strong> {pago.monto}
                    </p>
                    <p>
                      <strong>Fecha de pago:</strong>{" "}
                      {new Date(pago.fechaDePago).toLocaleDateString()}
                    </p>
                    <strong>Cuota:</strong>{" "}
                    {membresias.find(
                      (membresia) => membresia.id === pago.idMembresia
                    )?.nombre || "Membresía no encontrada"}
                    <p>
                      <strong>Estado de pago:</strong> {pago.estadoPago}
                    </p>
                    <p>
                      <strong>Fecha de vencimiento:</strong>{" "}
                      {new Date(pago.fechaDeVencimiento).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeletePayment(pago.idPago)}
                    className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md shadow-sm"
                  >
                    Eliminar
                  </button>
                </li>
              )
          )
        ) : (
          <p className="text-center text-gray-500">No hay pagos disponibles.</p>
        )}
      </ul>
      <button
        onClick={() => setIsAddingPayment(true)}
        className="mt-6 px-4 py-2 bg-green-500 text-white rounded-md shadow-sm"
      >
        Añadir Pago
      </button>
      {isAddingPayment && (
        <form onSubmit={handleAddPayment} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha de Pago:
            </label>
            <input
              type="date"
              name="fechaDePago"
              value={paymentData.fechaDePago}
              onChange={handlePaymentChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo de Membresía:
            </label>
            <select
              name="idMembresia"
              value={paymentData.idMembresia}
              onChange={handlePaymentChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Seleccionar Membresía</option>
              {membresias.map((membresia) => (
                <option key={membresia.id} value={membresia.id}>
                  {membresia.nombre}
                </option>
              ))}
            </select>
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Estado de Pago:
            </label>
            <select
              name="estadoPago"
              value={paymentData.estadoPago}
              onChange={handlePaymentChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="pendiente">Pendiente</option>
              <option value="pagado">Pagado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div> */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsAddingPayment(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md shadow-sm"
            >
              Añadir Pago
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ClientDetail;
