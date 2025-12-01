"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Order } from "@/types/models/orders";
import { Product } from "@/types/models/products";
import { getOrdersByTable, createOrder, getProducts } from "@/services/orderService";

// --- MOCKS ---
const mockProducts: Product[] = [
  { id: 1, name: "Pizza", price: 10, categoryId: 1 },
  { id: 2, name: "Hamburguesa", price: 8, categoryId: 1 },
  { id: 3, name: "Ensalada", price: 6, categoryId: 2 },
];

const mockOrders: Order[] = [
  {
    id: 1,
    table: 1,
    product: 2,
    quantity: 2,
    bill: null,
    status: "notCooking",
    created_at: "2024-06-01T12:00:00Z",
    closed_at: null,
    updated_at: null,
    note: "Sin sal",
    waiter: 1,
  },
  {
    id: 2,
    table: 1,
    product: 3,
    quantity: 1,
    bill: null,
    status: "cooking",
    created_at: "2024-06-01T12:05:00Z",
    closed_at: null,
    updated_at: null,
    note: null,
    waiter: 2,
  },
];

const useMock = false; // Cambia a true para usar mocks

export default function CreateOrderPage() {
  const router = useRouter();
  const params = useParams();
  const tableId = Number(params.tableId);

  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(1);
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (useMock) {
      setOrders(mockOrders.filter(o => o.table === tableId));
      setProducts(mockProducts);
      setLoading(false);
    } else {
      Promise.all([
        getOrdersByTable(tableId),
        getProducts()
      ]).then(([ordersData, productsData]) => {
        setOrders(ordersData);
        setProducts(productsData);
        setLoading(false);
      });
    }
  }, [tableId]);

  const handleCreateOrder = async () => {
    if (useMock) {
      const newOrder: Order = {
        id: orders.length + 1,
        table: tableId,
        product: selectedProduct,
        quantity,
        bill: null,
        status: "notCooking",
        created_at: new Date().toISOString(),
        closed_at: null,
        updated_at: null,
        note,
        waiter: 1,
      };
      setOrders([...orders, newOrder]);
    } else {
      await createOrder({
        table: tableId,
        product: selectedProduct,
        quantity,
        note,
      });
      const updatedOrders = await getOrdersByTable(tableId);
      setOrders(updatedOrders);
    }
    setQuantity(1);
    setNote("");
  };

  if (loading) return <div>Cargando órdenes...</div>;

  return (
    <div>
      <h1>Órdenes para la mesa {tableId}</h1>
      <div>
        <select value={selectedProduct} onChange={e => setSelectedProduct(Number(e.target.value))}>
          {products.map(product => (
            <option key={product.id} value={product.id}>{product.name} (${product.price})</option>
          ))}
        </select>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="Nota"
          value={note}
          onChange={e => setNote(e.target.value)}
        />
        <button onClick={handleCreateOrder}>Agregar orden</button>
      </div>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            Producto: {
              typeof order.product === "number"
                ? products.find(p => p.id === order.product)?.name || order.product
                : typeof order.product === "string"
                  ? order.product
                  : (order.product as Product).name
            }, Cantidad: {order.quantity}, Estado: {order.status}, Nota: {order.note}
          </li>
        ))}
      </ul>
      <button onClick={() => router.push("/tables")}>Volver a mesas</button>
    </div>
  );
}