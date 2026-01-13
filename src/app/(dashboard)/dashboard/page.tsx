import { Users, Briefcase, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Dashboard
          </h2>
          <p className="text-muted-foreground">
            Overview of your team's performance.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Projects"
          value="12"
          icon={Briefcase}
          trend="up"
          description="+2 from last month"
          color={{ bg: 'bg-blue-100', text: 'text-blue-600' }}
        />
        <StatCard
          title="Active Tasks"
          value="48"
          icon={Clock}
          trend="up"
          description="+12% from last week"
          color={{ bg: 'bg-amber-100', text: 'text-amber-600' }}
        />
        <StatCard
          title="Completed"
          value="128"
          icon={CheckCircle2}
          trend="up"
          description="+8% completion rate"
          color={{ bg: 'bg-emerald-100', text: 'text-emerald-600' }}
        />
        <StatCard
          title="Team Members"
          value="8"
          icon={Users}
          trend="down"
          description="-1 inactive user"
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
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center">
                  <span className="relative flex h-2 w-2 mr-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Project "Alpha" updated
                    </p>
                    <p className="text-xs text-muted-foreground">
                      2 hours ago by @john_doe
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
