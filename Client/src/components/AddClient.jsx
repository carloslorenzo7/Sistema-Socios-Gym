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
    <div>
      <h1>Esto es el form de cliente</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            {...register("nombre", {
              required: {
                value: true,
                message: "El campo nombre es obligatorio",
              },
            })}
          />
          {errors.nombre && <span>{errors.nombre.message}</span>}
        </div>
        <div>
          <label>Email</label>
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
        <label>Dni</label>
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

