export interface User {
  id: number;
  name: string;
  type: "admin" | "waiter" | "chef" | "cashier" | "Admin" | "Waiter" | "Chef" | "Cashier";
}