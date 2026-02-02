import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export type User = {
  fullName: string;
  email: string;
  phone: string;
  intendedCountry: string;
  intendedCourse: string;
  intakePeriod: string;
  dateOfBirth?: string;
  nationality?: string;
  address?: string;
  counselor: {
    name: string;
    avatar: ImagePlaceholder | undefined;
    whatsapp: string;
  };
  manager: {
    name: string;
    email: string;
  };
};

export type ApplicationStage = {
  name: 'Lead Received' | 'Document Submitted' | 'School Application Sent' | 'Offer Received' | 'Admission Accepted' | 'Visa Processing' | 'Travel Preparation';
  status: 'Completed' | 'In Progress' | 'Pending';
  date: string;
};

export type Document = {
  id: string;
  name: string;
  type: 'Passport' | 'Transcript' | 'SOP' | 'CV' | 'Offer Letter' | 'Visa Document';
  status: 'Pending' | 'Approved' | 'Rejected';
};

export type Payment = {
  id: string;
  type: 'Application Fee' | 'Tuition Deposit' | 'Visa Fee' | 'Service Charge';
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  date: string;
};

export type Message = {
  id: string;
  sender: 'user' | 'counselor';
  text: string;
  timestamp: string;
  avatar: ImagePlaceholder | undefined;
};

export const user: User = {
  fullName: 'Jane Doe',
  email: 'student@example.com',
  phone: '+1 234 567 8900',
  intendedCountry: 'Canada',
  intendedCourse: 'MSc in Computer Science',
  intakePeriod: 'Fall 2024',
  dateOfBirth: '1998-07-15',
  nationality: 'Nigerian',
  address: '123 Main St, Lagos, Nigeria',
  counselor: {
    name: 'Sarah Smith',
    avatar: PlaceHolderImages.find((img) => img.id === 'counselor-avatar'),
    whatsapp: '15551234567',
  },
  manager: {
    name: 'Operations Manager',
    email: 'manager@venitrack.com',
  },
};

export const applicationStages: ApplicationStage[] = [
  { name: 'Lead Received', status: 'Completed', date: '2024-05-01' },
  { name: 'Document Submitted', status: 'Completed', date: '2024-05-05' },
  { name: 'School Application Sent', status: 'Completed', date: '2024-05-10' },
  { name: 'Offer Received', status: 'In Progress', date: '2024-05-25' },
  { name: 'Admission Accepted', status: 'Pending', date: '' },
  { name: 'Visa Processing', status: 'Pending', date: '' },
  { name: 'Travel Preparation', status: 'Pending', date: '' },
];

export const documents: Document[] = [
  { id: 'doc1', name: 'Passport.pdf', type: 'Passport', status: 'Approved' },
  { id: 'doc2', name: 'Academic_Transcript.pdf', type: 'Transcript', status: 'Approved' },
  { id: 'doc3', name: 'Statement_of_Purpose.docx', type: 'SOP', status: 'Rejected' },
  { id: 'doc4', name: 'Curriculum_Vitae.pdf', type: 'CV', status: 'Pending' },
  { id: 'doc5', name: 'Offer_Letter.pdf', type: 'Offer Letter', status: 'Pending' },
];

export const payments: Payment[] = [
  { id: 'pay1', type: 'Application Fee', amount: 150, status: 'Paid', date: '2024-05-02' },
  { id: 'pay2', type: 'Service Charge', amount: 500, status: 'Paid', date: '2024-05-03' },
  { id: 'pay3', type: 'Tuition Deposit', amount: 2000, status: 'Pending', date: '2024-06-15' },
  { id: 'pay4', type: 'Visa Fee', amount: 250, status: 'Overdue', date: '2024-06-01' },
];

export const messages: Message[] = [
    { id: 'msg1', sender: 'counselor', text: 'Hi Jane, welcome to VeniTrack! We have received your initial documents. Please upload your CV as soon as possible.', timestamp: 'Yesterday at 4:30 PM', avatar: user.counselor.avatar },
    { id: 'msg2', sender: 'user', text: 'Hi Sarah, thank you! I will upload my CV by tomorrow.', timestamp: 'Yesterday at 4:35 PM', avatar: undefined },
    { id: 'msg3', sender: 'counselor', text: 'Great! Also, a reminder that your tuition deposit is due soon.', timestamp: 'Today at 9:00 AM', avatar: user.counselor.avatar },
];

export const overview = {
    applicationStatus: 'Offer Received',
    admissionStatus: 'Conditional Offer',
    visaStatus: 'Not Started',
    outstandingPayments: payments.filter(p => p.status === 'Pending' || p.status === 'Overdue').reduce((sum, p) => sum + p.amount, 0),
};
