import { useState, useEffect } from "react";
import axios from "axios";
import MembershipForm from "./MembershipForm";
import Modal from "./Modal";
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const apiUrl = import.meta.env.VITE_BACK_URL;

const Memberships = () => {
  const [membresias, setMembresias] = useState([]);
  const [error, setError] = useState(null);
  const [selectedMembership, setSelectedMembership] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchMemberships = async () => {
    try {
      const response = await axios.get(`${apiUrl}/membresias`);
      // Asegurarnos de que response.data sea un array
      const membresiasData = Array.isArray(response.data) ? response.data : [];
      setMembresias(membresiasData);
      // Si no es un array, mostramos un mensaje de error
      if (!Array.isArray(response.data)) {
        setError(response.data.message || "No se encontraron membresías");
        toast.error(response.data.message || "No se encontraron membresías");
      }
    } catch (error) {
      setMembresias([]); // Asegurarnos de que sea un array vacío
      setError("Error al conectar con el servidor");
      toast.error("Error al conectar con el servidor");
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []); //Added empty dependency array to fix the warning

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
      await axios.delete(`${apiUrl}/eliminarMembresia/${id}`);
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
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Membresías</h2>
        <button
          className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleAdd}
        >
          <FaPlus className="mr-2 -ml-1 h-5 w-5" />
          Agregar Membresía
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> Error al cargar membresías</span>
        </div>
      )}

      {membresias.length === 0 ? (
        <div className="text-center text-gray-500 mt-4">No hay membresías disponibles</div>
      ) : (
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-200">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Plan</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Descripción</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Duración</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Precio</th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Acciones</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {membresias.map((membresia) => (
                      <tr key={membresia.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{membresia.nombre}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{membresia.descripcion}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{membresia.duracion}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{membresia.precio}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                            onClick={() => handleEdit(membresia)}
                          >
                            <FaEdit className="h-5 w-5" />
                            <span className="sr-only">Editar</span>
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDelete(membresia.id)}
                          >
                            <FaTrashAlt className="h-5 w-5" />
                            <span className="sr-only">Eliminar</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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
