'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTheme } from 'next-themes';
import { Loader2, Moon, Sun, Monitor } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  image: z.string().optional(),
});

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const { setTheme, theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: session?.user?.name || '',
      image: session?.user?.image || '',
    },
  });

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    setIsLoading(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error('Failed to update profile');
      await update({
        ...session,
        user: {
          ...session?.user,
          name: values.name,
          image: values.image,
        },
      });

      toast('Profile updated successfully!');
    } catch (error) {
      toast('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            This is how others will see you on the site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20 border-2">
                  <AvatarImage src={form.watch('image') || ''} />
                  <AvatarFallback className="text-lg bg-primary/10 text-primary">
                    {session?.user?.name?.[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-1">
                  <Label>Profile Image URL</Label>
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <p className="text-[10px] text-muted-foreground">
                    (Note: In a production app, we would use file upload here.)
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    value={session?.user?.email || ''}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Email cannot be changed.
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
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
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize the interface theme.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button
              variant={theme === 'light' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setTheme('light')}
            >
              <Sun className="mr-2 h-4 w-4" /> Light
            </Button>
            <Button
              variant={theme === 'dark' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setTheme('dark')}
            >
              <Moon className="mr-2 h-4 w-4" /> Dark
            </Button>
            <Button
              variant={theme === 'system' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setTheme('system')}
            >
              <Monitor className="mr-2 h-4 w-4" /> System
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200 dark:border-red-900">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400">
            Danger Zone
          </CardTitle>
          <CardDescription>
            Irreversible actions for your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-muted-foreground">
                Permanently remove your account and all data.
              </p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
