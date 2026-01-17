// c:\Users\User\Desktop\Programming Hero\typescript\pro-manage\src\app\(page)\documentation\page.tsx

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, Code, Layers, Shield, Users } from 'lucide-react';

export default function DocumentationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 py-12 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight">
              Documentation
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about ProManage features and
              architecture.
            </p>
          </div>

          <Tabs defaultValue="getting-started" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-[600px] mx-auto mb-8">
              <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="architecture">Architecture</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
            </TabsList>

            <TabsContent value="getting-started" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="h-5 w-5 text-primary" />
                    Introduction
                  </CardTitle>
                  <CardDescription>
                    Welcome to ProManage, a comprehensive project management
                    tool designed for teams.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    ProManage helps you organize tasks, manage projects, and
                    collaborate with your team efficiently. Whether you are a
                    small startup or a large enterprise, our tools adapt to your
                    workflow.
                  </p>
                  <h3 className="text-lg font-semibold">Key Concepts</h3>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>
                      <strong>Projects:</strong> The top-level container for
                      your work.
                    </li>
                    <li>
                      <strong>Tasks:</strong> Individual units of work that move
                      through statuses.
                    </li>
                    <li>
                      <strong>Kanban Board:</strong> A visual representation of
                      your project's progress.
                    </li>
                    <li>
                      <strong>Team:</strong> Members who can collaborate on
                      projects.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="h-5 w-5 text-blue-500" />
                      Project Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    Create and manage multiple projects. Set start and end
                    dates, assign owners, and track overall status. Switch
                    between List view and Board view for different perspectives.
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-green-500" />
                      Team Collaboration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    Invite members to your team. Assign roles (Admin, Manager,
                    Member) to control access permissions. See who is working on
                    what in real-time.
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-purple-500" />
                      Authentication & Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    Secure login via Email/Password or Google OAuth. Role-based
                    access control ensures data privacy. Protected API routes
                    and server-side validation.
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="architecture" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-orange-500" />
                    Tech Stack
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    ProManage is built with modern web technologies for
                    performance and scalability.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Frontend</h4>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground">
                        <li>Next.js 14 (App Router)</li>
                        <li>React 18</li>
                        <li>Tailwind CSS</li>
                        <li>Shadcn UI</li>
                        <li>Lucide Icons</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Backend</h4>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground">
                        <li>Next.js API Routes</li>
                        <li>MongoDB (Mongoose)</li>
                        <li>NextAuth.js</li>
                        <li>Zod Validation</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Reference</CardTitle>
                  <CardDescription>
                    Overview of the internal API endpoints used by the
                    application.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">
                          GET
                        </span>
                        <code className="text-sm">/api/projects</code>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Fetches all projects accessible to the current user.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">
                          POST
                        </span>
                        <code className="text-sm">/api/tasks</code>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Creates a new task. Requires authentication.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-bold">
                          PATCH
                        </span>
                        <code className="text-sm">/api/tasks/:id</code>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Updates task status or details.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
