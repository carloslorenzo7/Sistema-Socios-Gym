import { useForm } from "react-hook-form";
import axios from "axios";
import {useNavigate } from "react-router-dom";

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
      console.log("Cliente creado con exito", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al crear el cliente:", error.response ? error.response.data : error.message);
      alert("Error al crear el cliente  ");
    }
  };

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white">
      <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">Nuevo Cliente</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            {...register("nombre", {
              required: {
                value: true,
                message: "El campo nombre es obligatorio",
              },
            })}
            className="border border-gray-600 w-full"
          />
          {errors.nombre && <span>{errors.nombre.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
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
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
        <label className="block text-sm font-medium text-gray-700">Dni</label>
          <input
            type="text"
            {...register("dni", {
              required: {
                value: true,
                message:  "El campo DNI es obligatorio",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "El DNI debe contener solo números",
              },
            })}
          />
        {errors.password && <span>{errors.password.message}</span>}

        </div>
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
};
 export default AddClient;

