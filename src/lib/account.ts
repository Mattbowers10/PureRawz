export interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  status: "delivered" | "shipped" | "processing" | "cancelled";
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  trackingNumber: string | null;
  shippingMethod: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  joined: string;
  address: {
    street: string;
    apartment: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export const mockUser: UserProfile = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "(555) 123-4567",
  joined: "January 2024",
  address: {
    street: "456 Research Blvd",
    apartment: "Suite 12",
    city: "Austin",
    state: "TX",
    zip: "78701",
    country: "United States",
  },
};

export const mockOrders: Order[] = [
  {
    id: "PR-KX8M2VN",
    date: "2025-03-12",
    status: "delivered",
    items: [
      { productName: "RAD-140 (Testolone)", quantity: 2, price: 49.99 },
      { productName: "MK-677 (Ibutamoren)", quantity: 1, price: 54.99 },
    ],
    subtotal: 154.97,
    shipping: 0,
    total: 154.97,
    trackingNumber: "1Z999AA10123456784",
    shippingMethod: "Standard Shipping",
  },
  {
    id: "PR-JF4N9QR",
    date: "2025-02-28",
    status: "shipped",
    items: [
      { productName: "BPC-157", quantity: 1, price: 39.99 },
      { productName: "TB-500", quantity: 1, price: 49.99 },
      { productName: "Noopept", quantity: 2, price: 24.99 },
    ],
    subtotal: 139.96,
    shipping: 0,
    total: 139.96,
    trackingNumber: "1Z999AA10987654321",
    shippingMethod: "Express Shipping",
  },
  {
    id: "PR-AW7L3DP",
    date: "2025-02-15",
    status: "delivered",
    items: [
      { productName: "LGD-4033 (Ligandrol)", quantity: 1, price: 44.99 },
    ],
    subtotal: 44.99,
    shipping: 7.99,
    total: 52.98,
    trackingNumber: "1Z999AA10567890123",
    shippingMethod: "Standard Shipping",
  },
  {
    id: "PR-BT2K8MX",
    date: "2025-01-20",
    status: "delivered",
    items: [
      { productName: "Alpha GPC", quantity: 3, price: 29.99 },
      { productName: "RAD-140 (Testolone)", quantity: 1, price: 49.99 },
    ],
    subtotal: 139.96,
    shipping: 0,
    total: 139.96,
    trackingNumber: "1Z999AA10345678901",
    shippingMethod: "Standard Shipping",
  },
  {
    id: "PR-QN5R1WZ",
    date: "2025-01-05",
    status: "cancelled",
    items: [
      { productName: "S-4 (Andarine)", quantity: 1, price: 39.99 },
    ],
    subtotal: 39.99,
    shipping: 7.99,
    total: 47.98,
    trackingNumber: null,
    shippingMethod: "Standard Shipping",
  },
];
