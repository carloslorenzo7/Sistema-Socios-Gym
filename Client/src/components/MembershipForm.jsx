import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";
import PropTypes from "prop-types";

const MembershipForm = ({ membership, onSave, onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // use effect para que cuando haga click en una membresia tenga un cargado de los datos de esa membresia
  useEffect(() => {
    if (membership) {
      setValue("nombre", membership.nombre);
      setValue("descripcion", membership.descripcion);
      setValue("duracion", membership.duracion);
      setValue("precio", membership.precio);
    }
  }, [membership, setValue]);

  const onSubmit = async (data) => {
    console.log(data);

    if (membership) {
      try {
        const response = await axios.put(
          `http://localhost:3001/modificarMembresia/${membership.id}`,
          data
        );
        console.log("Membresia actulizada correctamente", response.data);
        onSave();
      } catch (error) {
        console.error(
          "Error al modificar membresia",
          error.response ? error.response.data : error.messsage
        );
        alert("Error al modificar membresia");
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3001/nuevaMembresia",
          data
        );
        console.log("Membresia agregada con exito", response.data);
        onSave();
      } catch (error) {
        console.error(
          "Error al crear membresia:",
          error.response ? error.response.data : error.message
        );
        alert("Error al crear membresia");
      }
    }
  };

  return (
    <div className="p-4 flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 " >
        <div>
          <label className="block text-gray-700 mb-1">Couta</label>
          <input
            type="text"
            {...register("nombre", {
              required: {
                value: true,
                message: "El nombre es obligatorio",
              },
            })}
              className="border border-gray-800 py-2 px-4 rounded w-full focus:border-blue-500 focus:outline-none text-center"
            
          />
          {errors.nombre && <span className="text-red-500">{errors.nombre.message}</span>}
        </div>
        <div>
          <label  className="block text-gray-700 mb-1">Descripcion:</label>
          <input
            type="text"
            {...register("descripcion", {
              required: {
                value: true,
                message: "La descripcion es obligatoria",
              },
            })}
            className="border border-gray-800 py-2 px-4 rounded w-full focus:border-blue-500 focus:outline-none text-center"
          />
          {errors.descripcion && <span className="text-red-500">{errors.descripcion.message}</span>}
        </div>
        <div>
          <label  className="block text-gray-700 mb-1">Duracion:</label>
          <input
            type="number"
            {...register("duracion", {
              required: {
                value: true,
                message: "La duracion es obligatoria",
              },
            })}
            className="border border-gray-800 py-2 px-4 rounded w-full focus:border-blue-500 focus:outline-none text-center"
          />
          {errors.duracion && <span className="text-red-500">{errors.duracion.message}</span>}
        </div>
        <div>
          <label  className="block text-gray-700 mb-1">Precio:</label>
          <input
            type="number"
            {...register("precio", {
              required: {
                value: true,
                message: "El precio es obligatorio",
              },
              min: {
                value: 1,
                message: "La duración debe ser al menos 1",
              }
            })}
          className="border border-gray-800 py-2 px-4 rounded w-full focus:border-blue-500 focus:outline-none text-center"
          />
          {errors.precio && <span className="text-red-500">{errors.precio.message}</span>}
        </div>
        <div className="flex justify-center space-x-4">
          <button type="submit" className="px-2 font-medium text-sky-600 hover:bg-sky-700 hover:text-white rounded text-center ">Guardar</button>
          <button type="button" onClick={onClose} className="px-2 font-medium text-sky-600 hover:bg-sky-700 hover:text-white rounded text-center">Cerrar</button>
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
