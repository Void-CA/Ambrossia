import { http, HttpResponse } from "msw";

// Utilidad para generar fechas ISO simples
const now = () => new Date().toISOString();

// Estado en memoria (puedes mutarlo si quieres simular cambios)
let bills = [
  {
    id: 1,
    status: "notPayed",
    createdAt: now(),
    closedAt: null,
    amount: 120,
    IVA: null,
    discount: null,
    total: 120,
  },
  {
    id: 2,
    status: "payed",
    createdAt: now(),
    closedAt: now(),
    amount: 80,
    IVA: 19,
    discount: 5,
    total: 90,
  },
];

let tables = [
  { id: 1, name: "Mesa 1", area: "Salon", status: "FREE" },
  { id: 2, name: "Mesa 2", area: "Salon", status: "BUSY" },
];

let orders = [
  {
    id: 10,
    tableId: 2,
    product: "Café",
    price: 8,
    quantity: 2,
    amount: 16,
    status: "pending",
  },
  {
    id: 11,
    tableId: 2,
    product: "Sandwich",
    price: 20,
    quantity: 1,
    amount: 20,
    status: "in_progress",
  },
];

export const handlers = [
  // Bills
  http.get("*/bills/getNotPayedBills/", () => {
    const notPayed = bills.filter((b) => b.status === "notPayed");
    return HttpResponse.json(notPayed);
  }),
  http.get("*/bills/getPayedBills/", () => {
    const payed = bills.filter((b) => b.status === "payed");
    return HttpResponse.json(payed);
  }),
  http.post("*/bills/createBill/:tableId/", async ({ params }) => {
    const id = bills.length + 1;
    const newBill = {
      id,
      status: "notPayed",
      createdAt: now(),
      closedAt: null,
      amount: 0,
      IVA: null,
      discount: null,
      total: 0,
    };
    bills.push(newBill);
    return HttpResponse.json({ bill: newBill, orders: [] });
  }),
  http.put("*/bills/updateBill/:billId/", async ({ params, request }) => {
    const body = await request.json();
    const billId = Number(params.billId);
    const bill = bills.find((b) => b.id === billId);
    if (!bill)
      return HttpResponse.json({ detail: "Bill not found" }, { status: 404 });
    if (body.IVA !== undefined) bill.IVA = body.IVA;
    if (body.discount !== undefined) bill.discount = body.discount;
    bill.total =
      bill.amount -
      (bill.discount || 0) +
      (bill.IVA ? bill.amount * (bill.IVA / 100) : 0);
    return HttpResponse.json(bill);
  }),
  http.put("*/bills/updateBillStatus/:billId/", async ({ params, request }) => {
    const billId = Number(params.billId);
    const bill = bills.find((b) => b.id === billId);
    if (!bill)
      return HttpResponse.json({ detail: "Bill not found" }, { status: 404 });
    const body = await request.json();
    bill.status = body.status === "payed" ? "payed" : "notPayed";
    if (bill.status === "payed") bill.closedAt = now();
    return HttpResponse.json(bill);
  }),

  // Tables
  http.get("*/api/tables/", () => HttpResponse.json(tables)),
  http.patch("*/api/tables/:id/status/", async ({ params, request }) => {
    const tableId = Number(params.id);
    const body = await request.json();
    const table = tables.find((t) => t.id === tableId);
    if (!table)
      return HttpResponse.json({ detail: "Table not found" }, { status: 404 });
    table.status = body.status || table.status;
    return HttpResponse.json(table);
  }),

  // Orders
  http.get("*/api/orders/", () => HttpResponse.json(orders)),
  http.post("*/api/orders/", async ({ request }) => {
    const body = await request.json();
    const id = orders.length + 10;
    const newOrder = {
      id,
      tableId: body.tableId ?? 1,
      product: body.product ?? "Producto",
      price: body.price ?? 10,
      quantity: body.quantity ?? 1,
      amount: (body.price ?? 10) * (body.quantity ?? 1),
      status: "pending",
    };
    orders.push(newOrder);
    return HttpResponse.json(newOrder, { status: 201 });
  }),
  http.patch("*/api/orders/:id/status/", async ({ params, request }) => {
    const orderId = Number(params.id);
    const order = orders.find((o) => o.id === orderId);
    if (!order)
      return HttpResponse.json({ detail: "Order not found" }, { status: 404 });
    const body = await request.json();
    order.status = body.status || order.status;
    return HttpResponse.json(order);
  }),
];
