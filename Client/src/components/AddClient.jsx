import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaIdCard, FaPaperPlane } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddClient = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Datos enviados:", data);

    try {
      const response = await axios.post(
        "http://localhost:3001/cliente/nuevoCliente",
        data
      );
      toast.success("Cliente creado con éxito");

      const newClientId = response.data.id; // Asume que el backend devuelve el ID del cliente creado

      setTimeout(() => {
        navigate(`/dashboard/cliente/${newClientId}`); // Redirige al detalle del cliente recién creado
      }, 1000);
    } catch (error) {
      toast.error("Error al crear el cliente");
      console.error("Error al crear el cliente:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 shadow-md rounded-lg">
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-6 text-center">Añadir Cliente</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2 items-center">
            <FaUser className="mr-2" /> Nombre
          </label>
          <input
            type="text"
            {...register("nombre", {
              required: {
                value: true,
                message: "El campo nombre es obligatorio",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.nombre && <span className="text-red-500 text-sm">{errors.nombre.message}</span>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2 items-center">
            <FaUser className="mr-2" /> Apellido
          </label>
          <input
            type="text"
            {...register("apellido", {
              required: {
                value: true,
                message: "El campo apellido es obligatorio",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.apellido && <span className="text-red-500 text-sm">{errors.apellido.message}</span>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2 items-center">
            <FaEnvelope className="mr-2" /> Email
          </label>
          <input
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "El campo email es obligatorio",
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "No tiene formato valido de correo electronico",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2 items-center">
            <FaIdCard className="mr-2" /> DNI
          </label>
          <input
            type="text"
            {...register("dni", {
              required: {
                value: true,
                message: "El campo DNI es obligatorio",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "El DNI debe contener solo números",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.dni && <span className="text-red-500 text-sm">{errors.dni.message}</span>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
        >
          <FaPaperPlane className="mr-2" /> Enviar
        </button>
      </form>
    </div>
  );
};

export default AddClient;
