import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Activity,
  User as UserIcon,
  FileText,
  CreditCard,
  DollarSign,
  UserCheck,
} from 'lucide-react';
import { user, applicationStages, overview } from '@/lib/data';
import ApplicationStepper from '@/components/application-stepper';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { ProfileUpdateDialog } from '@/components/profile-update-dialog';

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4">
      <h1 className="font-headline text-3xl font-bold tracking-tight">
        Welcome, {user.fullName.split(' ')[0]}!
      </h1>
      <p className="text-muted-foreground">
        Here&apos;s a summary of your study abroad journey.
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Application Status
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.applicationStatus}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Admission Status
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.admissionStatus}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visa Status</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.visaStatus}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Outstanding Payments
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${overview.outstandingPayments.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Application Journey</CardTitle>
            <CardDescription>
              Track your progress from start to finish.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ApplicationStepper stages={applicationStages} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Profile & Counselor</CardTitle>
              <ProfileUpdateDialog />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                Your Information
              </h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">
                    Course:
                  </span>{' '}
                  {user.intendedCourse}
                </p>
                <p>
                  <span className="font-semibold text-foreground">
                    Country:
                  </span>{' '}
                  {user.intendedCountry}
                </p>
                <p>
                  <span className="font-semibold text-foreground">Intake:</span>{' '}
                  {user.intakePeriod}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                Assigned Counselor
              </h3>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                {user.counselor.avatar && (
                  <Avatar className="h-16 w-16">
                    <Image
                      src={user.counselor.avatar.imageUrl}
                      alt={user.counselor.name}
                      width={64}
                      height={64}
                      data-ai-hint={user.counselor.avatar.imageHint}
                    />
                    <AvatarFallback>
                      {user.counselor.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <p className="font-semibold">{user.counselor.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Your guide through the process.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
