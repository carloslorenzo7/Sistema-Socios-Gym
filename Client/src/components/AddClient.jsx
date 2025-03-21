import { useRef, useCallback, useState } from "react"; // Importar useState
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaIdCard,
  FaPaperPlane,
  FaImage,
  // FaCamera,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Webcam from "react-webcam";
const apiUrl = import.meta.env.VITE_BACK_URL;


const AddClient = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  // const webcamRef = useRef(null);
  // const [showCamera, setShowCamera] = useState(false); // Estado para controlar la cámara
  // const [previewUrl, setPreviewUrl] = useState("");

  const onSubmit = async (data) => {
    console.log(data); // Verifica los datos antes de enviarlos al backend

    try {
      const response = await axios.post(
        `${apiUrl}/cliente/nuevoCliente`,
        data, // Enviamos los datos como un objeto JSON
        {
          headers: {
            "Content-Type": "application/json", // Asegúrate de que el backend reciba JSON
          },
        }
      );

      toast.success("Cliente creado con éxito");
      navigate(`/dashboard/cliente/${response.data.id}`);
    } catch (error) {
      toast.error("Error al crear el cliente");
      console.error("Error al crear el cliente:", error.response?.data || error.message);
    }
  };


  // const handleShowCamera = () => {
  //   setShowCamera(!showCamera); // Alterna la visibilidad de la cámara
  // };

  // const capture = useCallback(() => {
  //   if (webcamRef.current) {
  //     const imageSrc = webcamRef.current.getScreenshot();
  //     fetch(imageSrc)
  //       .then((res) => res.blob())
  //       .then((blob) => {
  //         const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
  //         console.log("Archivo capturado:", file);
  //         setValue("imagen", [file]); // Asigna el archivo al campo del formulario
  //         setPreviewUrl(imageSrc); // Usar la URL del objeto directamente
  //         setShowCamera(false); // Cierra la cámara después de tomar la foto
  //       });
  //   }
  // }, [webcamRef, setValue]);

  // handler para previsualizar la iamgen en form
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setValue("imagen", [file]);
  //     setPreviewUrl(URL.createObjectURL(file)); // se etablece la url del objeto
  //   }
  // };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 shadow-md rounded-lg">
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Añadir Cliente
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            <FaUser className="mr-2" /> Nombre
          </label>
          <input
            type="text"
            {...register("nombre", {
              required: "El campo nombre es obligatorio",
              pattern: {
                value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
                message: "El nombre solo debe contener letras y espacios"
              },
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.nombre && (
            <span className="text-red-500 text-sm">
              {errors.nombre.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            <FaUser className="mr-2" /> Apellido
          </label>
          <input
            type="text"
            {...register("apellido", {
              required: "El campo apellido es obligatorio",
              pattern: {
                value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
                message: "El apellido solo debe contener letras y espacios"
              },
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.apellido && (
            <span className="text-red-500 text-sm">
              {errors.apellido.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            <FaEnvelope className="mr-2" /> Email
          </label>
          <input
            type="email"
            {...register("email", {
              required: "El campo email es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "No tiene formato valido de correo electronico",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            <FaIdCard className="mr-2" /> DNI
          </label>
          <input
            type="text"
            {...register("dni", {
              required: "El campo DNI es obligatorio",
              pattern: {
                value: /^[0-9]{8}$/,
                message: "El DNI debe contener solo números y 8 digitos",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.dni && (
            <span className="text-red-500 text-sm">{errors.dni.message}</span>
          )}
        </div>
        {/* <div>
          <label className="block text-gray-700 font-medium mb-2">
            <FaImage className="mr-2" /> Imagen
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleFileChange} // Agregado para manejar el cambio de archivo
            className="hidden"
          />
          <button
            type="button"
            onClick={() => document.getElementById("fileInput").click()}
            className="w-full p-2 border border-gray-300 rounded-md flex items-center justify-center mb-2"
          >
            <FaCamera className="mr-2" /> Seleccionar Archivo
          </button>
          {showCamera && ( // Renderiza la cámara solo si showCamera es true
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full mb-2"
            />
          )}
          <button
            type="button"
            onClick={handleShowCamera} // Cambia a la función que alterna la cámara
            className="w-full p-2 border border-gray-300 rounded-md flex items-center justify-center mb-2"
          >
            <FaCamera className="mr-2" /> Tomar Foto
          </button>
          {showCamera && ( // Renderiza el botón de captura solo si showCamera es true
            <button
              type="button"
              onClick={capture}
              className="w-full p-2 border border-gray-300 rounded-md flex items-center justify-center"
            >
              Capturar Imagen
            </button>
          )}
          {previewUrl && (
            <div className="mt-2">
              <img
                src={previewUrl}
                alt="Vista previa"
                style={{ width: "200px", height: "auto" }}
                className="rounded-md"
              />
            </div>
          )}
        </div> */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
        >
          <FaPaperPlane className="mr-2" /> Enviar
        </button>
      </form>
    </div>
  );
};

export default AddClient;
