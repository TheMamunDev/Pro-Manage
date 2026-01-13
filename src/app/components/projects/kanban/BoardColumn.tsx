'use client';

import { Droppable } from '@hello-pangea/dnd';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';

interface BoardColumnProps {
  id: string;
  title: string;
  tasks: any[];
  color: string;
  onAddClick: (columnId: string) => void;
}

export default function BoardColumn({
  id,
  title,
  tasks,
  color,
  onAddClick,
}: BoardColumnProps) {
  return (
    <div className="flex flex-col w-80 shrink-0 h-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${color}`}></span>
          {title}
          <span className="text-xs text-muted-foreground ml-2 font-normal bg-muted px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 hover:bg-muted/80"
          onClick={() => onAddClick(id)}
        >
          <Plus className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`
              flex-1 rounded-xl p-2 transition-colors duration-200
              ${snapshot.isDraggingOver ? 'bg-muted/50' : 'bg-muted/20'}
            `}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task._id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
