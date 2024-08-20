import { useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";

//import ClientList from "../components/ClientList";
import ClientDetail from "./ClientDetail";
import AddClient from "../components/AddClient";
import Payment from "../components/Payment";
//import SearchClientName from "../components/SearchClientName";
import Memberships from "../components/Memberships";
import ClientManagement from "../components/ClientManagement";
import StadisticsMain from "../components/stadistics/StadisticsMain";
const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const location = useLocation();
  const showSearchBar = location.pathname === "/dashboard/clientes";

  return (
    <div className="flex h-screen">
      {/* Navbar */}
      <div className="bg-blue-900 text-white w-full flex items-center justify-between p-4 fixed top-0 left-0 z-10">
        <button className="focus:outline-none" onClick={toggleSidebar}>
          {isOpen ? '✕' : '☰'}
        </button>
        <div className="text-2xl font-semibold">Sistema de Registro</div>
      </div>

      {/* Sidebar */}
      <div className={`bg-blue-900 text-white ${isOpen ? "w-64" : "hidden"} transition-all duration-300 pt-16 fixed h-full z-10`}>
        <nav className="flex flex-col space-y-4 p-4">
          <Link
            to="/dashboard/clientes"
            className="block p-3 rounded text-white hover:bg-gray-700 transition duration-300"
          >
            Clientes
          </Link>
          <Link
            to="/dashboard/cliente/nuevoCliente"
            className="block p-3 rounded text-white hover:bg-gray-700 transition duration-300"
          >
            Nuevo Cliente
          </Link>
          <Link
            to="/dashboard/clientes/pago"
            className="block p-3 rounded text-white hover:bg-gray-700 transition duration-300"
          >
            Nuevo Pago
          </Link>
          <Link
            to="/dashboard/membresias"
            className="block p-3 rounded text-white hover:bg-gray-700 transition duration-300"
          >
            Membresías
          </Link>
          <Link
            to="/dashboard/estadisticas"
            className=" block p-3 rounded text-white hover:bg-gray-700 transition duration-300"
          >
           Estadisticas
          </Link>
        </nav>
      </div>

      {/* Vista Central */}
      <div className={`flex-1 p-20 bg-gray-100 ${isOpen ? "ml-64" : "ml-0"} transition-all duration-300 pt-16 min-h-full overflow-y-auto`}>
        {showSearchBar && (
          <div className="mb-4">
            {/* Componente de búsqueda */}
          </div>
        )}

        <div className="">
    <Routes>
      <Route path="/clientes" exact Component={ClientManagement} />
      <Route path="/cliente/:id" exact Component={ClientDetail} />
      <Route path="/cliente/nuevoCliente" exact Component={AddClient} />
      <Route path="/clientes/pago" exact Component={Payment} />
      <Route path="/membresias" exact Component={Memberships} />
      <Route path="/estadisticas" exact Component={StadisticsMain} />
    </Routes>
  </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
