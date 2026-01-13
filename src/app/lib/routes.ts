import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Settings,
  Users,
} from 'lucide-react';

export const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-sky-500',
  },
  {
    label: 'Projects',
    icon: FolderKanban,
    href: '/projects',
    color: 'text-violet-500',
  },
  {
    label: 'My Tasks',
    icon: CheckSquare,
    href: '/tasks',
    color: 'text-pink-700',
  },
  {
    label: 'Team',
    icon: Users,
    href: '/team',
    color: 'text-orange-700',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
];
