import { Bill } from "./bills";
import { Product } from "./products";
import { Table } from "./tables";

export type OrderStatus = "notCooking" | "cooking" | "ready"| 'Cooking' | 'Ready' | 'NotCooking';

export interface Order {
  id: number;
  table: Table | number | null;
  product: Product | number;
  quantity: number;
  bill: Bill | number | null;
  status: OrderStatus;
  created_at: string;
  closed_at: string | null;
  updated_at: string | null;
  note: string | null;
  waiter?: number | null; // ID del camarero asignado
}

export interface orderItem {
  order: Order;
  product: Product;
  quantity: number;
  note: string | null;
}