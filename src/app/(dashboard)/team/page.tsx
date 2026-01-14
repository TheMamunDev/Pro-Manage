'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  MoreHorizontal,
  Shield,
  User as UserIcon,
  Mail,
  Loader2,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { toast } from 'sonner';

export default function TeamPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = session?.user?.role === 'admin';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }

      toast('Role updated successfully!');
      setUsers(
        users.map(u => (u._id === userId ? { ...u, role: newRole } : u))
      );
    } catch (error: any) {
      toast('Failed to update user role');
    }
  };

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
          <p className="text-muted-foreground mt-1">
            Manage your team and their permissions.
          </p>
        </div>
        {isAdmin && (
          <Button>
            <Mail className="mr-2 h-4 w-4" /> Invite Member
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user._id}>
                  <TableCell className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.image} />
                      <AvatarFallback>{user.name?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.role === 'admin' ? 'default' : 'secondary'}
                      className="capitalize"
                    >
                      {user.role === 'admin' && (
                        <Shield className="w-3 h-3 mr-1" />
                      )}
                      {user.role === 'member' && (
                        <UserIcon className="w-3 h-3 mr-1" />
                      )}
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {isAdmin && session?.user?.id !== user._id ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => updateUserRole(user._id, 'admin')}
                          >
                            <Shield className="mr-2 h-4 w-4" /> Make Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => updateUserRole(user._id, 'manager')}
                          >
                            <UserIcon className="mr-2 h-4 w-4" /> Make Manager
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => updateUserRole(user._id, 'member')}
                          >
                            <UserIcon className="mr-2 h-4 w-4" /> Make Member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <span className="text-xs text-muted-foreground italic px-3">
                        {session?.user?.id === user._id ? '(You)' : 'View Only'}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
