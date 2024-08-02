import { useState, useEffect } from "react";
import axios from "axios";
import MembershipForm from "./MembershipForm";
import Modal from "./Modal";
import { MdModeEditOutline } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import {  MdAdd} from "react-icons/md";



const Memberships = () => {
  const [membresias, setMembresias] = useState([]);
  const [error, setError] = useState(null);
  // estado para guardar los datos de la membresia que se quiere editar
  const [selectedMembership, setSelectedMembership] = useState(null);
  // para apeertura y cierre de modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchMemberships = async () => {
    try {
      const response = await axios.get("http://localhost:3001/membresias");
      setMembresias(response.data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  // handlers
  const handleAdd = () => {
    setSelectedMembership(null);
    setIsModalOpen(true);
  };

  const handleEdit = (membresias) => {
    setSelectedMembership(membresias);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setIsModalOpen(false);
    fetchMemberships();
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/eliminarMembresia/${id}`);
      setMembresias(membresias.filter((membresia) => membresia.id !== id));
    } catch (error) {
      console.error(
        "Error al eliminar cliente:",
        error.response ? error.response.data : error.message
      );
      setError(true);
    }
  };

  return (
    <div className="">
      <p className="text-xl font-semibold mb-8 text-center">Membresias</p>
      {/* boton agregar */}
      <button
        className="bg-blue-600  text-white rounded-full bottom-8 right-10 flex items-center justify-center fixed"
        onClick={handleAdd}
      >
         < MdAdd  className="text-6xl " />
      </button>

      {error && <div>Error al cargar membresias</div>}

      {membresias.length === 0 ? (
        <div>No hay membresias disponibles</div>
      ) : (
        <div className="overflow-x-auto bg-gray-400 rounded-md">
          <table>
            <thead>
              <tr className="uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Plan</th>
                <th className="py-3 px-6 text-left">Descripcion</th>
                <th className="py-3 px-6 text-left">Duracion</th>
                <th className="py-3 px-7 text-left">Precio</th>
                <th className="py-3 px-14 text-left">Editar</th>
                <th className="py-3 px-6 text-left">Eliminar</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 bg-white text-sm font-normal">
              {membresias.map((membresia) => (
                <tr key={membresia.id} className="border-b border-gray-200">
                  <td className="py-3 px-4 text-left"> {membresia.nombre} </td>
                  <td className="py-3 px-6 text-left">
                    {" "}
                    {membresia.descripcion}{" "}
                  </td>
                  <td className="py-3 px-12 text-left">
                    {" "}
                    {membresia.duracion}{" "}
                  </td>
                  <td className="py-3 px-8 text-left"> {membresia.precio} </td>

                  <td className="py-3 px-10 text-left">
                    <div>
                      {/* boton editar */}
                      <button
                        className=" text-blue-800 px-6"
                        onClick={() => handleEdit(membresia)}
                      >
                        <MdModeEditOutline className="text-2xl"/>
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-8 text-left">
                    <div>
                      {/* boton eliminar */}
                      <button
                        className="text-red-600 px-2 "
                        onClick={() => handleDelete(membresia.id)}
                      >
                         <MdDeleteForever className="text-2xl"/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <MembershipForm
          membership={selectedMembership}
          onSave={handleSave}
          onClose={handleClose}
        />
      </Modal>
    </div>
  );
};

export default Memberships;
