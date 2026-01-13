'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Settings, Layout, ListTodo, Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CreateTaskModal from './kanban/CreateTaskModal';
import { useSession } from 'next-auth/react';

interface ProjectHeaderProps {
  project: any;
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const baseUrl = `/projects/${project._id}`;
  const isAdmin = session?.user?.role === 'admin';

  const tabs = [
    { label: 'Board', href: baseUrl, icon: Layout },
    { label: 'List', href: `${baseUrl}/list`, icon: ListTodo },
    { label: 'Settings', href: `${baseUrl}/settings`, icon: Settings },
  ];

  const handleTaskCreated = () => {
    router.refresh();
  };

  return (
    <>
      <div className="flex flex-col gap-4 border-b bg-background px-6 pt-6 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
              {project.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {project.name}
              </h1>
              <p className="text-xs text-muted-foreground line-clamp-1 max-w-md">
                {project.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 mr-2">
              <span className="text-xs text-muted-foreground hidden md:inline-block">
                Team:
              </span>
              <div className="flex -space-x-2">
                {project.members?.map((member: any) => (
                  <Avatar
                    key={member._id}
                    className="h-8 w-8 border-2 border-background"
                    title={member.name}
                  >
                    <AvatarImage src={member.image} />
                    <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                      {member.name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>

            {isAdmin && (
              <Button size="sm" onClick={() => setIsTaskModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 mt-4">
          {tabs.map(tab => {
            const isActive = pathname === tab.href;
            return (
              <Link key={tab.href} href={tab.href}>
                <div
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors',
                    isActive
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/20'
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <CreateTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        projectId={project._id}
        projectMembers={project.members}
        onTaskCreated={handleTaskCreated}
        defaultStatus="todo"
      />
    </>
  );
}
