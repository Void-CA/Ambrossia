import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import axios from "axios";

type Order = {
  id: number;
  status: string;
  items?: any[];
};

function useUpdateOrderStatus() {
  return useMutation({
    mutationFn: async ({ orderId, status }: { orderId: number; status: string }) => {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_ROOT || "http://localhost:8000"}/orders/${orderId}/status/`,
        { status }
      );
      return res.data;
    },
  });
}

export default function OrderDetail({ order, onClose }: { order: Order; onClose: () => void }) {
  const updateOrderStatus = useUpdateOrderStatus();

  const handleStatusChange = (status: string) => {
    updateOrderStatus.mutate({ orderId: order.id, status });
  };

  return (
    <div className="bg-background rounded-xl shadow p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Detalle de Orden #{order.id}</h2>
      <div className="mb-2">Estado: <span className="font-semibold">{order.status}</span></div>
      <ul className="mb-4">
        {order.items?.map((item, idx) => (
          <li key={idx} className="border-b py-2">
            {item.product?.name} x{item.quantity}
            {item.note && <span className="ml-2 text-xs text-muted-foreground">Nota: {item.note}</span>}
          </li>
        ))}
      </ul>
      <div className="flex gap-2 flex-wrap">
        <Button size="sm" onClick={() => handleStatusChange("cooking")}>Marcar como En cocina</Button>
        <Button size="sm" onClick={() => handleStatusChange("served")}>Marcar como Servida</Button>
        <Button size="sm" onClick={() => handleStatusChange("payed")}>Marcar como Pagada</Button>
        <Button size="sm" variant="outline" onClick={onClose}>Cerrar</Button>
      </div>
    </div>
  );
}
