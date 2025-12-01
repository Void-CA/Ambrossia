export type TableStatus =
  | "available"
  | "Available"
  | "Occupied"
  | "Reserved"
  | "In_Cleaning"
  | "occupied"
  | "reserved"
  | "in_cleaning";

export interface Table {
  id: number;
  status: TableStatus;
}