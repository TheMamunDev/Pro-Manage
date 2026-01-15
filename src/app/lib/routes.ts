import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Settings,
  Users,
} from 'lucide-react';

interface Route {
  href: string;
  label: string;
  role: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export const routes: Route[] = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-sky-500',
    role: 'all',
  },
  {
    label: 'Projects',
    icon: FolderKanban,
    href: '/projects',
    color: 'text-violet-500',
    role: 'all',
  },
  {
    label: 'My Tasks',
    icon: CheckSquare,
    href: '/tasks',
    color: 'text-pink-700',
    role: 'member',
  },
  {
    label: 'Team Manegment',
    icon: Users,
    href: '/team',
    color: 'text-orange-700',
    role: 'admin',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
    color: 'text-lime-400',
    role: 'all',
  },
];
