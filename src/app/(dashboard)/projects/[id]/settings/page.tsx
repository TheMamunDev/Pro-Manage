'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import {
  Calendar as CalendarIcon,
  Loader2,
  Save,
  Trash2,
  UserPlus,
  Check,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

const projectSettingsSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  status: z.enum(['active', 'completed', 'archived']),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

export default function ProjectSettingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  console.log(id);
  const { data: session } = useSession();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pRes = await fetch(`/api/projects?projectId=${id}`);
        const pListRes = await fetch('/api/projects');
        console.log(pListRes);
        const pList = await pListRes.json();
        const currentProject = pList.find((p: any) => p._id === id);
        console.log(currentProject, 'current project');

        if (!currentProject) throw new Error('Project not found');
        setProject(currentProject);

        const uRes = await fetch('/api/users');
        setAllUsers(await uRes.json());
        form.reset({
          name: currentProject.name,
          description: currentProject.description || '',
          status: currentProject.status,
          startDate: new Date(currentProject.startDate),
          endDate: currentProject.endDate
            ? new Date(currentProject.endDate)
            : undefined,
        });
      } catch (error) {
        toast('Error Loading Project');
        router.push('/projects');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, router]);

  const form = useForm<z.infer<typeof projectSettingsSchema>>({
    resolver: zodResolver(projectSettingsSchema),
  });

  if (session?.user?.role !== 'admin') {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p className="text-muted-foreground">
          Only Admins can manage project settings.
        </p>
      </div>
    );
  }

  const onUpdateDetails = async (
    values: z.infer<typeof projectSettingsSchema>
  ) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error('Failed');

      toast('Project updated');
      router.refresh();
    } catch (error) {
      toast('Error updating project');
    } finally {
      setSaving(false);
    }
  };

  const toggleMember = async (userId: string) => {
    if (!project) return;
    const currentMemberIds = project.members;
    let newMemberIds;
    if (currentMemberIds.includes(userId)) {
      newMemberIds = currentMemberIds.filter((id: string) => id !== userId);
    } else {
      newMemberIds = [...currentMemberIds, userId];
    }

    setProject({ ...project, members: newMemberIds });

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ members: newMemberIds }),
      });

      const data = await res.json();

      toast('Team updated');
      router.refresh();
    } catch (error) {
      setProject({ ...project, members: currentMemberIds });
      toast('Error updating team');
    }
  };

  const onDelete = async () => {
    if (
      !confirm(
        'Are you sure? This will delete the project and ALL its tasks. This cannot be undone.'
      )
    )
      return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed');

      toast('Project deleted');
      router.push('/projects');
    } catch (error) {
      toast('Error deleting project');
    }
  };

  if (loading) return <Skeleton className="w-full h-[400px] rounded-xl" />;

  return (
    <div className="flex flex-col gap-8 pb-10 mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Project Settings</h1>
        <p className="text-muted-foreground">Manage details and team access.</p>
      </div>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
            <CardDescription>
              Update the core details of your project.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onUpdateDetails)}
                className="space-y-6"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={saving}>
                    {saving && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Save Changes
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Team Management</CardTitle>
            <CardDescription>
              Select who has access to this project.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md divide-y max-h-[400px] overflow-y-auto">
              {allUsers.map(user => {
                const isMember = project?.members?.some(
                  (m: any) => m === user._id
                );
                const isOwner = project?.owner._id === user._id;

                return (
                  <div
                    key={user._id}
                    className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={user.image} />
                        <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                      {isOwner && (
                        <Badge variant="secondary" className="ml-2">
                          Owner
                        </Badge>
                      )}
                    </div>

                    <Button
                      size="sm"
                      variant={isMember ? 'outline' : 'default'}
                      disabled={isOwner}
                      onClick={() => toggleMember(user._id)}
                    >
                      {isMember ? (
                        <>
                          <Check className="mr-2 h-4 w-4" /> Member
                        </>
                      ) : (
                        <>
                          <UserPlus className="mr-2 h-4 w-4" /> Add
                        </>
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Danger Zone */}
        <Card className="border-red-200 dark:border-red-900/50 bg-red-50/10">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
            <CardDescription>
              Permanently delete this project and all its associated tasks.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end pt-0">
            <Button variant="destructive" onClick={onDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Project
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
