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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            {...register("nombre", {
              required: {
                value: true,
                message: "El nombre es obligatorio",
              },
            })}
          />
          {errors.nombre && <span>{errors.nombre.message}</span>}
        </div>
        <div>
          <label>Descripcion</label>
          <input
            type="text"
            {...register("descripcion", {
              required: {
                value: true,
                message: "La descripcion es obligatoria",
              },
            })}
          />
          {errors.descripcion && <span>{errors.descripcion.message}</span>}
        </div>
        <div>
          <label>Duracion</label>
          <input
            type="number"
            {...register("duracion", {
              required: {
                value: true,
                message: "La duracion es obligatoria",
              },
            })}
          />
          {errors.duracion && <span>{errors.duracion.message}</span>}
        </div>
        <div>
          <label>Precio</label>
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
          />
          {errors.precio && <span>{errors.precio.message}</span>}
        </div>
        <div className="flex justify-end px-3">
          <button type="submit" className="pr-5">Guardar</button>
          <button type="button" onClick={onClose} className="">Cerrar</button>
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
