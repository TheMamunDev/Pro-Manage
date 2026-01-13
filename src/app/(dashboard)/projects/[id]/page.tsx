import KanbanBoard from '@/app/components/projects/kanban/KanbanBoard';

export default async function ProjectBoardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="h-full w-full bg-background/50">
      <KanbanBoard projectId={id} />
    </div>
  );
}
