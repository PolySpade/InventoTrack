import { createContext, useEffect, useState } from 'react';
import InventoryTable from '../components/table/InventoryTable';
import axios from "axios";
import { InventoryContext } from '../contexts';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
const Inventory = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [inventorydata, setInventorydata] = useState([]);
  const [warehouse, setWarehouse] = useState([]);
  const [category, setCategory] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const authUser = useAuthUser();
  const [permissions, setPermissions] = useState([]);
  const authHeader = useAuthHeader();
  const headers = {
      Authorization: authHeader,
  };
  
  const getInventoryData = () => {
    axios.get(`${API_URL}/products/`, { headers })
      .then((response) => {
        setInventorydata(response.data);
      }).catch((err) => {
        console.log(err);
      });
  };

  const getWarehouse = () => {
    axios.get(`${API_URL}/warehouses/`, { headers })
      .then((response) => {
        setWarehouse(response.data);
      }).catch((err) => {
        console.log(err);
      });
  };

  const getCategory = () => {
    axios.get(`${API_URL}/categories/`, { headers })
      .then((response) => {
        setCategory(response.data);
      }).catch((err) => {
        console.log(err);
      });
  };

  const getSuppliers = () => {
    axios.get(`${API_URL}/suppliers/`, { headers })
      .then((response) => {
        setSuppliers(response.data);
      }).catch((err) => {
        console.log(err);
      });
  };

  const getRoleData = () => {
    axios.get(`${API_URL}/roles/`, { headers })
      .then((response) => {
        setRoleData(response.data);
      }).catch((err) => {
        console.log(err);
      });
  };

  const refreshData = () => {
    getCategory();
    getInventoryData();
    getWarehouse();
    getSuppliers();
    getRoleData();
  };

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    if (authUser && authUser.role_id) {
      const role_id = authUser.role_id;
      const findRole = role_id ? roleData.find((role) => role._id === role_id) : null;
      setPermissions(findRole ? findRole.permissions : []);
    }
  }, [authUser, roleData]);

  return (
    <InventoryContext.Provider value={{
      refreshData,
      category,
      warehouse,
      inventorydata,
      suppliers,
      authUser,
      roleData,
      permissions
    }}>
      <div className='flex flex-row justify-center items-center'>
        <div className='m-10 w-full'>
          <InventoryTable />
        </div>
      </div>
    </InventoryContext.Provider>
  );
};

export default Inventory;
