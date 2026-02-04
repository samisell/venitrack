import * as z from 'zod';

// Validation schema for the application form
export const applicationFormSchema = z.object({
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

export type ApplicationFormValues = z.infer<typeof applicationFormSchema>;