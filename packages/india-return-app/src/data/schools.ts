export type SchoolTier = 'budget' | 'mid' | 'premium'

export interface School {
    name: string
    area: string
    boards: string[]
    tier: SchoolTier
    annualTuitionFeeINR: [number, number]
    oneTimeAdmissionINR?: [number, number]
    notes?: string
    /** Approximate [lat, lng] of the area/campus — for map placement, not an exact street address. */
    coordinates: [number, number]
    /**
     * Informal reputation score (1-5), aggregated from published rankings, "best schools" lists and
     * parent-review aggregators (EzySchooling, Yellow Slate, Education Today's ICSE survey, etc).
     * India has no single official inspection body (no Ofsted equivalent) — treat this as a rough
     * signal of standing, not an audited rating.
     */
    reputationScore: number
    reputationNote: string
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
        notes: 'Fee rises through grades; Class XI/XII stream fees are at the top of the range.',
        coordinates: [17.4227, 78.546],
        reputationScore: 4,
        reputationNote: 'Well-established national CBSE brand; consistent academic track record across campuses.'
    },
    {
        name: 'Glendale Academy',
        area: 'Rajendranagar',
        boards: ['CBSE', 'IGCSE'],
        tier: 'mid',
        annualTuitionFeeINR: [150000, 280000],
        coordinates: [17.3313, 78.4108],
        reputationScore: 4,
        reputationNote: 'Franklin Covey "Lighthouse School" — recognised for leadership-focused curriculum.'
    },
    {
        name: 'CHIREC International School',
        area: 'Kondapur / Gachibowli / Manikonda / Financial District (multiple campuses)',
        boards: ['CBSE', 'IB', 'IGCSE'],
        tier: 'mid',
        annualTuitionFeeINR: [80000, 300000],
        notes: 'IB/IGCSE campuses and senior grades sit at the top of the range.',
        coordinates: [17.4615, 78.3676],
        reputationScore: 4.5,
        reputationNote: 'Ranked #1 Ivy League Day School; the default top pick for IT-corridor families.'
    },
    {
        name: 'Oakridge International School',
        area: 'Gachibowli / Bachupally',
        boards: ['IB', 'ICSE'],
        tier: 'premium',
        annualTuitionFeeINR: [500000, 1000000],
        oneTimeAdmissionINR: [300000, 900000],
        notes: 'One of the priciest in the city; one-time admission/refundable deposit can run several lakh on top of tuition.',
        coordinates: [17.4401, 78.3489],
        reputationScore: 4.5,
        reputationNote: 'Long-running IB pedigree with a strong global university placement track record.'
    },
    {
        name: 'The Aga Khan Academy',
        area: 'Hyderabad',
        boards: ['IB'],
        tier: 'premium',
        annualTuitionFeeINR: [600000, 950000],
        notes: 'Boarding option available; day-scholar fee is lower than boarding.',
        coordinates: [17.4491, 78.6558],
        reputationScore: 4.5,
        reputationNote: 'Highly selective, part of a small global network of Aga Khan IB academies.'
    },
    {
        name: 'Global Indian International School (GIIS)',
        area: 'Gachibowli',
        boards: ['CBSE', 'IB'],
        tier: 'premium',
        annualTuitionFeeINR: [250000, 500000],
        coordinates: [17.438, 78.351],
        reputationScore: 4,
        reputationNote: 'Solid CBSE/IB option backed by a large international school network.'
    },
    {
        name: 'Meridian School',
        area: 'Banjara Hills / Gachibowli / Kukatpally / Nizampet (multiple campuses)',
        boards: ['CBSE'],
        tier: 'mid',
        annualTuitionFeeINR: [90000, 190000],
        coordinates: [17.4156, 78.4347],
        reputationScore: 3.5,
        reputationNote: 'Consistent, well-regarded CBSE choice across several city campuses.'
    },
    {
        name: 'Silver Oaks International School',
        area: 'Bachupally / Financial District',
        boards: ['CBSE', 'ICSE'],
        tier: 'mid',
        annualTuitionFeeINR: [120000, 260000],
        coordinates: [17.5237, 78.3714],
        reputationScore: 3.5,
        reputationNote: 'Growing reputation with newer, well-equipped campuses.'
    },
    {
        name: 'Manthan International School',
        area: 'Kismatpur',
        boards: ['CBSE'],
        tier: 'mid',
        annualTuitionFeeINR: [130000, 220000],
        coordinates: [17.3559, 78.3702],
        reputationScore: 3.5,
        reputationNote: 'Well-regarded mid-size CBSE school with a loyal local following.'
    },
    {
        name: 'Sri Chaitanya / Narayana / other CBSE day schools',
        area: 'City-wide',
        boards: ['CBSE', 'State Board'],
        tier: 'budget',
        annualTuitionFeeINR: [40000, 120000],
        notes: 'Widely available budget-to-mid option; academically intensive, exam-focused pedagogy.',
        coordinates: [17.385, 78.4867],
        reputationScore: 3,
        reputationNote: 'Strong exam results, but parent reviews are mixed on workload and student well-being.'
    }
]

export const schoolTierLabels: Record<SchoolTier, string> = {
    budget: 'Budget (₹0.4–1.2L/yr)',
    mid: 'Mid-range CBSE/ICSE (₹0.8–3L/yr)',
    premium: 'Premium IB/international (₹2.5–10L/yr)'
}
