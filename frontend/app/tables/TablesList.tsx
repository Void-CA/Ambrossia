import { useTables } from "@/hooks/api/useTables";
import { useState } from "react";

// Extiende el tipo Table solo para esta vista
type TableWithArea = {
  id: number;
  status: string;
  name?: string;
  area?: string;
};

function TableCard({ table, onClick }: { table: TableWithArea; onClick?: () => void }) {
  return (
    <div
      className="border rounded p-4 shadow cursor-pointer flex flex-col items-center"
      onClick={onClick}
    >
      <div className="font-bold">Mesa #{table.id}</div>
      <div>Estado: {table.status}</div>
      {table.name && <div>Nombre: {table.name}</div>}
      {"area" in table && table.area && <div>Área: {table.area}</div>}
    </div>
  );
}

const PAGE_SIZE = 8;

export default function TablesList({ onSelect }: { onSelect: (table: TableWithArea) => void }) {
  const { data: tables, isLoading } = useTables();
  const [page, setPage] = useState(0);
  const [areaFilter, setAreaFilter] = useState<string>("all");

  if (isLoading) return <div>Cargando mesas...</div>;

  // Filtra solo si existe la propiedad area
  const filtered =
    areaFilter === "all"
      ? tables
      : tables?.filter(table => "area" in table && table.area === areaFilter);

  const paginated = filtered?.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE) ?? [];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2 items-center mb-2">
        <label className="font-medium">Filtrar por área:</label>
        <select
          className="border rounded px-2 py-1"
          value={areaFilter}
          onChange={e => setAreaFilter(e.target.value)}
        >
          <option value="all">Todas</option>
          <option value="terraza">Terraza</option>
          <option value="salón">Salón</option>
          <option value="privado">Privado</option>
        </select>
      </div>
      <div className="flex flex-wrap gap-4">
        {paginated.map(table => (
          <TableCard key={table.id} table={table} onClick={() => onSelect(table)} />
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
