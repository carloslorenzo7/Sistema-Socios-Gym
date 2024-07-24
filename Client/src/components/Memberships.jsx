import { useState, useEffect } from "react";
import axios from "axios";
import MembershipForm from "./MembershipForm";
import Modal from "./Modal";

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
      <p className="text-xl font-semibold">Membresias</p>
      {/* boton agregar */}
      <button
        className="bg-blue-600 px-5 py-5 text-white rounded-full bottom-8 right-10 flex items-center justify-center fixed"
        onClick={handleAdd}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>

      {error && <div>Error al cargar membresias</div>}

      {membresias.length === 0 ? (
        <div>No hay membresias disponibles</div>
      ) : (
         <div className="overflow-x-auto">
          <table>
            <thead>
              <tr className="bg-gray-500 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nombre</th>
                <th className="py-3 px-6 text-left">Descripcion</th>
                <th className="py-3 px-6 text-left">Duracion</th>
                <th className="py-3 px-6 text-left">Precio</th>
                <th className="py-3 px-14 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-sm font-light">
              {membresias.map((membresia) => (
                <tr key={membresia.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left"> {membresia.nombre} </td>
                  <td className="py-3 px-6 text-left"> {membresia.descripcion} </td>
                  <td className="py-3 px-10 text-left"> {membresia.duracion} </td>
                  <td className="py-3 px-8 text-left"> {membresia.precio} </td>

                  <td className="py-3 px-8 text-left">
                    <div>
                      {/* boton editar */}
                      <button
                        className=" text-blue-600 px-6"
                        onClick={() => handleEdit(membresia)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6"
                        >
                          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                        </svg>
                      </button>

                      {/* boton eliminar */}
                      <button
                        className="text-red-600 px-2 "
                        onClick={() => handleDelete(membresia.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={1}
                          stroke="white"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
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
