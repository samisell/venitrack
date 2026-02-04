'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2 } from 'lucide-react';
import { applicationFormSchema, ApplicationFormValues } from './schema'; // Ensure schema.ts is in the same directory
import {
    PersonalInformation,
    StudyPreferences,
    AcademicBackground,
    EnglishProficiency,
    WorkExperience,
    FinancialInformation,
    StatementIntent,
    MedicalBackground,
    AdditionalInformation,
    DeclarationConsent
} from './form-sections';

export default function ApplicationFormPage() {
    const { toast } = useToast();

    const form = useForm<ApplicationFormValues>({
        resolver: zodResolver(applicationFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            gender: '',
            dateOfBirth: '',
            nationality: '',
            countryOfResidence: '',
            phone: '',
            intendedCountry: '',
            levelOfStudy: '',
            intendedCourse: '',
            intakePeriod: '',
            highestQualification: '',
            institution: '',
            countryOfStudy: '',
            studyStartDate: '',
            studyEndDate: '',
            grade: '',
            primarySponsor: '',
            sponsorFullName: '',
            sponsorRelationship: '',
            confirmAccuracy: false,
            authorizeProcessing: false,
            consentToCommunication: false,
        },
    });

    // Watch all fields to calculate progress
    const formValues = form.watch();
    const totalFields = Object.keys(applicationFormSchema.shape).length;
    const filledFields = Object.values(formValues || {}).filter(Boolean).length;
    const progress = (filledFields / totalFields) * 100;

    function onSubmit(values: ApplicationFormValues) {
        console.log(values);
        toast({
            title: "Application Submitted",
            description: "Your application has been successfully submitted for review.",
        });
    }

    return (
        <div className="container mx-auto py-10 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">University Application Form</h1>
                    <p className="text-muted-foreground">Complete all sections to apply for your desired program.</p>
                </div>
                <div className="w-full md:w-1/3 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Completion Progress</span>
                        <span className="font-medium">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <PersonalInformation control={form.control} />
                    <StudyPreferences control={form.control} />
                    <AcademicBackground control={form.control} />
                    <EnglishProficiency control={form.control} />
                    <WorkExperience control={form.control} />
                    <FinancialInformation control={form.control} />
                    <StatementIntent control={form.control} />
                    <MedicalBackground control={form.control} />
                    <AdditionalInformation control={form.control} />
                    <DeclarationConsent control={form.control} />

                    <Button type="submit" size="lg" className="w-full md:w-auto">
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Submit Application
                    </Button>
                </form>
            </Form>
        </div>
    );
}