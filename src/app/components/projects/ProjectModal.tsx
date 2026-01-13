'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Check, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const formSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  members: z.array(z.string()).optional(),
});

export default function CreateProjectModal() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      members: [],
    },
  });

  useEffect(() => {
    if (open) {
      const fetchUsers = async () => {
        setLoadingUsers(true);
        try {
          const res = await fetch('/api/users');
          const data = await res.json();
          setUsers(data);
        } catch (error) {
          console.error('Failed to load users');
        } finally {
          setLoadingUsers(false);
        }
      };
      fetchUsers();
    }
  }, [open]);

  const handleMemberToggle = (
    userId: string,
    currentMembers: string[],
    onChange: any
  ) => {
    if (currentMembers.includes(userId)) {
      onChange(currentMembers.filter(id => id !== userId));
    } else {
      onChange([...currentMembers, userId]);
    }
  };

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Failed to create project');

      toast('Project created successfully!');

      setOpen(false);
      form.reset();
      router.refresh();
    } catch (error) {
      toast('Failed to create project: Something went wrong');
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Start a new workspace for your team.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Website Redesign" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief details about the project..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
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
                              'w-full pl-3 text-left font-normal',
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
                          disabled={date => date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="members"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assign Team Members</FormLabel>
                  <div className="border rounded-md p-2 max-h-[200px] overflow-y-auto space-y-2 bg-muted/10">
                    {loadingUsers ? (
                      <p className="text-sm text-muted-foreground p-2">
                        Loading users...
                      </p>
                    ) : users.length === 0 ? (
                      <p className="text-sm text-muted-foreground p-2">
                        No other users found.
                      </p>
                    ) : (
                      users.map(user => {
                        const isSelected = (field.value || []).includes(
                          user._id
                        );
                        return (
                          <div
                            key={user._id}
                            className={cn(
                              'flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors border',
                              isSelected
                                ? 'bg-primary/10 border-primary'
                                : 'bg-background border-transparent hover:bg-muted'
                            )}
                            onClick={() =>
                              handleMemberToggle(
                                user._id,
                                field.value || [],
                                field.onChange
                              )
                            }
                          >
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={user.image} />
                                <AvatarFallback>
                                  {user.name?.[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col text-left">
                                <span className="text-sm font-medium">
                                  {user.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {user.role}
                                </span>
                              </div>
                            </div>
                            {isSelected && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                {isLoading ? 'Creating...' : 'Create Project'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
