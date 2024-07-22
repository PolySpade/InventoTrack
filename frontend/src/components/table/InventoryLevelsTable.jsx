import React, { useContext, useMemo } from 'react';
import { DashboardContext } from '../../contexts';

const LOW_STOCK_THRESHOLD = 10;

const InventoryLevelsTable = () => {
  const { inventorydata: products } = useContext(DashboardContext);

  const lowStockProducts = useMemo(() => {
    return products.filter(product => product.stockLeft <= LOW_STOCK_THRESHOLD);
  }, [products]);

  return (
    <div className="overflow-x-auto overflow-y-scroll bg-neutral p-4 rounded-xl h-full">
      <h2 className="text-lg font-bold">Low Stock Inventory (&lt;= 10) </h2>
      <div>
      <table className="table table-pin-rows flex-1">
        <thead>
          <tr className="border-none text-white bg-neutral">
            <th>SKU</th>
            <th>Name</th>
            <th>Stock Quantity</th>
          </tr>
        </thead>
        <tbody>
          {lowStockProducts.map((item, index) => (
            <tr key={index} className="border-none text-white bg-base-content">
              <td>{item.sku}</td>
              <td>{item.name}</td>
              <td>{item.stockLeft}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default InventoryLevelsTable;
