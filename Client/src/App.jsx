import { Routes, Route } from "react-router-dom";
import './App.css'
import Landing from "./views/Landing";
import Dashboard from "./views/Dashboard"
import Ingreso from "./views/Ingreso";

function App() {


  return (

    <div>
      <Routes>

        <Route path="/" exact Component={Landing} />
        <Route path="/dashboard/*" exact Component={Dashboard} />
        {/* <Route path="/ingreso"exact Component={Ingreso} /> */}

      </Routes>

    </div>


  )
}

export default App
