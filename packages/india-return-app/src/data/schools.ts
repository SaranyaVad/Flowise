export type SchoolTier = 'budget' | 'mid' | 'premium'

export interface School {
    name: string
    area: string
    boards: string[]
    tier: SchoolTier
    annualTuitionFeeINR: [number, number]
    oneTimeAdmissionINR?: [number, number]
    notes?: string
}

export const CITY = 'Hyderabad'

// Fee figures are annual tuition only (2025-26 indicative), gathered from public fee
// structures, school websites and parent-reported ranges. Actual fees vary by grade,
// campus and change ~8-10% year on year — always confirm with the school directly.
export const schools: School[] = [
    {
        name: 'Delhi Public School (DPS), Hyderabad',
        area: 'Nacharam / Khajaguda / Miyapur (multiple campuses)',
        boards: ['CBSE'],
        tier: 'mid',
        annualTuitionFeeINR: [178500, 250500],
        oneTimeAdmissionINR: [5000, 25000],
        notes: 'Fee rises through grades; Class XI/XII stream fees are at the top of the range.'
    },
    {
        name: 'Glendale Academy',
        area: 'Rajendranagar',
        boards: ['CBSE', 'IGCSE'],
        tier: 'mid',
        annualTuitionFeeINR: [150000, 280000]
    },
    {
        name: 'CHIREC International School',
        area: 'Kondapur / Gachibowli / Manikonda / Financial District (multiple campuses)',
        boards: ['CBSE', 'IB', 'IGCSE'],
        tier: 'mid',
        annualTuitionFeeINR: [80000, 300000],
        notes: 'IB/IGCSE campuses and senior grades sit at the top of the range.'
    },
    {
        name: 'Oakridge International School',
        area: 'Gachibowli / Bachupally',
        boards: ['IB', 'ICSE'],
        tier: 'premium',
        annualTuitionFeeINR: [500000, 1000000],
        oneTimeAdmissionINR: [300000, 900000],
        notes: 'One of the priciest in the city; one-time admission/refundable deposit can run several lakh on top of tuition.'
    },
    {
        name: 'The Aga Khan Academy',
        area: 'Hyderabad',
        boards: ['IB'],
        tier: 'premium',
        annualTuitionFeeINR: [600000, 950000],
        notes: 'Boarding option available; day-scholar fee is lower than boarding.'
    },
    {
        name: 'Global Indian International School (GIIS)',
        area: 'Gachibowli',
        boards: ['CBSE', 'IB'],
        tier: 'premium',
        annualTuitionFeeINR: [250000, 500000]
    },
    {
        name: 'Meridian School',
        area: 'Banjara Hills / Gachibowli / Kukatpally / Nizampet (multiple campuses)',
        boards: ['CBSE'],
        tier: 'mid',
        annualTuitionFeeINR: [90000, 190000]
    },
    {
        name: 'Silver Oaks International School',
        area: 'Bachupally / Financial District',
        boards: ['CBSE', 'ICSE'],
        tier: 'mid',
        annualTuitionFeeINR: [120000, 260000]
    },
    {
        name: 'Manthan International School',
        area: 'Kismatpur',
        boards: ['CBSE'],
        tier: 'mid',
        annualTuitionFeeINR: [130000, 220000]
    },
    {
        name: 'Sri Chaitanya / Narayana / other CBSE day schools',
        area: 'City-wide',
        boards: ['CBSE', 'State Board'],
        tier: 'budget',
        annualTuitionFeeINR: [40000, 120000],
        notes: 'Widely available budget-to-mid option; academically intensive, exam-focused pedagogy.'
    }
]

export const schoolTierLabels: Record<SchoolTier, string> = {
    budget: 'Budget (₹0.4–1.2L/yr)',
    mid: 'Mid-range CBSE/ICSE (₹0.8–3L/yr)',
    premium: 'Premium IB/international (₹2.5–10L/yr)'
}
