'use client';

import { Draggable } from '@hello-pangea/dnd';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface TaskCardProps {
  task: any;
  index: number;
  onUpdateStatus: (taskId: string, newStatus: string) => void;
}

const priorityColors = {
  low: 'bg-slate-100 text-slate-700 hover:bg-slate-100',
  medium: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
  high: 'bg-orange-100 text-orange-700 hover:bg-orange-100',
};

const STATUSES = [
  { key: 'todo', label: 'Move to To Do' },
  { key: 'in-progress', label: 'Move to In Progress' },
  { key: 'done', label: 'Move to Done' },
];

export default function TaskCard({
  task,
  index,
  onUpdateStatus,
}: TaskCardProps) {
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-3 ${snapshot.isDragging ? 'opacity-50' : ''}`}
          style={{ ...provided.draggableProps.style }}
        >
          <Card className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow duration-200 border-border/50">
            <CardHeader className="p-3 pb-0 flex flex-row items-center justify-between space-y-0">
              <Badge
                variant="secondary"
                className={`text-[10px] font-semibold px-1.5 py-0 rounded ${
                  priorityColors[
                    task.priority as keyof typeof priorityColors
                  ] || priorityColors.low
                }`}
              >
                {task.priority}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {STATUSES.filter(status => status.key !== task.status).map(
                    status => (
                      <DropdownMenuItem
                        key={status.key}
                        onClick={() => onUpdateStatus(task._id, status.key)}
                      >
                        {status.label}
                      </DropdownMenuItem>
                    )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="p-3 pt-2">
              <p className="text-sm font-medium leading-snug text-foreground mb-3">
                {task.title}
              </p>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center text-[10px] text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>May 24</span>
                </div>

                <Avatar className="h-5 w-5">
                  <AvatarImage src={task.assignee?.image} />
                  <AvatarFallback className="text-[9px]">
                    {task.assignee?.name?.[0] || '?'}
                  </AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
}
