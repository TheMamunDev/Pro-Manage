'use client';

import { Draggable } from '@hello-pangea/dnd';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock } from 'lucide-react';

interface TaskCardProps {
  task: any;
  index: number;
}

const priorityColors = {
  low: 'bg-slate-100 text-slate-700 hover:bg-slate-100',
  medium: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
  high: 'bg-orange-100 text-orange-700 hover:bg-orange-100',
};

export default function TaskCard({ task, index }: TaskCardProps) {
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
