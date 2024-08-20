import { BarChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend ,Bar } from "recharts";
import { useEffect ,useState } from "react";
import axios from "axios"
//?ReponsiveContainer: va a ser el contenedor 
//? BarChart: va a ser el tipo de grafico, en este caso de barras
//? CartesianGrid : matriz de trazos y guiones
//? XAxis: eje x
//? YAxis: eje y 
//?Tooltip: es lo que vemos pasar el mause por las barras
//? Legend: Etiquetas 
//? Bar: son las barras



const Stadistics = () => {
    const [data,setData] = useState([])
    
    useEffect(()=>{
    
        const axiosClient= async() =>{
            try {
                const response= await axios.get("http://localhost:3001/estadisticas/clientes-nuevos")
                const clients= response.data
                console.log("Datos recibidos:", clients); 

                const formattedData = Object.keys(clients).map(month => ({
                  name: month,
                 "clientes-nuevos": clients[month]
                }));
                setData(formattedData);
                
            } catch (error) {
              console.error("Error al obtener clientes:", error);
            }
        }
        axiosClient();
    },[])


    const formatXAxis = (tickItem) => {
      const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];
      return monthNames[parseInt(tickItem, 10) - 1] || tickItem;
    };
  return (
    
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="4 1 2" />
          <XAxis
          dataKey="name"
          tickFormatter={formatXAxis}
        />
          <YAxis/>
          <Tooltip/>
          <Legend/>
          <Bar dataKey="clientes-nuevos" fill="#6b48ff"/>
          

        </BarChart>
      </ResponsiveContainer>
    
  );
};

export default Stadistics;
