import { getServerSession } from 'next-auth';

import { format } from 'date-fns';
import Link from 'next/link';
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { authOptions } from '@/app/lib/auth';
import connectDB from '@/app/lib/db';
import Task from '@/app/models/Task';

async function getMyTasks() {
  const session = await getServerSession(authOptions);
  if (!session) return [];

  await connectDB();

  const tasks = await Task.find({ assignee: session.user.id })
    .populate('projectId', 'name')
    .sort({ dueDate: 1, createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(tasks));
}

export default async function MyTasksPage() {
  const tasks = await getMyTasks();
  const todoTasks = tasks.filter(
    (t: any) => t.status === 'todo' || t.status === 'backlog'
  );
  const inProgressTasks = tasks.filter((t: any) => t.status === 'in-progress');
  const doneTasks = tasks.filter((t: any) => t.status === 'done');

  return (
    <div className="flex flex-col gap-8">
      <div className="border-b pb-6">
        <h1 className="text-3xl font-bold tracking-tight">My Tasks</h1>
        <p className="text-muted-foreground mt-1">
          You have {todoTasks.length + inProgressTasks.length} active tasks.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg flex items-center">
            <Circle className="h-5 w-5 mr-2 text-slate-500" />
            To Do
          </h2>
          {todoTasks.length === 0 && (
            <p className="text-sm text-muted-foreground">No pending tasks.</p>
          )}
          {todoTasks.map((task: any) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg flex items-center">
            <Clock className="h-5 w-5 mr-2 text-blue-500" />
            In Progress
          </h2>
          {inProgressTasks.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Nothing in progress.
            </p>
          )}
          {inProgressTasks.map((task: any) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg flex items-center">
            <CheckCircle2 className="h-5 w-5 mr-2 text-emerald-500" />
            Completed
          </h2>
          {doneTasks.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No completed tasks yet.
            </p>
          )}
          {doneTasks.map((task: any) => (
            <TaskItem key={task._id} task={task} isDone />
          ))}
        </div>
      </div>
    </div>
  );
}

function TaskItem({ task, isDone }: { task: any; isDone?: boolean }) {
  const priorityColor = {
    low: 'bg-slate-100 text-slate-700',
    medium: 'bg-orange-100 text-orange-700',
    high: 'bg-red-100 text-red-700',
  };

  return (
    <Link href={`/projects/${task.projectId._id}`}>
      <Card
        className={`hover:shadow-md transition-all duration-200 cursor-pointer ${
          isDone ? 'opacity-60 bg-muted/40' : ''
        }`}
      >
        <CardHeader className="p-4 pb-2 space-y-0">
          <div className="flex justify-between items-start">
            <Badge
              variant="outline"
              className="text-[10px] font-normal text-muted-foreground"
            >
              {task.projectId.name}
            </Badge>
            <Badge
              variant="secondary"
              className={`text-[10px] font-semibold px-1.5 py-0 rounded ${
                priorityColor[task.priority as keyof typeof priorityColor]
              }`}
            >
              {task.priority}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <h3
            className={`font-medium text-sm leading-snug ${
              isDone ? 'line-through text-muted-foreground' : ''
            }`}
          >
            {task.title}
          </h3>

          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <div className="flex items-center">
              {task.dueDate && (
                <>
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {format(new Date(task.dueDate), 'MMM d')}
                </>
              )}
            </div>
            <Avatar className="h-5 w-5">
              <AvatarFallback className="text-[9px] bg-primary/10 text-primary">
                Me
              </AvatarFallback>
            </Avatar>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
