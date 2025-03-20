import PropTypes from "prop-types";

const FilterStatusClient = ({ filterState, setFilterState }) => {
    return (
      <select
        value={filterState}
        onChange={(e) => setFilterState(e.target.value)}
        className="w-full sm:w-1/4 mt-2 sm:mt-0 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="todos">Todos</option>
        <option value="activo">Activos</option>
        <option value="vencido">Vencidos</option>
        <option value="sin membresia">Sin membresía</option>
      </select>
    );
  };

  FilterStatusClient.propTypes = {
    filterState: PropTypes.string.isRequired,
    setFilterState: PropTypes.func.isRequired,
  };
  
  export default FilterStatusClient;
  