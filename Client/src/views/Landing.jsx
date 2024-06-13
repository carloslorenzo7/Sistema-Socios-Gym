import { useForm } from "react-hook-form";
import{ useNavigate } from "react-router-dom"; // useHistory para redireccionar al admin al dashboard;


const Landing = () => {
  //info pra el uso del hook useForm:
  //register: nos permite registrar los diferentes campo para que formen parte del formulario y para las validaciones tambien
  //handleSubmit: permite el envio de datos

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate= useNavigate();

  const adminCredentials={
    email:"carlos@ejemplo.com",
    password:"Carlos07&&"
  }

  const onSubmit = (data) => {
    console.log("Datos ingresados:", data);
    console.log("Credenciales del admin:", adminCredentials);


    if(data.email=== adminCredentials.email && data.password === adminCredentials.password){
     navigate("/dashboard");
    }else{
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-800">
      

      <form className="flex flex-col p-10 bg-dark-gray rounded-lg shadow-outer-light w-full max-w-md transition-transform transform duration-500 ease-in-out hover:scale-105 hover:border hover:border-black"
      
      onSubmit={handleSubmit(onSubmit)}>

      <h1 className=" mb-4 text-4xl font-bold text-center text-white">Bienvenido</h1>


        <div className="mb-4 relative">



          
          <label className="block text-gray-300 font-bold">Email</label>
          <input
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "El email es obligatorio",
              },
              pattern:{
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "No tiene formato valido de correo electronico"
              },
            })}
            className="mt-1 p-2 pl-10 bg-input-gray border-none outline-none text-white rounded-lg w-full shadow-inner-deep"
          />
          {errors.email && <span className="text-red-600 h-4 block font-semibold">{errors.email.message}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 font-bold">Contraseña</label>
          <input
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "La contraseña es obligatoria",
              },
              pattern:{
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&;])[A-Za-z\d@$!%*?&;]{8,}$/,
                message:"La contraseña debe tener mayusculas, minusculas, un numero, un simbolo y minimo 8 caracteres"              },
            })}
            className="mt-1 p-2 pl-10 bg-input-gray border-none outline-none text-white rounded-lg w-full shadow-inner-deep"
          />
          {errors.password && <span className="text-red-600 font-semibold">{errors.password.message}</span>}
        </div>

        <input
          type="submit"
          value="Ingresar"
          className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600"
        />
      </form>
    </div>
  );
};

export default Landing;
