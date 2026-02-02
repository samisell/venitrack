"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  ListChecks,
  Files,
  CreditCard,
  MessageSquare,
  ClipboardEdit,
} from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/application-form', label: 'Application Form', icon: ClipboardEdit },
  { href: '/application-status', label: 'Application Status', icon: ListChecks },
  { href: '/documents', label: 'Documents', icon: Files },
  { href: '/payments', label: 'Payments', icon: CreditCard },
  { href: '/support', label: 'Support', icon: MessageSquare },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="p-2">
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={item.label}
            >
              <Link href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  );
}
