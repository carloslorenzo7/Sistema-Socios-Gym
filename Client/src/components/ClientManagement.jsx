import React, { useState } from "react";
import SearchClientName from "./SearchClientName";
import ClientList from "./ClientList";

const ClientManagement = () => {
    const [searchedClients, setSearchedClients] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = (clients) => {
        setSearchedClients(clients);
        setIsSearching(true);
    };

    const clearSearch = () => {
        if (isSearching) {
            setSearchedClients([]);
            setIsSearching(false);
        }
    };

    return (
        <div>
            <SearchClientName onSearch={handleSearch} clearSearch={clearSearch} />
            <ClientList clients={searchedClients} isSearching={isSearching} />
        </div>
    );
};

export default ClientManagement;
