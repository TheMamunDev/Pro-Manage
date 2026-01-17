import { getServerSession } from 'next-auth';
import { Users, Briefcase, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { authOptions } from '@/app/lib/auth';
import connectDB from '@/app/lib/db';
import Project from '@/app/models/Project';
import Task from '@/app/models/Task';
import User from '@/app/models/User';
import { format } from 'date-fns';

const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  color,
}: any) => {
  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div
          className={`p-2 rounded-lg bg-opacity-10 ${color.bg} ${color.text}`}
        >
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">
          <span
            className={
              trend === 'up'
                ? 'text-emerald-500 font-medium'
                : 'text-rose-500 font-medium'
            }
          >
            {description.split(' ')[0]}
          </span>{' '}
          {description.split(' ').slice(1).join(' ')}
        </p>
      </CardContent>
    </Card>
  );
};

async function getDashboardData() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  await connectDB();
  const userId = session.user.id;

  const [projects, activeTasks, completedTasks, users, recentActivity] =
    await Promise.all([
      Project.countDocuments({ members: userId }),
      Task.countDocuments({
        assignee: userId,
        status: { $in: ['todo', 'in-progress'] },
      }),
      Task.countDocuments({ assignee: userId, status: 'done' }),
      User.countDocuments({}),
      Task.find({ assignee: userId })
        .sort({ updatedAt: -1 })
        .limit(5)
        .populate('projectId', 'name')
        .lean(),
    ]);

  return {
    projects,
    activeTasks,
    completedTasks,
    users,
    recentActivity: JSON.parse(JSON.stringify(recentActivity)),
    user: session.user,
  };
}

export default async function DashboardPage() {
  const data = await getDashboardData();
  if (!data) return null;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome back, {data.user.name}
          </h2>
          <p className="text-muted-foreground">
            Here is an overview of your projects and tasks.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Projects"
          value={data.projects}
          icon={Briefcase}
          trend="up"
          description="Active projects"
          color={{ bg: 'bg-blue-100', text: 'text-blue-600' }}
        />
        <StatCard
          title="Active Tasks"
          value={data.activeTasks}
          icon={Clock}
          trend="up"
          description="Pending tasks"
          color={{ bg: 'bg-amber-100', text: 'text-amber-600' }}
        />
        <StatCard
          title="Completed"
          value={data.completedTasks}
          icon={CheckCircle2}
          trend="up"
          description="Tasks finished"
          color={{ bg: 'bg-emerald-100', text: 'text-emerald-600' }}
        />
        <StatCard
          title="Team Members"
          value={data.users}
          icon={Users}
          trend="up"
          description="Total users"
          color={{ bg: 'bg-violet-100', text: 'text-violet-600' }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-md border-none">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] flex items-center justify-center rounded-lg bg-muted/20 border-2 border-dashed border-muted">
              <span className="text-muted-foreground">
                Chart Component Will Go Here
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 shadow-md border-none">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {data.recentActivity.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No recent activity.
                </p>
              )}
              {data.recentActivity.map((task: any) => (
                <div key={task._id} className="flex items-center">
                  <span className="relative flex h-2 w-2 mr-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {task.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {task.projectId?.name} •{' '}
                      {format(new Date(task.updatedAt), 'MMM d, h:mm a')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
