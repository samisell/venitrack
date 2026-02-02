import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { user } from '@/lib/data';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

function ProfileDetail({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold">{value || 'Not set'}</p>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="space-y-4">
      <h1 className="font-headline text-3xl font-bold tracking-tight">
        My Profile
      </h1>
      <p className="text-muted-foreground">
        Your personal and application information.
      </p>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-2xl">
                {user.fullName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user.fullName}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator />
          <h3 className="text-lg font-semibold pt-4">Personal Information</h3>
          <Separator />
          <ProfileDetail label="Full Name" value={user.fullName} />
          <Separator />
          <ProfileDetail label="Email Address" value={user.email} />
          <Separator />
          <ProfileDetail label="Phone Number" value={user.phone} />
          <Separator />
          <ProfileDetail label="Date of Birth" value={user.dateOfBirth} />
          <Separator />
          <ProfileDetail label="Nationality" value={user.nationality} />
          <Separator />
          <ProfileDetail label="Address" value={user.address} />
          <Separator />
          <h3 className="text-lg font-semibold pt-4">Application Details</h3>
          <Separator />
          <ProfileDetail label="Intended Course" value={user.intendedCourse} />
          <Separator />
          <ProfileDetail label="Intended Country" value={user.intendedCountry} />
          <Separator />
          <ProfileDetail label="Intake Period" value={user.intakePeriod} />
        </CardContent>
      </Card>
    </div>
  );
}
