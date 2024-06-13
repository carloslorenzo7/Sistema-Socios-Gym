import { useState } from "react";
import ClientList from "../components/ClientList";
import CLientDetail from "./ClientDetail";
import AddClient from "../components/AddClient";
import Payment from "../components/Payment"
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Navbar */}
      <div className="bg-blue-900 text-white w-full flex items-center justify-between p-4 fixed top-0 left-0 z-10">
        <button className="focus:outline-none" onClick={toggleSidebar}>
          {isOpen ? "Cerrar" : "Abrir"}
        </button>
        <div className="text-2xl">Mi Dashboard</div>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-blue-900 text-white ${
          isOpen ? "w-64" : "hidden"
        } transition-all duration-300`}
      >
        <nav className="flex flex-col pt-24 space-y-4">
          <Link
            to="/dashboard/clientes"
            className="block p-3  rounded text-white hover:bg-gray-700"
          >
            Todos los Clientes
          </Link>

          <Link
            to="/dashboard/clientes/nuevoCliente"
            className="block p-3  rounded text-white hover:bg-gray-700"
          >
            Nuevo Cliente
          </Link>

          <Link  to="/dashboard/clientes/pago" className="block p-3  rounded text-white hover:bg-gray-700">Nuevo Pago</Link>
        </nav>
      </div>
      {/* Vista Central */}
      <div
        className={`flex-1 p-20 bg-gray-100 ${
          isOpen ? "ml-0" : ""
        } transition-all duration-300`}
      >
        <Routes>
          <Route path="/clientes" exact Component={ClientList} />
          <Route path="/cliente/:id" exact Component={CLientDetail} />
          <Route path="/clientes/nuevoCliente" exact Component={AddClient} />
          <Route path="/clientes/pago" exact Component={Payment}/>
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
