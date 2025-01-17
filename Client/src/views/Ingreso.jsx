import { useState } from "react";
import axios from "axios"
const Ingreso = () => {
  const [dni, setDni] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("...Verificando");

    try {
        await axios.post("http://localhost:3001/ingreso", { dni });
      setMessage("Acceso permitido, bienvenido");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data);
      } else {
        setMessage("Hubo un error al procesar la solicitud");
      }
    }
  };

  return (
  <div className="max-w-lg mx-auto mt-10 bg-white p-8 shadow-md rounded-lg text-center">
    <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="dni" className="flex flex-auto text-gray-700 font-medium mb-2  items-center"></label>
        <input
        type="text"
        id="dni"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
        placeholder="Ingresa tu dni"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        </div>
        <div className= "flex justify-center space-x-4">
            <button type="submit" className=
            "px-4 py-2 mt-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
          
            >Verificar</button>
        </div>
    </form>
    {message && <p style={{ marginTop: "16px", color: "#333" }}>{message}</p>}
  </div>
  
  );
};

export default Ingreso;
