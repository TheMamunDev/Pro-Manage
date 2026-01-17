// c:\Users\User\Desktop\Programming Hero\typescript\pro-manage\src\app\(page)\guide\page.tsx

'use client';

import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BookOpen, CheckSquare, Users, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function GuidePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight">
              User Guides
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Step-by-step tutorials to help you get the most out of ProManage.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Quick Start
                </CardTitle>
                <CardDescription>
                  Get up and running in less than 5 minutes.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">1. Create an Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Sign up with your email or use Google for one-click
                    registration.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">2. Create a Project</h3>
                  <p className="text-sm text-muted-foreground">
                    Go to your Dashboard and click "New Project". Give it a name
                    and timeline.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">3. Add Tasks</h3>
                  <p className="text-sm text-muted-foreground">
                    Populate your project board with tasks and assign them to
                    team members.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  Team Management
                </CardTitle>
                <CardDescription>
                  Collaborate effectively with your team.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Inviting Members</h3>
                  <p className="text-sm text-muted-foreground">
                    Admins can invite new members from the "Team" page.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Roles & Permissions</h3>
                  <p className="text-sm text-muted-foreground">
                    Assign roles like Admin, Manager, or Member to control
                    access levels.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-green-500" />
                  Task Mastery
                </CardTitle>
                <CardDescription>
                  Advanced features for task tracking.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Kanban Board</h3>
                  <p className="text-sm text-muted-foreground">
                    Visualize workflow by dragging tasks between To Do, In
                    Progress, and Done.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Priorities</h3>
                  <p className="text-sm text-muted-foreground">
                    Use priority flags (Low, Medium, High) to highlight urgent
                    work.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="flex flex-col bg-muted/30 border-dashed">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-purple-500" />
                  Need more help?
                </CardTitle>
                <CardDescription>
                  Check out our detailed documentation.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-center items-center text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Our documentation covers technical details, API references,
                  and architecture.
                </p>
                <Link href="/documentation">
                  <Button variant="outline">
                    Go to Docs <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
