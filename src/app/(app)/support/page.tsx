'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { messages, user } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Send, Mail, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SupportPage() {
  const mailtoLink = `mailto:${user.manager?.email}?subject=Feedback Regarding Counselor: ${user.counselor?.name}&body=Dear ${user.manager?.name},%0D%0A%0D%0AI am writing to provide feedback about my counselor, ${user.counselor?.name}.%0D%0A%0D%0A[Please type your feedback here]%0D%0A%0D%0AThank you,%0D%0A${user.fullName}`;

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Support Center
        </h1>
        <p className="text-muted-foreground">
          Communicate with your assigned counselor, {user.counselor?.name}.
        </p>
      </div>

      <Card className="flex-1 flex flex-col">
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Conversation with {user.counselor?.name}</CardTitle>
            <CardDescription className="mt-1">
              Ask questions or get updates on your application.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {user.counselor?.whatsapp && (
              <Button asChild variant="outline">
                <Link
                  href={`https://wa.me/${user.counselor.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare className="mr-2" />
                  WhatsApp
                </Link>
              </Button>
            )}
            {user.manager?.email && (
              <Button
                asChild
                variant="outline"
                className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Link href={mailtoLink}>
                  <Mail className="mr-2" />
                  Email Manager
                </Link>
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex items-end gap-3',
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.sender === 'counselor' && message.avatar && user.counselor && (
                    <Avatar className="h-8 w-8">
                      <Image
                        src={message.avatar.imageUrl}
                        alt="Counselor"
                        width={32}
                        height={32}
                        data-ai-hint={message.avatar.imageHint}
                      />
                      <AvatarFallback>
                        {user.counselor.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-xs rounded-lg p-3 lg:max-w-md',
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="mt-1 text-xs opacity-70 text-right">
                      {message.timestamp}
                    </p>
                  </div>
                  {message.sender === 'user' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t p-4">
          <div className="relative w-full">
            <Input placeholder="Type your message..." className="pr-12" />
            <Button
              type="submit"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
