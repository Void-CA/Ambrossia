import axios from "@/lib/axios"; // configuración base (baseURL, headers, etc.)
import { Order, OrderStatus} from "@/types/models";
import { Product } from "@/types/models/products";

//Helper functions

function normalizeOrder(raw: any): Order {
  return {
    id: raw.id,
    table: raw.table ?? raw.table_id ?? null,
    product: raw.product ?? raw.product_id ?? null,
    quantity: raw.quantity ?? 1,
    bill: raw.bill ?? raw.bill_id ?? null,
    status: raw.status ?? "notCooking",
    created_at: raw.createdAt ?? raw.created_at ?? "",
    closed_at: raw.closedAt ?? raw.closed_at ?? null,
    updated_at: raw.updatedAt ?? raw.updated_at ?? null,
    note: raw.note ?? "",
    waiter: raw.waiter ?? raw.waiter_id ?? null,
  };
}

function normalizeProduct(raw: any): Product {
  return {
    id: raw.id,
    name: raw.name,
    price: raw.price,
    categoryId: raw.categoryId ?? (raw.category ? raw.category.id : null),
  };
}

// --- API Calls ---

export const getOrders = async (): Promise<Order[]> => {
  const res = await axios.get("/orders/");
  return res.data;
};

export const updateOrderStatus = async (id: number, status: OrderStatus) => {
  const res = await axios.patch(`/orders/${id}/status/`, { status });
  return res.data;
};

export const createOrder = async (orderData: Partial<Order>) => {
  const res = await axios.post("/orders/", orderData);
  return res.data;
};

export const getProducts = async (): Promise<Product[]> => {
  const res = await axios.get("/product/");
  return (res.data as any[]).map(normalizeProduct);
};

export const getProductById = async (id: number): Promise<Product> => {
  const res = await axios.get(`/product/${id}/`);
  return normalizeProduct(res.data);
};

export const getOrdersByTable = async (tableId: number): Promise<Order[]> => {
  const res = await axios.get(`/orders/byTable/${tableId}/`);
  return (res.data as any[]).map(normalizeOrder);
};

export const closeOrdersByTable = async (tableId: number): Promise<void> => {
  await axios.post(`/orders/closeByTable/${tableId}/`);
};

export const assignWaiterToOrder = async (orderId: number, waiterId: number): Promise<Order> => {
  const res = await axios.patch(`/orders/${orderId}/assignWaiter/`, { waiterId });
  return normalizeOrder(res.data);
};

export const getOrdersByStatus = async (status: OrderStatus): Promise<Order[]> => {
  const res = await axios.get(`/orders/byStatus/${status}/`);
  return (res.data as any[]).map(normalizeOrder);
};

export const getAllOrdersDetailedForASingleTable = async (tableId: number): Promise<Order[]> => {
  const res = await axios.get(`/orders/detailed/${tableId}/`);
  return (res.data as any[]).map(normalizeOrder);
};

export const deleteOrder = async (orderId: number): Promise<void> => {
  await axios.delete(`/orders/${orderId}/`);
};

export const updateOrderNote = async (orderId: number, note: string): Promise<Order> => {
  const res = await axios.patch(`/orders/${orderId}/note/`, { note });
  return normalizeOrder(res.data);
};

export const updateOrderQuantity = async (orderId: number, quantity: number): Promise<Order> => {
  const res = await axios.patch(`/orders/${orderId}/quantity/`, { quantity });
  return normalizeOrder(res.data);
};

export const getOrdersByWaiter = async (waiterId: number): Promise<Order[]> => {
  const res = await axios.get(`/orders/byWaiter/${waiterId}/`);
  return (res.data as any[]).map(normalizeOrder);
};

export const reassignOrderToWaiter = async (orderId: number, newWaiterId: number): Promise<Order> => {
  const res = await axios.patch(`/orders/${orderId}/reassignWaiter/`, { newWaiterId });
  return normalizeOrder(res.data);
};

export const getOrdersWithProductDetails = async (): Promise<(Order & { productDetails: Product })[]> => {
  const res = await axios.get("/orders/withProductDetails/");
  return (res.data as any[]).map((item) => ({ ...normalizeOrder(item), productDetails: normalizeProduct(item.productDetails) }));
};

export const createMultipleOrders = async (ordersData: Partial<Order>[]): Promise<Order[]> => {
  const res = await axios.post("/orders/bulkCreate/", { orders: ordersData });
  return (res.data as any[]).map(normalizeOrder);
};
