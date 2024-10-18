import { createContext, useContext, useEffect, useState } from "react";
import React from 'react';
import authContext, { AuthContext } from "../../auth/redux/auth.context";
import { setupInterceptors } from "../../auth/services/axios.interceptor";


export const AppContext = createContext({
    appServices: [],
    appService: {},
    favoriteServices: [],
    addServiceToFavorite: (id: string) => { },
    removeServiceToFavorite: (id: string) => { },
})


function AppContextProvider({ children }) {
    const [appService, setAppService] = useState(null);
    const [appServices, setAppServices] = useState([]);
    const [favoriteServices, setFavoriteServices] = useState([]);
    const authContext = useContext(AuthContext);

  

    const addServiceToFavorite = (id) => {
        if (!favoriteServices.includes(id)) {
            setFavoriteServices([...favoriteServices, id]);
        }

    }

    const removeServiceToFavorite = (id) => {
        const index = favoriteServices.indexOf(id);
        if (index > -1) {
            favoriteServices.splice(index, 1);
        }
        setFavoriteServices([...favoriteServices]);
    }

    const loadLeaveBalance = async () => {
    }

    const loadUnauthorizedLeaev = async () => {

    }

    const value = {
        appServices,
        appService,
        favoriteServices,
        addServiceToFavorite,
        removeServiceToFavorite
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>

}

export default AppContextProvider;