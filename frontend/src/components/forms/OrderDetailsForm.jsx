import React from "react";
import { XIcon, PencilIcon } from "@primer/octicons-react";

const OrderDetailsForm = ({ order }) => {
  return (
    <div
      className={`fixed inset-4 flex items-center justify-end z-50 ${
        onClose ? "hidden" : ""
      }`}
    >
      <div className="fixed inset-0 bg-black opacity-50 z-0"></div>
      <div className="relative bg-neutral bg-opacity-50 text-white rounded-l-lg shadow-lg p-6 z-10 w-full max-w-md h-full">
        <button className="absolute top-2 right-2 text-white">
          <XIcon size={20} />
        </button>
        <h2 className="text-xl font-bold mb-4"># {order.id}</h2>
        <h3 className="text-lg mb-2">Order Details</h3>
        <div className="mb-4">
          <h4 className="text-md font-semibold">Buyer</h4>
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm">{order.buyerName}</p>
              <p className="text-sm">{order.buyerEmail}</p>
              <p className="text-sm">{order.buyerPhone}</p>
            </div>
            <button className="text-white">
              <PencilIcon size={16} />
            </button>
          </div>
        </div>
        <div className="mb-4">
          <h4 className="text-md font-semibold">Products</h4>
          <div className="space-y-2">
            {order.products.map((product, index) => (
              <div
                key={index}
                className="bg-base-100 p-2 rounded flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-semibold">{product.name}</p>
                  <p className="text-xs">SKU: {product.sku}</p>
                  <p className="text-xs">Quantity: {product.quantity}</p>
                  <p className="text-xs">Price: ₱{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h4 className="text-md font-semibold">Tracking Information</h4>
          <p className="text-sm">Courier: {order.courierName}</p>
          <p className="text-sm">Tracking Number: {order.trackingNumber}</p>
        </div>
        <div className="mb-4">
          <h4 className="text-md font-semibold">Selling Platform</h4>
          <p className="text-sm">{order.sellingPlatform}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsForm;
