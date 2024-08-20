import NewMonthlyClients from "../stadistics/NewMonthlyClients";
import OverdueMonthlyClients from "../stadistics/OverdueMonthlyClients";
import ActiveClientsMonth from "../stadistics/ActiveClientsMonth";

const StadisticsMain= () =>{
   
    return(

        <div className="flex flex-col items-center">
             <h2 className="text-center font-semibold text-2xl py-6">Estadisticas</h2>

             <div className="w-3/4 mb-8">
                <h3 className="text-lg font-medium mb-4 text-center">Clientes nuevos por mes</h3>
                <NewMonthlyClients/>
             </div>

             <div className="w-3/4 mb-8">
                <h3 className="text-lg font-medium mb-4 text-center">Clientes vencidos por mes</h3>
                <OverdueMonthlyClients/>
             </div>
             <div className="w-3/4 mb-8">
                <h3 className="text-lg font-medium mb-4 text-center">Clientes activos por mes</h3>
                <ActiveClientsMonth/>
             </div>
        </div>
    )
};

export default StadisticsMain;