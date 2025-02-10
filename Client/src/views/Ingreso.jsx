import { useState, useEffect, useRef } from "react";
import axios from "axios";
const Ingreso = () => {
  const [dni, setDni] = useState("");
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  // Enfoca el input automáticamente al entrar a la vista
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dni) return;

    setMessage("Verificando...");

    try {
      await axios.post("http://localhost:3001/ingreso", { dni });
      setMessage("✅ Acceso permitido, bienvenido.");
    } catch (error) {
      setMessage("❌ Acceso denegado.");
    }

    setDni(""); // Limpia el input después del envío
    inputRef.current?.focus(); // Vuelve a enfocar el input
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-lg font-bold mb-4">Ingreso de Clientes</h2>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text" 
            onChange={(e) => setDni(e.target.value)}
            placeholder="Escanea tu DNI"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            className="w-full mt-3 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Verificar
          </button>
        </form>
        {message && <p className="mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default Ingreso;
