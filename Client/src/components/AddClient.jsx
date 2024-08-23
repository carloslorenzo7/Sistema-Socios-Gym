// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//   FaUser,
//   FaEnvelope,
//   FaIdCard,
//   FaPaperPlane,
//   FaImage,
//   FaCamera
// } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AddClient = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     console.log("Datos enviados:", data);

//     try {
//       const formData = new FormData();

//       // Añadir el campo de imagen si está presente
//       if (data.imagen && data.imagen[0]) {
//         formData.append("imagen", data.imagen[0]);
//       }

//       const response = await axios.post(
//         "http://localhost:3001/cliente/nuevoCliente",
//         data,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data", // Asegúrate de especificar el tipo de contenido
//           },
//         }
//       );

//       // Si el backend requiere combinar los datos de texto y el archivo, puedes hacerlo en un segundo paso.
//       if (data.imagen && data.imagen[0]) {
//         await axios.post(
//           "http://localhost:3001/cliente/uploadImage",
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//       }
//       toast.success("Cliente creado con éxito");

//       const newClientId = response.data.id; // Asume que el backend devuelve el ID del cliente creado

//       setTimeout(() => {
//         navigate(`/dashboard/cliente/${newClientId}`); // Redirige al detalle del cliente recién creado
//       }, 1000);
//     } catch (error) {
//       toast.error("Error al crear el cliente");
//       console.error(
//         "Error al crear el cliente:",
//         error.response ? error.response.data : error.message
//       );
//     }
//   };
//   const handleFileClick = () => {
//     document.getElementById('fileInput').click();
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white p-8 shadow-md rounded-lg">
//       <ToastContainer />
//       <h1 className="text-2xl font-semibold mb-6 text-center">
//         Añadir Cliente
//       </h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div>
//           <label className="block text-gray-700 font-medium mb-2 items-center">
//             <FaUser className="mr-2" /> Nombre
//           </label>
//           <input
//             type="text"
//             {...register("nombre", {
//               required: {
//                 value: true,
//                 message: "El campo nombre es obligatorio",
//               },
//             })}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//           {errors.nombre && (
//             <span className="text-red-500 text-sm">
//               {errors.nombre.message}
//             </span>
//           )}
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-2 items-center">
//             <FaUser className="mr-2" /> Apellido
//           </label>
//           <input
//             type="text"
//             {...register("apellido", {
//               required: {
//                 value: true,
//                 message: "El campo apellido es obligatorio",
//               },
//             })}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//           {errors.apellido && (
//             <span className="text-red-500 text-sm">
//               {errors.apellido.message}
//             </span>
//           )}
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-2 items-center">
//             <FaEnvelope className="mr-2" /> Email
//           </label>
//           <input
//             type="email"
//             {...register("email", {
//               required: {
//                 value: true,
//                 message: "El campo email es obligatorio",
//               },
//               pattern: {
//                 value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                 message: "No tiene formato valido de correo electronico",
//               },
//             })}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//           {errors.email && (
//             <span className="text-red-500 text-sm">{errors.email.message}</span>
//           )}
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-2 items-center">
//             <FaIdCard className="mr-2" /> DNI
//           </label>
//           <input
//             type="text"
//             {...register("dni", {
//               required: {
//                 value: true,
//                 message: "El campo DNI es obligatorio",
//               },
//               pattern: {
//                 value: /^[0-9]+$/,
//                 message: "El DNI debe contener solo números",
//               },
//             })}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//           {errors.dni && (
//             <span className="text-red-500 text-sm">{errors.dni.message}</span>
//           )}
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-2 items-center">
//             <FaImage className="mr-2" /> Imagen
//           </label>
//           <input
//               type="file"
//               id="fileInput"
//               accept="image/*"
//               capture="user"
//               {...register("imagen")}
//               className="hidden"
//           />
//             <button
//             type="button"
//             onClick={handleFileClick}
//             className="w-full p-2 border border-gray-300 rounded-md flex items-center justify-center"
//           >
//             <FaCamera className="mr-2" /> Tomar Foto o Seleccionar Archivo
//           </button>
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
//         >
//           <FaPaperPlane className="mr-2" /> Enviar
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddClient;




import { useRef, useCallback, useState } from "react"; // Importar useState
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaIdCard, FaPaperPlane, FaImage, FaCamera } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Webcam from "react-webcam";

const AddClient = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false); // Estado para controlar la cámara

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("nombre", data.nombre);
      formData.append("apellido", data.apellido);
      formData.append("email", data.email);
      formData.append("dni", data.dni);

      if (data.imagen && data.imagen[0]) {
        formData.append("imagen", data.imagen[0]);
      }

      const response = await axios.post(
        "http://localhost:3001/cliente/nuevoCliente",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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

  const handleShowCamera = () => {
    setShowCamera(!showCamera); // Alterna la visibilidad de la cámara
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
          setValue("imagen", [file]); // Asigna el archivo al campo del formulario
          setShowCamera(false); // Cierra la cámara después de tomar la foto
        });
    }
  }, [webcamRef, setValue]);

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 shadow-md rounded-lg">
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-6 text-center">Añadir Cliente</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            <FaUser className="mr-2" /> Nombre
          </label>
          <input
            type="text"
            {...register("nombre", { required: "El campo nombre es obligatorio" })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.nombre && <span className="text-red-500 text-sm">{errors.nombre.message}</span>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            <FaUser className="mr-2" /> Apellido
          </label>
          <input
            type="text"
            {...register("apellido", { required: "El campo apellido es obligatorio" })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.apellido && <span className="text-red-500 text-sm">{errors.apellido.message}</span>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            <FaEnvelope className="mr-2" /> Email
          </label>
          <input
            type="email"
            {...register("email", {
              required: "El campo email es obligatorio",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "No tiene formato valido de correo electronico" }
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            <FaIdCard className="mr-2" /> DNI
          </label>
          <input
            type="text"
            {...register("dni", { required: "El campo DNI es obligatorio", pattern: { value: /^[0-9]+$/, message: "El DNI debe contener solo números" } })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.dni && <span className="text-red-500 text-sm">{errors.dni.message}</span>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            <FaImage className="mr-2" /> Imagen
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            {...register("imagen")}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => document.getElementById('fileInput').click()}
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
        </div>
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
