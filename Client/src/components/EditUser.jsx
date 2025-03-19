import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const apiUrl = import.meta.env.VITE_BACK_URL;


const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        nombre: "",
        apellido:"",
        email: "",
        estado: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${apiUrl}/cliente/${id}`);
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                setError("Error al obtener los datos del usuario");
                setLoading(false);
                toast.error("Error al obtener los datos del usuario");
            }
        };
        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${apiUrl}/cliente/${id}`, user);
            toast.success("Usuario actualizado con éxito");
            navigate("/dashboard/clientes");
        } catch (error) {
            setError("Error al actualizar el usuario");
            toast.error("Error al actualizar el usuario");
        }
    };

    if (loading) {
        return <p className="text-center text-xl">Cargando...</p>;
    }

    if (error) {
        return <p className="text-center text-xl text-red-500">{error}</p>;
    }

    return (
        <div className="max-w-2xl mx-auto mt-8">
            <ToastContainer />
            <h2 className="text-2xl font-semibold mb-6 text-center">Editar Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={user.nombre}
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                        required
                    />
                </div>
                 <div className="mb-4">
                    <label className="block text-gray-700">Apellido:</label>
                    <input
                        type="text"
                        name="apellido"
                        value={user.apellido}
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Estado:</label>
                    <input
                        type="text"
                        name="estado"
                        value={user.estado}
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUser;
