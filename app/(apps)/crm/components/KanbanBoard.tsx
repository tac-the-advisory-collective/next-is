"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { deal, pipeline_stage } from "@/prisma/.generated/prisma";

type StageWithDeals = pipeline_stage & { deals: deal[] };

export function KanbanBoard({ stages }: { stages: StageWithDeals[] }) {
  const [columns, setColumns] = useState<StageWithDeals[]>(stages);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!active || !over || active.id === over.id) return;

    // Find dragged deal and update stage
    const activeDealId = active.id;
    const overStageId = over.id;

    setColumns((prev) => {
      const newColumns = [...prev];
      let movedDeal: deal | null = null;

      // Remove from old stage
      for (const column of newColumns) {
        const index = column.deals.findIndex((d) => d.id === activeDealId);
        if (index !== -1) {
          movedDeal = column.deals.splice(index, 1)[0];
          break;
        }
      }

      if (movedDeal) {
        const target = newColumns.find((c) => c.id === overStageId);
        target?.deals.push({ ...movedDeal, stage_id: overStageId });
      }

      return newColumns;
    });

    // TODO: Also update the DB using a mutation (via API or server action)
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto py-4">
        {columns.map((column) => (
          <div key={column.id} className="w-64 bg-gray-100 rounded-lg shadow-sm">
            <div className="p-3 font-semibold bg-gray-200 rounded-t-lg">{column.name}</div>
            <SortableContext items={column.deals.map((d) => d.id)} strategy={verticalListSortingStrategy}>
              <div className="flex flex-col gap-2 p-2">
                {column.deals.map((deal) => (
                  <SortableDealCard key={deal.id} deal={deal} />
                ))}
              </div>
            </SortableContext>
          </div>
        ))}
      </div>
    </DndContext>
  );
}

function SortableDealCard({ deal }: { deal: deal }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: deal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="p-3 bg-white rounded shadow cursor-move"
    >
      <div className="font-semibold">{deal.title}</div>
      <div className="text-sm text-gray-600">{deal.customer}</div>
      <div className="text-sm text-gray-500">CHF {deal.value.toLocaleString()}</div>
    </div>
  );
}
