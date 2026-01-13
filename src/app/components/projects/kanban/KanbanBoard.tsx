'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import BoardColumn from './BoardColumn';
import CreateTaskModal from './CreateTaskModal';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

const columns = [
  { id: 'todo', title: 'To Do', color: 'bg-slate-500' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-blue-500' },
  { id: 'done', title: 'Done', color: 'bg-emerald-500' },
];

interface KanbanBoardProps {
  projectId: string;
}

export default function KanbanBoard({ projectId }: KanbanBoardProps) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState('todo');
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch(`/api/tasks?projectId=${projectId}`);
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, [projectId]);

  const onDragEnd = async (result: DropResult) => {
    const newTasks = [...tasks];
    const { destination, source, draggableId } = result;
    if (!destination) return;
    const draggedTask = newTasks.find(t => t._id === draggableId);
    console.log(draggedTask);

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    const assigneeId = draggedTask?.assignee?._id || draggedTask?.assignee;
    const isAssignee = assigneeId === session?.user?.id;
    const isAdmin = session?.user?.role === 'admin';
    if (!isAssignee && !isAdmin) {
      toast('You can only move tasks assigned to you.');
      return;
    }

    if (draggedTask) {
      draggedTask.status = destination.droppableId;
      setTasks(newTasks);
    }

    try {
      await fetch(`/api/tasks/${draggableId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: destination.droppableId }),
      });
    } catch (error) {
      toast('Error updating task status');
    }
  };

  const handleAddClick = (columnId: string) => {
    setSelectedColumn(columnId);
    setIsModalOpen(true);
  };

  const handleTaskCreated = (newTask: any) => {
    setTasks(prev => [newTask, ...prev]);
  };

  if (loading) {
    return <div className="p-6 text-muted-foreground">Loading board...</div>;
  }

  return (
    <div className="h-full overflow-x-auto p-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex h-full gap-6">
          {columns.map(col => {
            const columnTasks = tasks.filter(task => task.status === col.id);
            return (
              <BoardColumn
                key={col.id}
                id={col.id}
                title={col.title}
                color={col.color}
                tasks={columnTasks}
                onAddClick={handleAddClick}
              />
            );
          })}
        </div>
      </DragDropContext>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectId={projectId}
        defaultStatus={selectedColumn}
        onTaskCreated={handleTaskCreated}
      />
    </div>
  );
}
