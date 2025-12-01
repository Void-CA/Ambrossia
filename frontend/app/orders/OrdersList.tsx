import { useOrders } from "@/hooks/api/useOrders";
import { useState } from "react";

type Order = {
  id: number;
  status: string;
  items?: any[];
};

function OrderCard({ order, onClick }: { order: Order; onClick?: () => void }) {
  return (
    <div className="border rounded p-4 shadow cursor-pointer" onClick={onClick}>
      <div className="font-bold">Orden #{order.id}</div>
      <div>Estado: {order.status}</div>
      <div>Productos: {order.items?.length ?? 0}</div>
    </div>
  );
}

const PAGE_SIZE = 6;

export default function OrdersList({ onSelect }: { onSelect: (order: Order) => void }) {
  const { data: orders, isLoading } = useOrders();
  const [page, setPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  if (isLoading) return <div>Cargando órdenes...</div>;

  const filtered =
    statusFilter === "all"
      ? orders
      : orders?.filter(order => order.status === statusFilter);

  const paginated = filtered?.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE) ?? [];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2 items-center mb-2">
        <label className="font-medium">Filtrar por estado:</label>
        <select
          className="border rounded px-2 py-1"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="all">Todos</option>
          <option value="notCooking">Pendiente</option>
          <option value="cooking">En cocina</option>
          <option value="served">Servida</option>
          <option value="payed">Pagada</option>
        </select>
      </div>
      <div className="grid gap-4">
        {paginated.map(order => (
          <OrderCard key={order.id} order={order} onClick={() => onSelect(order)} />
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        <button
          className="px-3 py-1 rounded bg-muted text-foreground"
          disabled={page === 0}
          onClick={() => setPage(p => Math.max(0, p - 1))}
        >
          Anterior
        </button>
        <button
          className="px-3 py-1 rounded bg-muted text-foreground"
          disabled={paginated.length < PAGE_SIZE}
          onClick={() => setPage(p => p + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
