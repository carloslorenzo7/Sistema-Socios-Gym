import { useState } from "react";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

import ClientList from "../components/ClientList";
import CLientDetail from "./ClientDetail";
import AddClient from "../components/AddClient";
import Payment from "../components/Payment";
import SearchClientName from "../components/SearchClientName";
import Memberships from "../components/Memberships";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [nombre, setNombre] = useState(""); // donde se va a almacenar el valor de la busuqeda

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  //handler de la search bar
  const handleInputChange = (e) => {
    setNombre(e.target.value);
  };
// useLocation para que aparezca la search bar solo en busqueda de cliente 
  const location=useLocation()

  const showSearchBar = location.pathname === "/dashboard/clientes"

  return (
    <div className="flex h-screen">
      {/* Navbar */}
      <div className="bg-blue-900 text-white w-full flex items-center justify-between p-4 fixed top-0 left-0 z-10">
        <button className="focus:outline-none" onClick={toggleSidebar}>
          {isOpen ? '✕' : '☰'}
        </button>
        <div className="text-2xl">Sistema de Registro</div>
    
      
    </div>
      {/* Sidebar */}
      <div
        className={`bg-blue-900 text-white ${
          isOpen ? "w-64" : "hidden"
        } transition-all duration-300`}
      >
        <nav className="flex flex-col pt-24 space-y-4">

          {/* search bar en barra lateral pausada
          <input
            className="text-black"
            type="text"
            value={nombre}
            onChange={handleInputChange}
            placeholder="Buscar cliente"
          /> */}

          <Link
            to="/dashboard/clientes"
            className="block p-3  rounded text-white hover:bg-gray-700"
          >
            Clientes
          </Link>

          <Link
            to="/dashboard/cliente/nuevoCliente"
            className="block p-3  rounded text-white hover:bg-gray-700"
          >
            Nuevo Cliente
          </Link>

          <Link
            to="/dashboard/clientes/pago"
            className="block p-3  rounded text-white hover:bg-gray-700"
          >
            Nuevo Pago
          </Link>


          <Link to= "/dashboard/membresias"
           className="block p-3  rounded text-white hover:bg-gray-700"
                      > Membresias
          </Link>
        </nav>
      </div>
      {/* Vista Central */}
      <div
        className={`flex-1 p-20 bg-gray-100 ${
          isOpen ? "ml-0" : ""
        } transition-all duration-300`}
      >



        {/* Barra de búsqueda  de preba para ver que tal queda */}
        {showSearchBar && (

          <div className="mb-4">
          <input
            className="text-black w-full px-3 py-2 border border-gray-300 rounded-md"
            type="text"
            value={nombre}
            onChange={handleInputChange}
            placeholder="Buscar cliente"
            />
        </div>

          )}

        {nombre ? (
          <SearchClientName nombre={nombre} />
        ) : (
          <Routes>
            <Route path="/clientes" exact Component={ClientList} />
            <Route path="/cliente/:id" exact Component={CLientDetail} />
            <Route path="/cliente/nuevoCliente" exact Component={AddClient} />
            <Route path="/clientes/pago" exact Component={Payment} />
            <Route
              path="/cliente/nombre"
              exact
              Component={() => <SearchClientName nombre={nombre} />}
            />
            <Route path="/membresias" exact Component={Memberships}/>
          </Routes>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
