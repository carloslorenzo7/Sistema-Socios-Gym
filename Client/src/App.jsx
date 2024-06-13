import { Routes, Route } from "react-router-dom";
import './App.css'
import Landing from "./views/Landing";
import Dashboard from "./views/Dashboard"
// import ClientDetail from "./views/ClientDetail";
// import ClientList from "./components/ClientList";

function App() {


  return (
    
      <div>
       <Routes>

        <Route path="/" exact Component={Landing}/>
        <Route path="/dashboard/*" exact Component={Dashboard}/>


        {/* <Route path="/clientes" exact Component={ClientList}/>
        <Route path="/clients/:id" exact Component={ClientDetail}/> */}
        
       </Routes>

      </div>
      
    
  )
}

export default App
