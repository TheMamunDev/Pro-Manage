import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Layout, Users, Zap } from 'lucide-react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col ">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto">
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className=" px-4 md:px-6 mx-auto relative z-10">
            <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-4">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                v1.0 is now live
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                Manage projects with <br className="hidden sm:inline" />
                <span className="text-primary">speed and clarity.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-[600px] md:text-2xl mt-4">
                The all-in-one platform for agile teams. Track tasks, manage
                sprints, and collaborate in real-time without the clutter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
                <Link href="/register" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full h-12 text-base px-8">
                    Get Started for Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full h-12 text-base px-8"
                  >
                    View Demo
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>14-day free trial</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-0 z-0 h-full w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        </section>

        <section
          id="features"
          className="py-20 bg-muted/30 border-y border-border"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Everything you need to ship faster
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Powerful features designed for modern software teams.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col p-6 bg-card rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4 text-blue-600">
                  <Layout className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Kanban Boards</h3>
                <p className="text-muted-foreground">
                  Visualize your workflow with intuitive drag-and-drop boards.
                  Customize columns to fit your team's unique process.
                </p>
              </div>
              <div className="flex flex-col p-6 bg-card rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4 text-emerald-600">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Sprints & Backlogs</h3>
                <p className="text-muted-foreground">
                  Plan sprints effectively. Move tasks from backlog to active
                  sprints and track velocity automatically.
                </p>
              </div>
              <div className="flex flex-col p-6 bg-card rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-violet-100 flex items-center justify-center mb-4 text-violet-600">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Team Collaboration</h3>
                <p className="text-muted-foreground">
                  Built for teams. Assign roles, comment on tasks, and share
                  files in real-time to keep everyone aligned.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="bg-primary rounded-3xl p-8 md:p-16 text-center text-primary-foreground relative overflow-hidden">
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to transform your workflow?
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-8">
                  Join thousands of teams who use ProManage to ship better
                  software, faster.
                </p>
                <Link href="/register">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="h-12 px-8 text-base font-semibold"
                  >
                    Start Your Free Trial
                  </Button>
                </Link>
              </div>

              <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </section>
      </main>

      <Footer></Footer>
    </div>
  );
}
