import { gameboytest } from "../assets";

export const inventory = [
  {
    image: gameboytest,
    sku: "GB-001",
    name: "Gameboy",
    category: "Electronics",
    cost: "$50.00",
    weight: "0.5 lbs",
    warehouse: "Warehouse A",
    length: 5,
    width: 3,
    height: 1,
    quantity: 100,
  },
  {
    image: gameboytest,
    sku: "GB-002",
    name: "Gameboy Color",
    category: "Electronics",
    cost: "$60.00",
    weight: "0.6 lbs",
    warehouse: "Warehouse B",
    length: 5,
    width: 3,
    height: 1,
    quantity: 150,
  },
  {
    image: gameboytest,
    sku: "GB-003",
    name: "Gameboy Advance",
    category: "Electronics",
    cost: "$70.00",
    weight: "0.7 lbs",
    warehouse: "Warehouse C",
    length: 6,
    width: 3.5,
    height: 1.2,
    quantity: 200,
  },
  {
    image: gameboytest,
    sku: "GB-004",
    name: "Gameboy SP",
    category: "Electronics",
    cost: "$80.00",
    weight: "0.8 lbs",
    warehouse: "Warehouse A",
    length: 6,
    width: 3.5,
    height: 1.2,
    quantity: 250,
  },
  {
    image: gameboytest,
    sku: "GB-005",
    name: "Gameboy Micro",
    category: "Electronics",
    cost: "$90.00",
    weight: "0.4 lbs",
    warehouse: "Warehouse B",
    length: 4,
    width: 2,
    height: 0.8,
    quantity: 300,
  },
];


export const orders = [
  {
    id: 1,
    products: [
      {
        name: "Product 1",
        quantity: 2
      },
      {
        name: "Product 2",
        quantity: 1
      }
    ],
    courierName: "Courier 1",
    trackingNumber: "TRACK12345",
    sellingPlatform: "Shopee"
  },
  {
    id: 2,
    products: [
      {
        name: "Product 3",
        quantity: 3
      },
      {
        name: "Product 4",
        quantity: 2
      }
    ],
    courierName: "Courier 2",
    trackingNumber: "TRACK67890",
    sellingPlatform: "Lazada"
  },
  {
    id: 3,
    products: [
      {
        name: "Product 5",
        quantity: 1
      },
      {
        name: "Product 6",
        quantity: 4
      }
    ],
    courierName: "Courier 3",
    trackingNumber: "TRACK11223",
    sellingPlatform: "Facebook"
  },
  {
    id: 4,
    products: [
      {
        name: "Product 7",
        quantity: 2
      },
      {
        name: "Product 8",
        quantity: 3
      }
    ],
    courierName: "Courier 4",
    trackingNumber: "TRACK44556",
    sellingPlatform: "Tiktok"
  },
  {
    id: 5,
    products: [
      {
        name: "Product 9",
        quantity: 5
      },
      {
        name: "Product 10",
        quantity: 2
      }
    ],
    courierName: "Courier 5",
    trackingNumber: "TRACK77889",
    sellingPlatform: "Others"
  }
];
