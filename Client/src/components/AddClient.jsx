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
      setTimeout(() => {
        navigate("/dashboard/clientes");
      }, 1000);
    } catch (error) {
      toast.error("Error al crear el cliente");
      console.error("Error al crear el cliente:", error.response ? error.response.data : error.message);
    }
  };

  return (
<<<<<<< HEAD
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white">
      <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">Nuevo Cliente</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
=======
    <div className="max-w-md mx-auto mt-10 bg-white p-8 shadow-md rounded-lg">
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-6 text-center">Añadir Cliente</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2 flex items-center">
            <FaUser className="mr-2" /> Nombre
          </label>
>>>>>>> 3e75e4a362efb4288e245e45ad2e4f811c39838b
          <input
            type="text"
            {...register("nombre", {
              required: {
                value: true,
                message: "El campo nombre es obligatorio",
              },
            })}
<<<<<<< HEAD
            className="border border-gray-600 w-full"
=======
            className="w-full p-2 border border-gray-300 rounded-md"
>>>>>>> 3e75e4a362efb4288e245e45ad2e4f811c39838b
          />
          {errors.nombre && <span className="text-red-500 text-sm">{errors.nombre.message}</span>}
        </div>
        <div>
<<<<<<< HEAD
          <label className="block text-sm font-medium text-gray-700">Email</label>
=======
          <label className="block text-gray-700 font-medium mb-2 flex items-center">
            <FaEnvelope className="mr-2" /> Email
          </label>
>>>>>>> 3e75e4a362efb4288e245e45ad2e4f811c39838b
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
<<<<<<< HEAD
        <label className="block text-sm font-medium text-gray-700">Dni</label>
=======
          <label className="block text-gray-700 font-medium mb-2 flex items-center">
            <FaIdCard className="mr-2" /> DNI
          </label>
>>>>>>> 3e75e4a362efb4288e245e45ad2e4f811c39838b
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
