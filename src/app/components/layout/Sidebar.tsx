'use client';

import { routes } from '@/app/lib/routes';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Session } from 'next-auth';

interface SidebarProps {
  session: Session | null;
}

export default function Sidebar(session: SidebarProps) {
  const pathname = usePathname();
  if (!session) return null;
  const { user } = session.session;

  return (
    <div className="flex h-full flex-col space-y-4 py-4 bg-card text-card-foreground border-r border-border shadow-sm">
      <div className="px-6 py-4 flex-1">
        <Link href="/dashboard" className="flex items-center gap-3 mb-10 pl-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-md">
            <span className="text-primary-foreground font-bold text-lg">P</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            ProManage
          </h1>
        </Link>

        <div className="space-y-2">
          {user.role === 'admin'
            ? routes
                .filter((route) => route.role !== 'member')
                .map((route) => {
                  const isActive = pathname === route.href;
                  return (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={cn(
                        'group flex items-center gap-x-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ease-in-out hover:shadow-sm',
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      <route.icon
                        className={cn(
                          'h-5 w-5 transition-transform group-hover:scale-110',
                          isActive ? 'text-primary-foreground' : route.color
                        )}
                      />
                      <span>{route.label}</span>
                    </Link>
                  );
                })
            : routes
                .filter(route => route.role !== 'admin')
                .map(route => {
                  const isActive = pathname === route.href;
                  return (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={cn(
                        'group flex items-center gap-x-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ease-in-out hover:shadow-sm',
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      <route.icon
                        className={cn(
                          'h-5 w-5 transition-transform group-hover:scale-110',
                          isActive ? 'text-primary-foreground' : route.color
                        )}
                      />
                      <span>{route.label}</span>
                    </Link>
                  );
                })}
        </div>
      </div>
    </div>
  );
}
