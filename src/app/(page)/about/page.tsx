import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Target, Heart } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default async function AboutPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar></Navbar>

      <main className="flex-1">
        <section className="py-20 px-6 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            We are building the <br />
            <span className="text-primary">future of work.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ProManage started with a simple idea: Project management shouldn't
            be a project in itself. We empower teams to focus on what really
            matters—shipping great products.
          </p>
        </section>
        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="space-y-3 text-center p-6 bg-background rounded-xl border shadow-sm">
              <div className="mx-auto w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Our Mission</h3>
              <p className="text-muted-foreground">
                To eliminate busywork and help teams achieve their peak
                potential through intuitive tools.
              </p>
            </div>
            <div className="space-y-3 text-center p-6 bg-background rounded-xl border shadow-sm">
              <div className="mx-auto w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Our Team</h3>
              <p className="text-muted-foreground">
                A diverse group of designers, developers, and thinkers
                distributed across the globe.
              </p>
            </div>
            <div className="space-y-3 text-center p-6 bg-background rounded-xl border shadow-sm">
              <div className="mx-auto w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Our Values</h3>
              <p className="text-muted-foreground">
                Transparency, simplicity, and user-centricity are at the core of
                everything we build.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto border rounded-2xl p-8 md:p-12 bg-primary/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">10k+</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Active Users
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">5M+</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Tasks Completed
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground mt-1">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Support
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        © {new Date().getFullYear()} ProManage. Made with ❤️ for builders.
      </footer> */}
      <Footer></Footer>
    </div>
  );
}
