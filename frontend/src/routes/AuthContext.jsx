import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [roleData, setRoleData] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const authUser = useAuthUser();

    const getRoleData = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/roles/`);
            setRoleData(response.data);
        } catch (err) {
            console.log(err);
        }
    }, [API_URL]);

    useEffect(() => {
        getRoleData();
    }, [getRoleData]);

    useEffect(() => {
        if (authUser) {
            const role_id = authUser.role_id; 
            const findRole = roleData.find((role) => role._id === role_id);
            setPermissions(findRole ? findRole.permissions : []);
        }
    }, [authUser, roleData]);

    const value = {
        permissions,
        refreshPermissions: getRoleData
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
