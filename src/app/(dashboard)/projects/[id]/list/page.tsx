'use client';

import { useState, useEffect, use } from 'react';
import { format } from 'date-fns';
import {
  Loader2,
  Calendar,
  User as UserIcon,
  ArrowUpDown,
  Search,
  CheckCircle2,
  Circle,
  Clock,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ProjectListPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch(`/api/tasks?projectId=${id}`);
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, [id]);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = filter === 'all' || task.status === filter;
    return matchesSearch && matchesStatus;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 hover:bg-red-100 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200';
      case 'low':
        return 'bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-blue-500" />;
      default:
        return <Circle className="w-4 h-4 text-slate-400" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background/50 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filter tasks..."
              className="pl-8 bg-background"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px] bg-background">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-sm text-muted-foreground">
              Showing {filteredTasks.length} tasks
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table className="hidden md:block">
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[300px]">Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  No tasks found.
                </TableCell>
              </TableRow>
            ) : (
              filteredTasks.map(task => (
                <TableRow
                  key={task._id}
                  className="group cursor-pointer hover:bg-muted/50"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(task.status)}
                      <span
                        className={
                          task.status === 'done'
                            ? 'text-muted-foreground line-through decoration-slate-400'
                            : ''
                        }
                      >
                        {task.title}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="capitalize font-normal text-muted-foreground bg-muted-foreground/10"
                    >
                      {task.status.replace('-', ' ')}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`capitalize ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={task.assignee?.image} />
                        <AvatarFallback className="text-[10px]">
                          {task.assignee?.name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">
                        {task.assignee?.name || 'Unassigned'}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    {task.dueDate ? (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-2 h-3.5 w-3.5" />
                        {format(new Date(task.dueDate), 'MMM d, yyyy')}
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-xs">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className="space-y-4 md:hidden">
          {filteredTasks.map(task => (
            <div
              key={task._id}
              className="rounded-lg border p-4 space-y-3 bg-card"
            >
              <div className="flex items-center gap-2 font-medium">
                {getStatusIcon(task.status)}
                <span>{task.title}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="capitalize">
                  {task.status.replace('-', ' ')}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {task.priority}
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={task.assignee?.image} />
                  <AvatarFallback>{task.assignee?.name?.[0]}</AvatarFallback>
                </Avatar>
                {task.assignee?.name || 'Unassigned'}
              </div>

              {task.dueDate && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="mr-1 h-3.5 w-3.5" />
                  {format(new Date(task.dueDate), 'MMM d, yyyy')}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
