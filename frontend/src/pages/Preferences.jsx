import React, { useEffect, useState } from "react";
import { PreferencesContext } from "../contexts";
import {
  ArchiveIcon,
  CreditCardIcon,
  FileDirectoryIcon,
  GlobeIcon,
  InboxIcon,
  PersonFillIcon,
  PersonIcon,
  StackIcon,
} from "@primer/octicons-react";
import axios from "axios";
import ExpenseTypeForm from "../components/forms/ExpenseTypeForm";
import CategoryForm from "../components/forms/CategoryForm";
import WarehouseForm from "../components/forms/WarehouseForm";
import CouriersForm from "../components/forms/CouriersForm";
import RoleForm from "../components/forms/RoleForm";
import RecordsHistory from "../components/table/RecordsHistory";
import PlatformsForm from "../components/forms/PlatformsForm";
import AccountsForm from "../components/forms/AccountsForm";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const Preferences = () => {
  const API_URL =process.env.VITE_API_URL;
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [categoryTypes, setCategoryTypes] = useState([]);
  const [courierTypes,setCourierTypes] = useState([]);
  const [expenseForm, setExpenseForm] = useState(false);
  const [categoryForm, setCategoryForm] = useState(false);
  const [warehouseForm, setWarehouseForm] = useState(false);
  const [couriersForm, setCouriersForm] = useState(false);
  const [warehouseTypes, setWarehouseTypes] = useState([]);
  const [roleForm, setRoleForm] = useState(false);
  const [roleTypes, setRoleTypes] = useState([]);
  const [accounts,setAccounts] = useState([]);
  const [histories,setHistories] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [recordsTable, setRecordsTable] = useState(false);
  const [platformsForm, setPlatformsForm] = useState(false);
  const [accountsForm,setAccountsForm] = useState(false);
  const authUser = useAuthUser();
  const [permissions, setPermissions] = useState([]);

  const authHeader = useAuthHeader();
  const headers = {
    Authorization: authHeader,
  };


  const getExpenseTypes = () => {
    axios
      .get(`${API_URL}/expensesTypes/`, { headers })
      .then((response) => {
        setExpenseTypes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getOrdersData = () => {
    axios
      .get(`${API_URL}/orders/`, { headers })
      .then((response) => setOrdersData(response.data))
      .catch((err) => console.log(err));
  };

  const getExpenses = () => {
    axios
      .get(`${API_URL}/expenses/`, { headers })
      .then((response) => {
        setExpensesData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCategory = () => {
    axios
      .get(`${API_URL}/categories/`, { headers })
      .then((response) => {
        setCategoryTypes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getWarehouse = () => {
    axios
      .get(`${API_URL}/warehouses/`, { headers })
      .then((response) => {
        setWarehouseTypes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProducts = () => {
    axios
      .get(`${API_URL}/products/`, { headers })
      .then((response) => setProductsData(response.data))
      .catch((err) => console.log(err));
  };

  const getCouriers = () => {
    axios
      .get(`${API_URL}/couriers/`, { headers })
      .then((response) => setCourierTypes(response.data))
      .catch((err) => console.log(err));
  };

  const getRoles = () => {
    axios
      .get(`${API_URL}/roles/`, { headers })
      .then((response) => {
        setRoleTypes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAccounts = () => {
    axios
      .get(`${API_URL}/accounts/`, { headers })
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getHistory = () => {
    axios
      .get(`${API_URL}/histories/`, { headers })
      .then((response) => {
        setHistories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPlatforms = () => {
    axios
      .get(`${API_URL}/platforms/`, { headers })
      .then((response) => {
        setPlatforms(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const refreshData = () => {
    getExpenseTypes();
    getOrdersData();
    getExpenses();
    getCategory();
    getProducts();
    getWarehouse();
    getCouriers();
    getRoles();
    getAccounts();
    getHistory();
    getPlatforms();
  };

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    if (authUser) {
      const role_id = authUser.role_id;
      const findRole = role_id ? roleTypes.find((role) => role._id === role_id) : null;
      setPermissions(findRole ? findRole.permissions : []);
    }
  }, [authUser, roleTypes]);

  return (
    <PreferencesContext.Provider
      value={{
        warehouseTypes,
        productsData,
        categoryTypes,
        expensesData,
        ordersData,
        expenseTypes,
        courierTypes,
        accounts,
        roleTypes,
        histories,
        platforms,
        refreshData,
      }}
    >
      <div className="overflow-y-hidden flex flex-row justify-center items- h-full">
        <div className="m-10 w-full flex flex-row justify-evenly flex-wrap">
          {permissions.includes('modifyExpensesType') && (
            <button onClick={() => setExpenseForm((prev) => !prev)}>
              <Box icon={<CreditCardIcon size={100} />} text="Expenses" />
            </button>
          )}
          {permissions.includes('modifyProductCategory') && (
            <button onClick={() => setCategoryForm((prev) => !prev)}>
              <Box icon={<ArchiveIcon size={100} />} text="Product Category" />
            </button>
          )}
          {permissions.includes('modifyWarehouses') && (
            <button onClick={() => setWarehouseForm((prev) => !prev)}>
              <Box icon={<InboxIcon size={100} />} text="Warehouse" />
            </button>
          )}
          {permissions.includes('modifyCouriers') && (
            <button onClick={() => setCouriersForm((prev) => !prev)}>
              <Box icon={<GlobeIcon size={100} />} text="Couriers" />
            </button>
          )}
          {permissions.includes('modifyPlatforms') && (
            <button onClick={() => setPlatformsForm((prev) => !prev)}>
              <Box icon={<StackIcon size={100} />} text="Platforms" />
            </button>
          )}
          {permissions.includes('roleManagement') && (
            <button onClick={() => setRoleForm((prev) => !prev)}>
              <Box icon={<PersonIcon size={100} />} text="Roles" />
            </button>
          )}
          {permissions.includes('modifyAccounts') && (
            <button onClick={() => setAccountsForm((prev) => !prev)}>
              <Box icon={<PersonFillIcon size={100} />} text="Accounts" />
            </button>
          )}
          {permissions.includes('recordsHistory') && (
            <button onClick={() => setRecordsTable((prev) => !prev)}>
              <Box icon={<FileDirectoryIcon size={100} />} text="Records History" />
            </button>
          )}
          {expenseForm && (
            <ExpenseTypeForm onClose={() => setExpenseForm(false)} />
          )}
          {categoryForm && (
            <CategoryForm onClose={() => setCategoryForm(false)} />
          )}
          {warehouseForm && (
            <WarehouseForm onClose={() => setWarehouseForm(false)} />
          )}
          {couriersForm && (
            <CouriersForm onClose={() => setCouriersForm(false)} />
          )}
          {roleForm && (
            <RoleForm onClose={() => setRoleForm(false)} />
          )}
          {recordsTable && (
            <RecordsHistory onClose={() => setRecordsTable(false)} />
          )}
          {platformsForm && (
            <PlatformsForm onClose={() => setPlatformsForm(false)} />
          )}
          {accountsForm && (
            <AccountsForm onClose={() => setAccountsForm(false)} />
          )}
        </div>
      </div>
    </PreferencesContext.Provider>
  );
};

const Box = ({ icon, text }) => (
  <div className=" flex items-center flex-col justify-center w-72 h-72 text-white bg-base-content rounded-xl border border-white border-opacity-50 hover:bg-base-100">
    {icon}
    <p className=" text-sm">{text}</p>
  </div>
);

export default Preferences;
