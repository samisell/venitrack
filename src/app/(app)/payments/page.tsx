import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard } from 'lucide-react';
import { payments } from '@/lib/data';
import type { Payment } from '@/lib/data';
import { cn } from '@/lib/utils';

function getBadgeVariant(status: Payment['status']) {
  switch (status) {
    case 'Paid':
      return 'default';
    case 'Overdue':
      return 'destructive';
    case 'Pending':
      return 'secondary';
    default:
      return 'outline';
  }
}

export default function PaymentsPage() {
  const outstandingAmount = payments
    .filter((p) => p.status === 'Pending' || p.status === 'Overdue')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-4">
      <h1 className="font-headline text-3xl font-bold tracking-tight">
        Payments
      </h1>
      <p className="text-muted-foreground">
        View your payment history and outstanding fees.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Payment Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border bg-card-foreground/5 p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Outstanding
              </p>
              <p className="text-2xl font-bold text-destructive">
                ${outstandingAmount.toLocaleString()}
              </p>
            </div>
            {outstandingAmount > 0 && (
              <Button size="lg">
                <CreditCard className="mr-2 h-4 w-4" /> Pay All Outstanding
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>
            A detailed record of all your transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.type}</TableCell>
                  <TableCell>${payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(payment.status)}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {payment.status !== 'Paid' && (
                      <Button variant="outline" size="sm">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Pay Now
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
