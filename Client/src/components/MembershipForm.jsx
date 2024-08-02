import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { FaUser, FaInfoCircle, FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const MembershipForm = ({ membership, onSave, onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (membership) {
      setValue("nombre", membership.nombre);
      setValue("descripcion", membership.descripcion);
      setValue("duracion", membership.duracion);
      setValue("precio", membership.precio);
    }
  }, [membership, setValue]);

  const onSubmit = async (data) => {
    if (membership) {
      try {
        const response = await axios.put(
          `http://localhost:3001/modificarMembresia/${membership.id}`,
          data
        );
        toast.success("Membresía actualizada correctamente");
        onSave();
      } catch (error) {
        toast.error("Error al modificar membresía");
        console.error(
          "Error al modificar membresía",
          error.response ? error.response.data : error.message
        );
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3001/nuevaMembresia",
          data
        );
        toast.success("Membresía agregada con éxito");
        onSave();
      } catch (error) {
        toast.error("Error al crear membresía");
        console.error(
          "Error al crear membresía:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-6 text-center">Formulario de Membresía</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2 flex items-center">
            <FaUser className="mr-2" /> Nombre
          </label>
          <input
            type="text"
            {...register("nombre", {
              required: {
                value: true,
                message: "El nombre es obligatorio",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.nombre && <span className="text-red-500 text-sm">{errors.nombre.message}</span>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2 flex items-center">
            <FaInfoCircle className="mr-2" /> Descripción
          </label>
          <input
            type="text"
            {...register("descripcion", {
              required: {
                value: true,
                message: "La descripción es obligatoria",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.descripcion && <span className="text-red-500 text-sm">{errors.descripcion.message}</span>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2 flex items-center">
            <FaCalendarAlt className="mr-2" /> Duración (meses)
          </label>
          <input
            type="number"
            {...register("duracion", {
              required: {
                value: true,
                message: "La duración es obligatoria",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.duracion && <span className="text-red-500 text-sm">{errors.duracion.message}</span>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2 flex items-center">
            <FaDollarSign className="mr-2" /> Precio
          </label>
          <input
            type="number"
            {...register("precio", {
              required: {
                value: true,
                message: "El precio es obligatorio",
              },
              min: {
                value: 1,
                message: "El precio debe ser al menos 1",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.precio && <span className="text-red-500 text-sm">{errors.precio.message}</span>}
        </div>
        <div className="flex justify-center space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 flex items-center"
          >
            Cerrar
          </button>
        </div>
      </form>
    </div>
  );
};

MembershipForm.propTypes = {
  membership: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
    descripcion: PropTypes.string,
    duracion: PropTypes.string,
    precio: PropTypes.number,
  }),
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MembershipForm;
