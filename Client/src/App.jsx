import { Routes, Route } from "react-router-dom";
import './App.css'
import Landing from "./views/Landing";
import Dashboard from "./views/Dashboard"

function App() {


  return (

    <div>
      <Routes>

        <Route path="/" exact Component={Landing} />
        <Route path="/dashboard/*" exact Component={Dashboard} />

      </Routes>

    </div>


  )
}

export default App
