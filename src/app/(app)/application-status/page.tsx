import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ApplicationStepper from '@/components/application-stepper';
import { applicationStages } from '@/lib/data';

export default function ApplicationStatusPage() {
  return (
    <div className="space-y-4">
      <h1 className="font-headline text-3xl font-bold tracking-tight">
        Application Status
      </h1>
      <p className="text-muted-foreground">
        A detailed look at your application progress.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Your Application Journey</CardTitle>
          <CardDescription>
            Each stage represents a key milestone. We&apos;ll update the status as we
            complete each step.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-2xl mx-auto">
            <ApplicationStepper stages={applicationStages} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
