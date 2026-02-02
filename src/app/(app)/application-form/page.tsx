'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Upload } from 'lucide-react';
import { Label } from '@/components/ui/label';

const applicationFormSchema = z.object({
    // Personal Info
    firstName: z.string().min(1, 'First name is required'),
    middleName: z.string().optional(),
    lastName: z.string().min(1, 'Last name is required'),
    gender: z.string().min(1, 'Gender is required'),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    nationality: z.string().min(1, 'Nationality is required'),
    countryOfResidence: z.string().min(1, 'Country of residence is required'),
    maritalStatus: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().min(1, 'Phone number is required'),
    alternativePhone: z.string().optional(),

    // Passport
    passportType: z.string().optional(),
    passportNumber: z.string().min(1, 'Passport number is required'),
    passportIssuingCountry: z.string().min(1, 'Issuing country is required'),
    passportIssueDate: z.string().min(1, 'Issue date is required'),
    passportExpiryDate: z.string().min(1, 'Expiry date is required'),
    hasValidPassport: z.string().min(1, 'This field is required'),

    // Study Preferences
    intendedCountry: z.string().min(1, 'Intended country is required'),
    preferredInstitution: z.string().optional(),
    levelOfStudy: z.string().min(1, 'Level of study is required'),
    intendedCourse: z.string().min(1, 'Intended course is required'),
    intakePeriod: z.string().min(1, 'Intake period is required'),
    modeOfStudy: z.string().optional(),
    appliedBefore: z.string().optional(),
    appliedBeforeDetails: z.string().optional(),

    // Academic Background
    highestQualification: z.string().min(1, 'Qualification is required'),
    institution: z.string().min(1, 'Institution is required'),
    countryOfStudy: z.string().min(1, 'Country of study is required'),
    studyStartDate: z.string().min(1, 'Start date is required'),
    studyEndDate: z.string().min(1, 'End date is required'),
    grade: z.string().min(1, 'Grade is required'),
    mediumOfInstruction: z.string().optional(),
    graduated: z.string().optional(),

    // English Proficiency
    isFirstLanguageEnglish: z.string().optional(),
    hasEnglishTest: z.string().optional(),
    testScore: z.string().optional(),
    testDate: z.string().optional(),
    planToTakeTest: z.string().optional(),

    // Work Experience
    employerName: z.string().optional(),
    jobTitle: z.string().optional(),
    industry: z.string().optional(),
    workStartDate: z.string().optional(),
    workEndDate: z.string().optional(),
    jobDescription: z.string().optional(),

    // Financial Info
    primarySponsor: z.string().min(1, 'Primary sponsor is required'),
    sponsorFullName: z.string().min(1, 'Sponsor name is required'),
    sponsorRelationship: z.string().min(1, 'Sponsor relationship is required'),
    estimatedBudget: z.string().optional(),
    hasProofOfFunds: z.string().optional(),
    paymentPlan: z.string().optional(),

    // Statement & Intent
    hasSOP: z.string().optional(),
    studyReason: z.string().optional(),
    careerGoals: z.string().optional(),
    visaRefusals: z.string().optional(),
    visaRefusalDetails: z.string().optional(),

    // Medical
    medicalCondition: z.string().optional(),
    criminalRecord: z.string().optional(),
    willingToUndergoMedicalTests: z.string().optional(),

    // Additional Info
    specialNeeds: z.string().optional(),
    counselorNotes: z.string().optional(),

    // Declaration
    confirmAccuracy: z.boolean().refine(val => val === true, { message: 'You must confirm the accuracy of the information.' }),
    authorizeProcessing: z.boolean().refine(val => val === true, { message: 'You must authorize processing.' }),
    consentToCommunication: z.boolean().refine(val => val === true, { message: 'You must consent to communication.' }),
});

type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

const FileUploadButton = ({ label }: { label: string }) => (
    <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-2 border-dashed"
    >
        <Upload className="h-4 w-4" />
        <span>{label}</span>
    </Button>
);


export default function ApplicationFormPage() {
    const { toast } = useToast();
    const form = useForm<ApplicationFormValues>({
        resolver: zodResolver(applicationFormSchema),
        defaultValues: {
            email: 'student@example.com',
            firstName: '',
            lastName: '',
            middleName: '',
            alternativePhone: '',
            appliedBeforeDetails: '',
            careerGoals: '',
            confirmAccuracy: false,
            authorizeProcessing: false,
            consentToCommunication: false,
        },
    });

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const subscription = form.watch((values) => {
            const totalFields = Object.keys(applicationFormSchema.shape).length;
            let filledFields = 0;
            for (const key in values) {
                const value = values[key as keyof ApplicationFormValues];
                if (value && value !== '' && value !== false) {
                    filledFields++;
                }
            }
            setProgress((filledFields / totalFields) * 100);
        });
        return () => subscription.unsubscribe();
    }, [form]);


    function onSubmit(values: ApplicationFormValues) {
        console.log(values);
        toast({
            title: 'Application Submitted!',
            description: 'Your application has been received successfully.',
        });
    }

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h1 className="font-headline text-3xl font-bold tracking-tight">
                    Study Abroad Application Form
                </h1>
                <p className="text-muted-foreground">
                    Complete all sections to submit your application.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Application Progress</CardTitle>
                    <div className="flex items-center gap-4 pt-2">
                        <Progress value={progress} className="w-full" />
                        <span className="text-sm font-semibold text-muted-foreground">{Math.round(progress)}%</span>
                    </div>
                </CardHeader>
            </Card>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <Card>
                        <CardHeader>
                            <CardTitle>Section 1: Personal Information</CardTitle>
                            <CardDescription>Enter your details as they appear on your official documents.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6 md:grid-cols-2">
                            <FormField control={form.control} name="firstName" render={({ field }) => (<FormItem> <FormLabel>First Name *</FormLabel> <FormControl> <Input placeholder="Jane" {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="middleName" render={({ field }) => (<FormItem> <FormLabel>Middle Name</FormLabel> <FormControl> <Input {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="lastName" render={({ field }) => (<FormItem> <FormLabel>Last Name *</FormLabel> <FormControl> <Input placeholder="Doe" {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="gender" render={({ field }) => (<FormItem> <FormLabel>Gender *</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl> <SelectTrigger> <SelectValue placeholder="Select gender" /> </SelectTrigger> </FormControl> <SelectContent> <SelectItem value="male">Male</SelectItem> <SelectItem value="female">Female</SelectItem> <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem> </SelectContent> </Select> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="dateOfBirth" render={({ field }) => (<FormItem> <FormLabel>Date of Birth *</FormLabel> <FormControl> <Input type="date" {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="nationality" render={({ field }) => (<FormItem> <FormLabel>Nationality *</FormLabel> <FormControl> <Input placeholder="Your nationality" {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="countryOfResidence" render={({ field }) => (<FormItem> <FormLabel>Country of Residence *</FormLabel> <FormControl> <Input placeholder="Country you live in" {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="maritalStatus" render={({ field }) => (<FormItem> <FormLabel>Marital Status</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl> <SelectTrigger> <SelectValue placeholder="Select marital status" /> </SelectTrigger> </FormControl> <SelectContent> <SelectItem value="single">Single</SelectItem> <SelectItem value="married">Married</SelectItem> <SelectItem value="divorced">Divorced</SelectItem> <SelectItem value="widowed">Widowed</SelectItem> </SelectContent> </Select> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="email" render={({ field }) => (<FormItem> <FormLabel>Email Address</FormLabel> <FormControl> <Input type="email" readOnly placeholder="student@example.com" {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="phone" render={({ field }) => (<FormItem> <FormLabel>Phone Number *</FormLabel> <FormControl> <Input placeholder="+1 234 567 8900" {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="alternativePhone" render={({ field }) => (<FormItem> <FormLabel>Alternative Phone Number</FormLabel> <FormControl> <Input placeholder="+1 234 567 8901" {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Section 2: Passport & Identification</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="hasValidPassport"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Do you currently have a valid passport? *</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-4"
                                            >
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="yes" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Yes</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="no" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">No</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="passportType"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Passport Type</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-4"
                                            >
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="international" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">International</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="ordinary" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Ordinary</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField control={form.control} name="passportNumber" render={({ field }) => (<FormItem> <FormLabel>Passport Number *</FormLabel> <FormControl> <Input {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="passportIssuingCountry" render={({ field }) => (<FormItem> <FormLabel>Passport Issuing Country *</FormLabel> <FormControl> <Input {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="passportIssueDate" render={({ field }) => (<FormItem> <FormLabel>Passport Issue Date *</FormLabel> <FormControl> <Input type="date" {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="passportExpiryDate" render={({ field }) => (<FormItem> <FormLabel>Passport Expiry Date *</FormLabel> <FormControl> <Input type="date" {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <div className="md:col-span-2">

                                <FileUploadButton label="Passport Data Page (PDF/JPG) *" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Section 3: Study Preferences</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6 md:grid-cols-2">
                            <FormField control={form.control} name="intendedCountry" render={({ field }) => (<FormItem> <FormLabel>Intended Country/Countries of Study *</FormLabel> <FormControl> <Input placeholder="e.g., Canada, USA" {...field} /> </FormControl> <FormDescription>You can list multiple countries, separated by commas.</FormDescription> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="preferredInstitution" render={({ field }) => (<FormItem> <FormLabel>Preferred Institution(s)</FormLabel> <FormControl> <Input placeholder="e.g., University of Toronto" {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="levelOfStudy" render={({ field }) => (<FormItem> <FormLabel>Intended Level of Study *</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl> <SelectTrigger> <SelectValue placeholder="Select a level" /> </SelectTrigger> </FormControl> <SelectContent> <SelectItem value="foundation">Foundation</SelectItem> <SelectItem value="diploma">Diploma</SelectItem> <SelectItem value="bachelor">Bachelor’s Degree</SelectItem> <SelectItem value="postgraduate-diploma">Postgraduate Diploma</SelectItem> <SelectItem value="master">Master’s Degree</SelectItem> <SelectItem value="phd">PhD</SelectItem> </SelectContent> </Select> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="intendedCourse" render={({ field }) => (<FormItem> <FormLabel>Intended Course / Program *</FormLabel> <FormControl> <Input placeholder="e.g., MSc in Computer Science" {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="intakePeriod" render={({ field }) => (<FormItem> <FormLabel>Intake Period *</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl> <SelectTrigger> <SelectValue placeholder="Select an intake" /> </SelectTrigger> </FormControl> <SelectContent> <SelectItem value="jan">Jan</SelectItem> <SelectItem value="may">May</SelectItem> <SelectItem value="sept">Sept</SelectItem> <SelectItem value="other">Other</SelectItem> </SelectContent> </Select> <FormMessage /> </FormItem>)} />
                            <FormField
                                control={form.control}
                                name="modeOfStudy"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Mode of Study</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-4"
                                            >
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="full-time" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Full-time</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="part-time" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Part-time</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="appliedBefore"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Have you applied to any school before?</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-4"
                                            >
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="yes" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Yes</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="no" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">No</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField control={form.control} name="appliedBeforeDetails" render={({ field }) => (<FormItem className="md:col-span-2"> <FormLabel>If yes, list schools and outcomes</FormLabel> <FormControl> <Textarea placeholder="e.g., McGill University - Admitted, University of British Columbia - Pending" {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Section 4: Academic Background</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6 md:grid-cols-2">
                            <FormField control={form.control} name="highestQualification" render={({ field }) => (<FormItem> <FormLabel>Highest Qualification Obtained *</FormLabel> <FormControl> <Input placeholder="e.g., Bachelor of Science" {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="institution" render={({ field }) => (<FormItem> <FormLabel>Institution Name *</FormLabel> <FormControl> <Input placeholder="e.g., University of Lagos" {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="countryOfStudy" render={({ field }) => (<FormItem> <FormLabel>Country of Study *</FormLabel> <FormControl> <Input placeholder="e.g., Nigeria" {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="grade" render={({ field }) => (<FormItem> <FormLabel>Grade / GPA / Class of Degree *</FormLabel> <FormControl> <Input placeholder="e.g., 4.5/5.0, First Class" {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="studyStartDate" render={({ field }) => (<FormItem> <FormLabel>Start Date *</FormLabel> <FormControl> <Input type="date" {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="studyEndDate" render={({ field }) => (<FormItem> <FormLabel>End Date *</FormLabel> <FormControl> <Input type="date" {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField
                                control={form.control}
                                name="mediumOfInstruction"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Medium of Instruction</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-4"
                                            >
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="english" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">English</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="other" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Other</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="graduated"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Have you graduated?</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-4"
                                            >
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="yes" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Yes</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="no" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">No</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="space-y-2"><FileUploadButton label="Academic Certificates *" /></div>
                            <div className="space-y-2"><FileUploadButton label="Academic Transcripts *" /></div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Section 5: English Language Proficiency</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="isFirstLanguageEnglish"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Is English your first language?</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-4"
                                            >
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="yes" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Yes</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="no" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">No</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField control={form.control} name="hasEnglishTest" render={({ field }) => (<FormItem> <FormLabel>Have you taken an English proficiency test?</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl> <SelectTrigger> <SelectValue placeholder="Select a test" /> </SelectTrigger> </FormControl> <SelectContent> <SelectItem value="ielts">IELTS</SelectItem> <SelectItem value="toefl">TOEFL</SelectItem> <SelectItem value="pte">PTE</SelectItem> <SelectItem value="duolingo">Duolingo</SelectItem> <SelectItem value="none">None</SelectItem> </SelectContent> </Select> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="testScore" render={({ field }) => (<FormItem> <FormLabel>Test Score</FormLabel> <FormControl> <Input placeholder="e.g., 7.5" {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="testDate" render={({ field }) => (<FormItem> <FormLabel>Test Date</FormLabel> <FormControl> <Input type="date" {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField
                                control={form.control}
                                name="planToTakeTest"
                                render={({ field }) => (
                                    <FormItem className="space-y-3 md:col-span-2">
                                        <FormLabel>Do you plan to take an English test?</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-4"
                                            >
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="yes" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Yes</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="no" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">No</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="space-y-2 md:col-span-2"><Label>English Test Result</Label><FileUploadButton label="Upload Test Result" /></div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Section 6: Work Experience</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6 md:grid-cols-2">
                            <FormField control={form.control} name="employerName" render={({ field }) => (<FormItem> <FormLabel>Employer Name</FormLabel> <FormControl> <Input {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="jobTitle" render={({ field }) => (<FormItem> <FormLabel>Job Title</FormLabel> <FormControl> <Input {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="industry" render={({ field }) => (<FormItem> <FormLabel>Industry</FormLabel> <FormControl> <Input {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="jobDescription" render={({ field }) => (<FormItem className="md:col-span-2"> <FormLabel>Job Description</FormLabel> <FormControl> <Textarea {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="workStartDate" render={({ field }) => (<FormItem> <FormLabel>Start Date</FormLabel> <FormControl> <Input type="date" {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="workEndDate" render={({ field }) => (<FormItem> <FormLabel>End Date</FormLabel> <FormControl> <Input type="date" {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <div className="space-y-2"><Label>CV / Resume</Label><FileUploadButton label="Upload CV" /></div>
                            <div className="space-y-2"><Label>Reference Letter(s)</Label><FileUploadButton label="Upload References" /></div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Section 7: Financial Information</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6 md:grid-cols-2">
                            <FormField control={form.control} name="primarySponsor" render={({ field }) => (<FormItem> <FormLabel>Primary Sponsor *</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl> <SelectTrigger> <SelectValue placeholder="Select a sponsor" /> </SelectTrigger> </FormControl> <SelectContent> <SelectItem value="self">Self</SelectItem> <SelectItem value="parent">Parent</SelectItem> <SelectItem value="guardian">Guardian</SelectItem> <SelectItem value="company">Company</SelectItem> </SelectContent> </Select> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="sponsorFullName" render={({ field }) => (<FormItem> <FormLabel>Sponsor Full Name *</FormLabel> <FormControl> <Input {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="sponsorRelationship" render={({ field }) => (<FormItem> <FormLabel>Sponsor Relationship *</FormLabel> <FormControl> <Input {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="estimatedBudget" render={({ field }) => (<FormItem> <FormLabel>Estimated Budget (USD)</FormLabel> <FormControl> <Input type="number" placeholder="e.g., 50000" {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField
                                control={form.control}
                                name="hasProofOfFunds"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Do you have access to proof of funds?</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-4"
                                            >
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="yes" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Yes</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="no" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">No</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="paymentPlan"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Preferred Tuition Payment Plan</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-4"
                                            >
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="full" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Full</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="installment" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Installment</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="space-y-2"><Label>Bank Statement</Label><FileUploadButton label="Upload Bank Statement" /></div>
                            <div className="space-y-2"><Label>Sponsor Letter</Label><FileUploadButton label="Upload Sponsor Letter" /></div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Section 8: Statement & Intent</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6 md:grid-cols-1">
                            <FormField
                                control={form.control}
                                name="hasSOP"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Do you already have a Statement of Purpose (SOP)?</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-4"
                                            >
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="yes" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Yes</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="no" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">No</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField control={form.control} name="studyReason" render={({ field }) => (<FormItem> <FormLabel>Why do you want to study this course and country?</FormLabel> <FormControl> <Textarea rows={4} {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="careerGoals" render={({ field }) => (<FormItem> <FormLabel>Career goals after graduation</FormLabel> <FormControl> <Textarea rows={4} {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField
                                control={form.control}
                                name="visaRefusals"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Any previous visa refusals?</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-4"
                                            >
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="yes" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Yes</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="no" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">No</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField control={form.control} name="visaRefusalDetails" render={({ field }) => (<FormItem> <FormLabel>If yes, explain briefly</FormLabel> <FormControl> <Textarea {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2"><Label>Statement of Purpose (SOP)</Label><FileUploadButton label="Upload SOP" /></div>
                                <div className="space-y-2"><Label>Motivation Letter</Label><FileUploadButton label="Upload Motivation Letter" /></div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Section 9: Medical & Background</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6 md:grid-cols-1">
                            <FormField
                                control={form.control}
                                name="medicalCondition"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Any known medical condition?</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-4"
                                            >
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="yes" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Yes</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="no" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">No</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="criminalRecord"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Any criminal record?</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-4"
                                            >
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="yes" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Yes</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="no" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">No</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="willingToUndergoMedicalTests"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Are you willing to undergo medical tests if required?</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-4"
                                            >
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="yes" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Yes</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="no" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">No</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Section 10: Additional Information</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6 md:grid-cols-1">
                            <FormField control={form.control} name="specialNeeds" render={({ field }) => (<FormItem> <FormLabel>Special needs or accommodations</FormLabel> <FormControl> <Textarea {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="counselorNotes" render={({ field }) => (<FormItem> <FormLabel>Notes or comments for counselor</FormLabel> <FormControl> <Textarea {...field} /> </FormControl> <FormMessage /> </FormItem>)} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Section 11: Declaration & Consent</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <FormField control={form.control} name="confirmAccuracy" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"> <FormControl> <Checkbox checked={field.value} onCheckedChange={field.onChange} /> </FormControl> <div className="space-y-1 leading-none"> <FormLabel>I confirm that all information provided is accurate.</FormLabel> </div> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="authorizeProcessing" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"> <FormControl> <Checkbox checked={field.value} onCheckedChange={field.onChange} /> </FormControl> <div className="space-y-1 leading-none"> <FormLabel>I authorize the counselor to process my application.</FormLabel> </div> <FormMessage /> </FormItem>)} />
                            <FormField control={form.control} name="consentToCommunication" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"> <FormControl> <Checkbox checked={field.value} onCheckedChange={field.onChange} /> </FormControl> <div className="space-y-1 leading-none"> <FormLabel>I consent to document verification and communication via email/WhatsApp.</FormLabel> </div> <FormMessage /> </FormItem>)} />
                        </CardContent>
                    </Card>

                    <Button type="submit" size="lg" className="w-full md:w-auto">
                        <CheckCircle2 className="mr-2" />
                        Submit Application
                    </Button>
                </form>
            </Form>
        </div>
    );
}