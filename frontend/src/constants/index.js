import { gameboytest } from "../assets";

export const orders = [
  {
    id: 1,
    products: [
      {
        sku: "GB",
        name: "Product 1",
        quantity: 2,
        price: 230.00
      },
      {
        sku: "GB-01",
        name: "Product 2",
        quantity: 1,
        price: 400.00
      }
    ],
    courierName: "Courier 1",
    trackingNumber: "TRACK12345",
    sellingPlatform: "Shopee",
    buyerName: "John Doe",
    buyerEmail: "john.doe@example.com",
    buyerPhone: "+63 998 012 3456",
    status: "Shipped"
  },
  {
    id: 2,
    products: [
      {
        sku: "GB-02",
        name: "Product 3",
        quantity: 3,
        price: 150.00
      },
      {
        sku: "GB-03",
        name: "Product 4",
        quantity: 2,
        price: 200.00
      }
    ],
    courierName: "Courier 2",
    trackingNumber: "TRACK67890",
    sellingPlatform: "Lazada",
    buyerName: "Jane Smith",
    buyerEmail: "jane.smith@example.com",
    buyerPhone: "+63 987 654 3210",
    status: "Processing"
  },
  {
    id: 3,
    products: [
      {
        sku: "GB-04",
        name: "Product 5",
        quantity: 1,
        price: 300.00
      },
      {
        sku: "GB-05",
        name: "Product 6",
        quantity: 4,
        price: 125.00
      }
    ],
    courierName: "Courier 3",
    trackingNumber: "TRACK11223",
    sellingPlatform: "Facebook",
    buyerName: "Alice Johnson",
    buyerEmail: "alice.johnson@example.com",
    buyerPhone: "+63 956 789 0123",
    status: "Delivered"
  },
  {
    id: 4,
    products: [
      {
        sku: "GB-06",
        name: "Product 7",
        quantity: 2,
        price: 175.00
      },
      {
        sku: "GB-07",
        name: "Product 8",
        quantity: 3,
        price: 225.00
      }
    ],
    courierName: "Courier 4",
    trackingNumber: "TRACK44556",
    sellingPlatform: "Tiktok",
    buyerName: "Bob Williams",
    buyerEmail: "bob.williams@example.com",
    buyerPhone: "+63 945 678 9012",
    status: "Pending"
  },
  {
    id: 5,
    products: [
      {
        sku: "GB-08",
        name: "Product 9",
        quantity: 5,
        price: 100.00
      },
      {
        sku: "GB-09",
        name: "Product 10",
        quantity: 2,
        price: 250.00
      }
    ],
    courierName: "Courier 5",
    trackingNumber: "TRACK77889",
    sellingPlatform: "Others",
    buyerName: "Charlie Brown",
    buyerEmail: "charlie.brown@example.com",
    buyerPhone: "+63 934 567 8901",
    status: "Cancelled"
  }
];


export const courier = [
  {
    id: 1,
    name: 'JT Express'
  },
  {
    id: 2,
    name: 'LEX'
  },
  {
    id: 3,
    name: 'Lalamove'
  },
  {
    id: 4,
    name: 'Grab'
  },
  {
    id: 5,
    name: 'LBC Express'
  },
  {
    id: 6,
    name: 'JRS Express'
  },
  {
    id: 7,
    name: 'DHL Express'
  },
  {
    id: 8,
    name: 'Ninja Van'
  },
  {
    id: 9,
    name: 'GoGo Xpress'
  },
  {
    id: 10,
    name: 'Entrego'
  }
];

export const warehouse = [
  {
    id: 1,
    name: 'Warehouse A'
  },
  {
    id: 2,
    name: 'Warehouse B'
  },
  {
    id: 3,
    name: 'Warehouse C'
  }
];

export const category = [
  {
    id: 1,
    name: 'Electronics'
  },
  {
    id: 2,
    name: 'Fashion'
  },
  {
    id: 3,
    name: 'Home'
  },
  {
    id: 4,
    name: 'Beauty'
  },
  {
    id: 5,
    name: 'Sports'
  },
  {
    id: 6,
    name: 'Gaming Console'
  }
];

export const salesplatform = [
  {
    id: 1,
    name: 'Shopee'
  },
  {
    id: 2,
    name: 'Lazada'
  },
  {
    id: 3,
    name: 'Facebook'
  },
  {
    id: 4,
    name: 'TikTok'
  },
  {
    id: 5,
    name: 'Shopify'
  },
  {
    id: 6,
    name: 'Store'
  },
  {
    id: 7,
    name: 'Others'
  }
];

export const products = [
  {
      sku: 'GB-001',
      name: 'Gameboy Original',
      category_id: 6,
      cost: 59.99,
      weight: 0.3,
      warehouse_id: 1,
      length: 90,
      width: 148,
      height: 32,
      quantity: 150
  },
  {
      sku: 'GB-002',
      name: 'Gameboy Color',
      category_id: 6,
      cost: 69.99,
      weight: 0.2,
      warehouse_id: 2,
      length: 133,
      width: 78,
      height: 27,
      quantity: 200
  },
  {
      sku: 'GB-003',
      name: 'Gameboy Advance',
      category_id: 6,
      cost: 79.99,
      weight: 0.14,
      warehouse_id: 3,
      length: 82,
      width: 144.5,
      height: 24.5,
      quantity: 120
  },
  {
      sku: 'GB-004',
      name: 'Gameboy SP',
      category_id: 6,
      cost: 89.99,
      weight: 0.14,
      warehouse_id: 2,
      length: 84.6,
      width: 82,
      height: 24.3,
      quantity: 100
  },
  {
      sku: 'GB-005',
      name: 'Gameboy Micro',
      category_id: 6,
      cost: 49.99,
      weight: 0.08,
      warehouse_id: 1,
      length: 50,
      width: 101,
      height: 17.2,
      quantity: 80
  }
];


export const expenses = [
  {
      id: 1,
      date: '2024-06-01',
      amount: 199.99,
      currency: 'USD',
      type: 'Purchase',
      description: 'Smartphone'
  },
  {
      id: 2,
      date: '2024-06-02',
      amount: 49.99,
      currency: 'USD',
      type: 'Purchase',
      description: 'Wireless Mouse'
  },
  {
      id: 3,
      date: '2024-06-03',
      amount: 5000.00,
      currency: 'USD',
      type: 'Stock Purchase',
      description: 'New Inventory of Laptops'
  },
  {
      id: 4,
      date: '2024-06-04',
      amount: 300.00,
      currency: 'USD',
      type: 'Ad Expense',
      description: 'Google Ads Campaign'
  },
  {
      id: 5,
      date: '2024-06-05',
      amount: 120.00,
      currency: 'USD',
      type: 'Office Supplies',
      description: 'Printer Ink'
  },
  {
      id: 6,
      date: '2024-06-06',
      amount: 150.00,
      currency: 'USD',
      type: 'Utilities',
      description: 'Electricity Bill'
  },
  {
      id: 7,
      date: '2024-06-07',
      amount: 29.99,
      currency: 'USD',
      type: 'Purchase',
      description: 'Wireless Charger'
  },
  {
      id: 8,
      date: '2024-06-08',
      amount: 10000.00,
      currency: 'USD',
      type: 'Stock Purchase',
      description: 'New Inventory of Smartphones'
  },
  {
      id: 9,
      date: '2024-06-09',
      amount: 500.00,
      currency: 'USD',
      type: 'Ad Expense',
      description: 'Facebook Ads Campaign'
  },
  {
      id: 10,
      date: '2024-06-10',
      amount: 3000.00,
      currency: 'USD',
      type: 'Purchase',
      description: 'Bulk Purchase of Keyboards'
  },
  {
      id: 11,
      date: '2024-06-11',
      amount: 150.00,
      currency: 'USD',
      type: 'Maintenance',
      description: 'Website Hosting'
  },
  {
      id: 12,
      date: '2024-06-12',
      amount: 400.00,
      currency: 'USD',
      type: 'Miscellaneous',
      description: 'Team Lunch'
  }
];

