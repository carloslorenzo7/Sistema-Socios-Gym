import { useState, useEffect } from "react";
import axios from "axios";
import MembershipForm from "./MembershipForm";
import Modal from "./Modal";
<<<<<<< HEAD
import { MdModeEditOutline } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import {  MdAdd} from "react-icons/md";


=======
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
>>>>>>> 3e75e4a362efb4288e245e45ad2e4f811c39838b

const Memberships = () => {
  const [membresias, setMembresias] = useState([]);
  const [error, setError] = useState(null);
  const [selectedMembership, setSelectedMembership] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchMemberships = async () => {
    try {
      const response = await axios.get("http://localhost:3001/membresias");
      setMembresias(response.data);
    } catch (error) {
      setError(true);
      toast.error("Error al cargar membresías");
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  const handleAdd = () => {
    setSelectedMembership(null);
    setIsModalOpen(true);
  };

  const handleEdit = (membresia) => {
    setSelectedMembership(membresia);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setIsModalOpen(false);
    fetchMemberships();
    toast.success("Membresía guardada con éxito");
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/eliminarMembresia/${id}`);
      setMembresias(membresias.filter((membresia) => membresia.id !== id));
      toast.success("Membresía eliminada con éxito");
    } catch (error) {
      console.error(
        "Error al eliminar membresía:",
        error.response ? error.response.data : error.message
      );
      setError(true);
      toast.error("Error al eliminar membresía");
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-4">
      <ToastContainer />
      <p className="text-2xl font-semibold mb-8 text-center">Membresías</p>
      <button
<<<<<<< HEAD
        className="bg-blue-600  text-white rounded-full bottom-8 right-10 flex items-center justify-center fixed"
        onClick={handleAdd}
      >
         < MdAdd  className="text-6xl " />
=======
        className="bg-blue-600 p-4 text-white rounded-full fixed bottom-8 right-10 flex items-center justify-center shadow-lg hover:bg-blue-700 transition duration-300"
        onClick={handleAdd}
      >
        <FaPlus size={24} />
>>>>>>> 3e75e4a362efb4288e245e45ad2e4f811c39838b
      </button>

      {error && <div className="text-red-500 text-center mb-4">Error al cargar membresías</div>}

      {membresias.length === 0 ? (
        <div className="text-center text-gray-700">No hay membresías disponibles</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-800 text-white uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Plan</th>
                <th className="py-3 px-6 text-left">Descripción</th>
                <th className="py-3 px-6 text-left">Duración</th>
                <th className="py-3 px-6 text-left">Precio</th>
                <th className="py-3 px-6 text-left">Editar</th>
                <th className="py-3 px-6 text-left">Eliminar</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {membresias.map((membresia) => (
                <tr key={membresia.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{membresia.nombre}</td>
                  <td className="py-3 px-6 text-left">{membresia.descripcion}</td>
                  <td className="py-3 px-6 text-left">{membresia.duracion}</td>
                  <td className="py-3 px-6 text-left">{membresia.precio}</td>
                  <td className="py-3 px-6 text-left">
                    <button
                      className="text-blue-600 hover:text-blue-800 transition duration-300"
                      onClick={() => handleEdit(membresia)}
                    >
                      <FaEdit size={20} />
                    </button>
                  </td>
<<<<<<< HEAD
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
=======
                  <td className="py-3 px-6 text-left">
                    <button
                      className="text-red-600 hover:text-red-800 transition duration-300"
                      onClick={() => handleDelete(membresia.id)}
                    >
                      <FaTrashAlt size={20} />
                    </button>
>>>>>>> 3e75e4a362efb4288e245e45ad2e4f811c39838b
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
