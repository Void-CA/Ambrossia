export function OrderCard({ order, onClick }: { order: any; onClick?: () => void }) {
  return (
    <div className="border rounded p-4 shadow cursor-pointer" onClick={onClick}>
      <div className="font-bold">Orden #{order.id}</div>
      <div>Estado: {order.status}</div>
      <div>Productos: {order.items?.length}</div>
    </div>
  );
}
