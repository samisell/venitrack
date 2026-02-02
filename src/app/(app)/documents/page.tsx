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
import { Upload, File, FileCheck, FileX, FileClock, Paperclip } from 'lucide-react';
import { documents } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { Document } from '@/lib/data';

function getStatusIcon(status: Document['status']) {
    switch (status) {
        case 'Approved':
            return <FileCheck className="h-4 w-4 text-green-500" />;
        case 'Rejected':
            return <FileX className="h-4 w-4 text-red-500" />;
        case 'Pending':
            return <FileClock className="h-4 w-4 text-yellow-500" />;
        default:
            return <File className="h-4 w-4 text-muted-foreground" />;
    }
}

function getBadgeVariant(status: Document['status']) {
    switch (status) {
        case 'Approved':
            return 'default';
        case 'Rejected':
        return 'destructive';
        case 'Pending':
            return 'secondary';
        default:
            return 'outline';
    }
}

export default function DocumentsPage() {
  return (
    <div className="space-y-4">
      <h1 className="font-headline text-3xl font-bold tracking-tight">
        Document Management
      </h1>
      <p className="text-muted-foreground">
        Upload and manage your required application documents.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
            <Card>
            <CardHeader>
                <CardTitle>Required Documents</CardTitle>
                <CardDescription>
                Track the status of your documents below. You can replace a document by uploading a new version.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Document Type</TableHead>
                    <TableHead>File Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {documents.map((doc) => (
                    <TableRow key={doc.id}>
                        <TableCell className="font-medium flex items-center gap-2">
                            {getStatusIcon(doc.status)} {doc.type}
                        </TableCell>
                        <TableCell>{doc.name}</TableCell>
                        <TableCell>
                        <Badge variant={getBadgeVariant(doc.status)}>{doc.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                            <Upload className="mr-2 h-4 w-4" />
                            {doc.status === 'Pending' ? 'Upload' : 'Replace'}
                        </Button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </CardContent>
            </Card>
        </div>
        <div>
            <Card className="h-full">
            <CardHeader>
                <CardTitle>Upload New Document</CardTitle>
                <CardDescription>
                    Drag and drop your file here or click to browse.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-border p-8 text-center h-[360px]">
                    <div className="rounded-full border bg-accent/50 p-4">
                        <Paperclip className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">Max file size: 10MB</p>
                    <Button>
                        <Upload className="mr-2 h-4 w-4" />
                        Browse Files
                    </Button>
                </div>
            </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
