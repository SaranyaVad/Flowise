export type Track = 'tech-ic' | 'tech-management' | 'product' | 'general-corporate'

export interface SeniorityLevel {
    track: Track
    level: string
    typicalTitles: string
    yearsExperience: string
    itServicesCtcLPA?: [number, number]
    productCompanyCtcLPA: [number, number]
    notes?: string
}

// LPA = Lakhs Per Annum (₹100,000). CTC = total cost-to-company (base + bonus target + equity
// at grant value), not take-home. Product-company figures skew toward Hyderabad campuses of
// large tech/product firms (Amazon, Microsoft, Google, Salesforce, Deloitte USI, etc.); IT
// services figures are for firms like TCS/Infosys/Wipro/Cognizant/Accenture-type delivery roles.
// Ranges are indicative 2025-26 market data, not a guarantee for any specific employer.
export const seniorityLevels: SeniorityLevel[] = [
    {
        track: 'tech-ic',
        level: 'L1 / SDE-1',
        typicalTitles: 'Software Engineer I, Associate Engineer',
        yearsExperience: '0-2 yrs',
        itServicesCtcLPA: [4, 9],
        productCompanyCtcLPA: [12, 28],
        notes: 'Fresher-to-early-career; product company figures include new-grad hires at large tech firms.'
    },
    {
        track: 'tech-ic',
        level: 'L2 / SDE-2',
        typicalTitles: 'Software Engineer II, Senior Software Engineer',
        yearsExperience: '3-6 yrs',
        itServicesCtcLPA: [8, 16],
        productCompanyCtcLPA: [25, 55]
    },
    {
        track: 'tech-ic',
        level: 'L3 / SDE-3 / Staff',
        typicalTitles: 'Senior/Staff Software Engineer, Tech Lead',
        yearsExperience: '6-10 yrs',
        itServicesCtcLPA: [14, 28],
        productCompanyCtcLPA: [45, 100],
        notes: 'Equity/RSU value becomes a large share of total comp at this level and above.'
    },
    {
        track: 'tech-ic',
        level: 'L4 / Principal',
        typicalTitles: 'Principal Engineer, Distinguished Engineer',
        yearsExperience: '10+ yrs',
        productCompanyCtcLPA: [90, 200],
        notes: 'Base salary rarely exceeds ~₹60L even here — the rest is bonus + RSUs/ESOPs.'
    },
    {
        track: 'tech-management',
        level: 'Engineering Manager',
        typicalTitles: 'EM, Team Lead (people manager)',
        yearsExperience: '7-12 yrs',
        productCompanyCtcLPA: [50, 95]
    },
    {
        track: 'tech-management',
        level: 'Senior Engineering Manager / Director',
        typicalTitles: 'Sr. EM, Director of Engineering',
        yearsExperience: '12-18 yrs',
        productCompanyCtcLPA: [80, 160]
    },
    {
        track: 'tech-management',
        level: 'VP Engineering',
        typicalTitles: 'VP Engineering, Site Lead',
        yearsExperience: '18+ yrs',
        productCompanyCtcLPA: [140, 350]
    },
    {
        track: 'product',
        level: 'Associate / Product Manager',
        typicalTitles: 'APM, Product Manager',
        yearsExperience: '2-6 yrs',
        productCompanyCtcLPA: [18, 45]
    },
    {
        track: 'product',
        level: 'Senior / Group Product Manager',
        typicalTitles: 'Sr. PM, GPM',
        yearsExperience: '6-12 yrs',
        productCompanyCtcLPA: [40, 85]
    },
    {
        track: 'product',
        level: 'Director of Product / VP Product',
        typicalTitles: 'Director/VP Product',
        yearsExperience: '12+ yrs',
        productCompanyCtcLPA: [70, 200]
    },
    {
        track: 'general-corporate',
        level: 'Manager',
        typicalTitles: 'Manager (Ops/Finance/HR/Marketing)',
        yearsExperience: '5-9 yrs',
        productCompanyCtcLPA: [15, 28]
    },
    {
        track: 'general-corporate',
        level: 'Senior Manager',
        typicalTitles: 'Senior Manager',
        yearsExperience: '9-14 yrs',
        productCompanyCtcLPA: [22, 40]
    },
    {
        track: 'general-corporate',
        level: 'Director',
        typicalTitles: 'Director',
        yearsExperience: '14-20 yrs',
        productCompanyCtcLPA: [40, 90]
    },
    {
        track: 'general-corporate',
        level: 'VP / General Manager',
        typicalTitles: 'VP, GM, Country/Site Head',
        yearsExperience: '20+ yrs',
        productCompanyCtcLPA: [70, 180]
    }
]

export const trackLabels: Record<Track, string> = {
    'tech-ic': 'Tech — Individual Contributor',
    'tech-management': 'Tech — Engineering Management',
    product: 'Product Management',
    'general-corporate': 'General Corporate (Ops/Finance/HR/Marketing)'
}
