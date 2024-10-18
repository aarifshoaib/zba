import { createContext, useEffect, useState } from "react";
import React from "react";

export const AuthContext = createContext({
    user: null,
    isloading: false,
    project: null,
    payCyle: null,
    date: null,
    toggleLoading: (value) => { },
    login: async (payload: any) => { },
    selectedProject: async (payload: any) => { },
    selectedPC: async (payload: any) => { },
    selectedDT: async (payload: any) => { },
    logout: () => { },
    attendance: []
});

function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isloading, setIsLoading] = useState(false);
    const [project, setProject] = useState(null);
    const [payCyle, setPayCyle] = useState(null);
    const [date, setDate] = useState(null);
    const [attendance, setAttendance] = useState([]);

    const login = async (payload: any) => {
        try {
            setUser(payload);
        } catch (error) {
            throw new Error(error);
        }
    };

    const selectedProject = async (project:any) => {
        try {
            console.log('im Called from selectedProject');
            setProject(project);
        } catch (error) {
            throw new Error(error);
        }
    }

    const selectedPC = async (pc:any) => {
        try {
            console.log('im Called from selectedPC');
            setPayCyle(pc);
        } catch (error) {
            throw new Error(error);
        }
    }

    const selectedDT = async (pc:any) => {
        try {
            console.log('im Called from selectedDate', pc);
            setDate(pc);
        } catch (error) {
            throw new Error(error);
        }
    }

    const logout = async () => {
        console.log('im Called from logout');
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
        isloading,
        toggleLoading: (value) => {
            setIsLoading(value);
        },
        project,
        payCyle,
        date,
        attendance,
        selectedProject,
        selectedPC,
        selectedDT
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;


