'use client';

import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

export default function RoadmapPage() {
  const phases = [
    {
      title: 'Phase 1: Foundation',
      status: 'completed',
      date: 'Q1 2024',
      items: [
        'Project setup and architecture',
        'Authentication system (NextAuth)',
        'Database schema design (MongoDB)',
        'Basic UI components (Shadcn UI)',
      ],
    },
    {
      title: 'Phase 2: Core Features',
      status: 'in-progress',
      date: 'Q2 2024',
      items: [
        'Project management (CRUD)',
        'Task management (Kanban board)',
        'Team member invitation system',
        'User roles and permissions',
      ],
    },
    {
      title: 'Phase 3: Advanced Tools',
      status: 'planned',
      date: 'Q3 2024',
      items: [
        'Real-time updates (Socket.io)',
        'File attachments for tasks',
        'Activity logs and notifications',
        'Dark mode support',
      ],
    },
    {
      title: 'Phase 4: Expansion',
      status: 'planned',
      date: 'Q4 2024',
      items: [
        'Mobile application',
        'Third-party integrations (Slack, GitHub)',
        'Advanced reporting and analytics',
        'API for developers',
      ],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Circle className="h-5 w-5 text-slate-300" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight">
              Product Roadmap
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what we have been working on and what is coming next. We are
              building in public to help teams ship faster.
            </p>
          </div>

          <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            {phases.map((phase, index) => (
              <div
                key={index}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  {getStatusIcon(phase.status)}
                </div>
                <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-0 border shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{phase.title}</CardTitle>
                      <Badge
                        variant="outline"
                        className={getStatusColor(phase.status)}
                      >
                        {phase.status}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">
                      {phase.date}
                    </span>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {phase.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
