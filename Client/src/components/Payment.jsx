import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaMoneyBillWave, FaPercentage, FaCreditCard, FaInfoCircle, FaPaperPlane } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
      toast.success("Pago registrado con éxito");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Error al registrar el pago");
      console.error(
        "Error al crear el cliente:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 shadow-md rounded-lg">
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-6 text-center">Formulario de Pagos</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2 flex items-center">
            <FaCalendarAlt className="mr-2" /> Fecha de pago
          </label>
          <input
            type="date"
            {...register("fechaDePago", {
              required: {
                value: true,
                message: "La fecha de pago es obligatoria",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.fechaDePago && <span className="text-red-500 text-sm">{errors.fechaDePago.message}</span>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2 flex items-center">
            <FaMoneyBillWave className="mr-2" /> Monto
          </label>
          <input
            type="number"
            {...register("monto", {
              required: {
                value: true,
                message: "El monto es obligatorio",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.monto && <span className="text-red-500 text-sm">{errors.monto.message}</span>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2 flex items-center">
            <FaPercentage className="mr-2" /> Cuota
          </label>
          <input
            type="text"
            {...register("cuota", {
              required: {
                value: true,
                message: "La cuota es obligatoria",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.cuota && <span className="text-red-500 text-sm">{errors.cuota.message}</span>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2 flex items-center">
            <FaCreditCard className="mr-2" /> Método de pago
          </label>
          <input
            type="text"
            {...register("metodoPago", {
              required: {
                value: true,
                message: "El método de pago es obligatorio",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.metodoPago && <span className="text-red-500 text-sm">{errors.metodoPago.message}</span>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2 flex items-center">
            <FaInfoCircle className="mr-2" /> Estado de Pago
          </label>
          <input
            type="text"
            {...register("estadoPago", {
              required: {
                value: true,
                message: "El estado de pago es obligatorio",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.estadoPago && <span className="text-red-500 text-sm">{errors.estadoPago.message}</span>}
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

export default Payment;
