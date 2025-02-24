import { useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import { UserIcon, UserPlusIcon, CreditCardIcon, ChartBarIcon, XCircleIcon, Bars3Icon } from '@heroicons/react/24/solid'
import { CgInsertAfterO } from "react-icons/cg";
//import ClientList from "../components/ClientList";
import ClientDetail from "./ClientDetail";
import AddClient from "../components/AddClient";
// import Payment from "../components/Payment";
//import SearchClientName from "../components/SearchClientName";
import Memberships from "../components/Memberships";
import ClientManagement from "../components/ClientManagement";
import StadisticsMain from "../components/stadistics/StadisticsMain";
import Ingreso from "../../src/views/Ingreso";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const location = useLocation();
  const showSearchBar = location.pathname === "/dashboard/clientes";

  return (
    <div className="flex h-screen">


      <div className="bg-blue-primary text-white w-full flex items-center justify-between p-4 fixed top-0 left-0 z-10">
        <button className="" onClick={toggleSidebar}>
          {isOpen ? <XCircleIcon class="h-6 w-6 text-white" /> : <Bars3Icon class="h-6 w-6 text-white" />}
        </button>
        <div className="text-2xl font-semibold">Sistema de Registro</div>
      </div>

      {/* Sidebar */}
      <div className={`bg-blue-900 text-white ${isOpen ? "w-64 mt-16" : "hidden"} transition-all duration-300 pt-16 fixed h-full z-10`}>

        <nav className="flex flex-col space-y-4 p-4">

          <img src="/fitness.webp" className="w-48 mx-auto mt-10 mb-10" alt="" />
          <Link
            to="/dashboard/clientes"
            className="block p-3 rounded text-white hover:bg-gris-secundary hover:text-blue-800 hover:font-bold transition duration-300"
          >
            <p className="flex flex-row items-center gap-3">{<UserIcon class="h-6 w-6 text-white" />}Cliente</p>
          </Link>
          <Link
            to="/dashboard/cliente/nuevoCliente"
            className="block p-3 rounded text-white hover:bg-gris-secundary hover:text-blue-800 hover:font-bold transition duration-300"
          >
            <p className="flex flex-row items-center gap-3">{<UserPlusIcon class="h-6 w-6 text-white" />} Nuevo Cliente</p>
          </Link>
          {/* <Link
            to="/dashboard/clientes/pago"
            className="block p-3 rounded text-white hover:bg-gris-secundary hover:text-blue-800 hover:font-bold transition duration-300"
          >
            <p className="flex flex-row items-center gap-3">{<CurrencyDollarIcon class="h-6 w-6 text-white" />} Nuevo Pago</p>
          </Link> */}
          <Link
            to="/dashboard/membresias"
            className="block p-3 rounded text-white hover:bg-gris-secundary hover:text-blue-800 hover:font-bold transition duration-300"
          >
            <p className="flex flex-row items-center gap-3">{<CreditCardIcon class="h-6 w-6 text-white" />} Membresías</p>
          </Link>
          <Link
            to="/dashboard/estadisticas"
            className=" block p-3 rounded text-white hover:bg-gris-secundary hover:text-blue-800 hover:font-bold transition duration-300"
          >
            <p className="flex flex-row items-center gap-3">{<ChartBarIcon class="h-6 w-6 text-white" />} Estadisticas</p>
          </Link>
          <Link
            to="/dashboard/ingreso"
            className=" block p-3 rounded text-white hover:bg-gris-secundary hover:text-blue-800 hover:font-bold transition duration-300"
          >
            <p className="flex flex-row items-center gap-3">{<CgInsertAfterO  class="h-6 w-6 text-white" />} Ingreso</p>
          </Link>
        </nav>
      </div>

      {/* Vista Central */}
      <div className={`flex-1 p-20 bg-gray-100 ${isOpen ? "ml-64" : "ml-0"} transition-all duration-300 pt-16 min-h-full overflow-y-auto`}>

        {/* {showSearchBar && (
          <div className="mb-4">
            { Componente de búsqueda }
          </div>
        )} */}
        

        <div className="">
          <Routes>
            <Route path="/clientes" exact Component={ClientManagement} />
            <Route path="/cliente/:id" exact Component={ClientDetail} />
            <Route path="/cliente/nuevoCliente" exact Component={AddClient} />
            {/* <Route path="/clientes/pago" exact Component={Payment} /> */}
            <Route path="/membresias" exact Component={Memberships} />
            <Route path="/estadisticas" exact Component={StadisticsMain} />
             <Route path="/ingreso"exact Component={Ingreso} />
             
          </Routes>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
