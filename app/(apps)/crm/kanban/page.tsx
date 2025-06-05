import { prisma } from "@/lib/prisma";
import { KanbanBoard } from "@/app/(apps)/crm/components/KanbanBoard";

export default async function PipelinePage() {
  const stages = await prisma.pipeline_stage.findMany({
    orderBy: { position: "asc" },
    include: { deals: true },
  });

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Sales Pipeline</h1>
      <KanbanBoard stages={stages} />
    </div>
  );
}
