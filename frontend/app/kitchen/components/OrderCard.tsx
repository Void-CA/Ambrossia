import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// OrderCard: visual component that displays a table order.
// Receives props with the table number, optional waiter, time and a list of items.
// Keeps the original design but now renders dynamic data.

type OrderItem = {
  productName: string;
  quantity: number;
  note?: string | null;
};

interface OrderCardProps {
  table: number | string;
  waiter?: string | null;
  time?: string | null;
  items: OrderItem[];
}

function formatTime(dateString?: string | null) {
  if (!dateString) return "--:--";
  try {
    const d = new Date(dateString);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch (e) {
    return dateString;
  }
}

export default function OrderCard({
  table,
  waiter,
  time,
  items,
}: OrderCardProps) {
  return (
    <Card className="w-64 rounded-xl border border-border bg-background shadow-sm">
      <CardHeader className="py-2 px-3 rounded-t-xl bg-muted">
        <CardTitle className="text-base font-semibold text-foreground">
          Mesa {table}
        </CardTitle>
        <div className="text-sm flex justify-between text-muted-foreground">
          <span>{formatTime(time)}</span>
          <p>{waiter ?? "-"}</p>
        </div>
      </CardHeader>
      <CardContent className="px-3 pb-5">
        {items.map((item, idx) => (
          <div key={idx} className={idx === 0 ? "" : "mt-3"}>
            <div className="flex justify-between items-center">
              <span className="font-medium text-foreground">
                {item.quantity} {item.productName}
              </span>
            </div>
            {item.note ? (
              <div className="ml-4 mt-1 text-xs italic text-muted-foreground">
                <p>{item.note}</p>
              </div>
            ) : null}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
