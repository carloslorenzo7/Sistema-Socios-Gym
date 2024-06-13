import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await axios.post(
        "http://localhost:3001/clientes/pago",
        data
      );

      console.log("Cliente creado con exito", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Error al crear el cliente:",
        error.response ? error.response.data : error.message
      );
      alert("Error al crear el cliente  ");
    }
  };

  return (
    <div>
        <h1>Esto es el form de pagos</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Fecha de pago</label>
          <input
            type="date"
            {...register("fechaDePago", {
              required: {
                value: true,
                message: "La fecha de pago es obligatoria",
              },
            })}
          />
          {errors.fechaDePago && <span>{errors.fechaDePago.message}</span>}
        </div>
        <div>
          <label>Monto</label>
          <input
            type="number"
            {...register("monto", {
              required: {
                value: true,
                message: "El monto es obligatorio",
              },
            })}
          />
          {errors.monto && <span>{errors.monto.message}</span>}
        </div>
        <div>
          <label>Cuota</label>
          <input
            type="text"
            {...register("cuota", {
              required: {
                value: true,
                message: "La cuota es obligatoria",
              },
            })}
          />
          {errors.cuota && <span>{errors.cuota.message}</span>}
        </div>
        <div>
          <label>Metodo de pago</label>
          <input
            type="text"
            {...register("metodoPago", {
              required: {
                value: true,
                message: "El método de pago es obligatorio",
              },
            })}
          />
          {errors.metodoPago && <span>{errors.metodoPago.message}</span>}
        </div>
        <div>
          <label>Estado de Pago</label>
          <input
            type="text"
            {...register("estadoPago", {
              required: {
                value: true,
                message: "El estado de pago es obligatorio",
              },
            })}
          />
           {errors.estadoPago && <span>{errors.estadoPago.message}</span>}
        </div>
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
};

export default Payment;
