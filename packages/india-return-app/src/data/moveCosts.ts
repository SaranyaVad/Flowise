// One-time relocation/setup costs — distinct from the recurring monthly budget covered by the
// Lifestyle Calculator. Indicative 2025-26 figures gathered from moving-company quotes, interior
// design cost guides and general market data. Highly variable by origin country/city, mover, and
// personal choices — treat every range here as a planning ballpark, not a quote.

export interface FlightEstimate {
    region: string
    perPersonOneWayINR: [number, number]
}

export const flightEstimates: FlightEstimate[] = [
    { region: 'USA / Canada', perPersonOneWayINR: [45000, 120000] },
    { region: 'UK / Europe', perPersonOneWayINR: [35000, 90000] },
    { region: 'UAE / Middle East', perPersonOneWayINR: [12000, 35000] },
    { region: 'Singapore / Southeast Asia', perPersonOneWayINR: [15000, 40000] },
    { region: 'Australia', perPersonOneWayINR: [40000, 100000] }
]

// What "retirement/investment accounts" actually means varies a lot by origin country — keyed to
// the same region list above so the tax callout can name the right thing instead of defaulting to
// a US-specific term like 401(k).
export const retirementAccountNotesByRegion: Record<string, string> = {
    'USA / Canada': '401(k)/IRA in the US, or RRSP/TFSA in Canada',
    'UK / Europe': 'workplace or personal pensions',
    'UAE / Middle East': 'end-of-service gratuity and any personal investment accounts',
    'Singapore / Southeast Asia': 'CPF or your country’s equivalent retirement scheme',
    Australia: 'superannuation'
}

export interface ShippingOption {
    label: string
    description: string
    costINR: [number, number]
    duration: string
}

export const shippingOptions: ShippingOption[] = [
    {
        label: 'Partial household (air cargo / LCL)',
        description: 'A few boxes/suitcases beyond checked baggage — clothes, essentials, no furniture',
        costINR: [80000, 250000],
        duration: '1-3 weeks (air)'
    },
    {
        label: '20ft sea container (1-2BHK household)',
        description: 'Door-to-door, full container — most common for a family moving a full household',
        costINR: [330000, 570000],
        duration: '6-10 weeks (sea)'
    },
    {
        label: '40ft sea container (large/full house)',
        description: 'Door-to-door, full container — larger households or those bringing furniture',
        costINR: [450000, 850000],
        duration: '6-10 weeks (sea)'
    }
]

export interface CarSegment {
    label: string
    onRoadPriceINR: [number, number]
}

export const carSegments: CarSegment[] = [
    { label: 'Hatchback (entry)', onRoadPriceINR: [700000, 950000] },
    { label: 'Compact sedan / premium hatchback', onRoadPriceINR: [950000, 1400000] },
    { label: 'Compact SUV', onRoadPriceINR: [1200000, 1800000] },
    { label: 'Mid-size SUV', onRoadPriceINR: [1800000, 2800000] },
    { label: 'Premium sedan / SUV', onRoadPriceINR: [2800000, 5000000] }
]

export interface InteriorTier {
    label: string
    description: string
    perSqftINR: [number, number]
}

export const interiorTiers: InteriorTier[] = [
    { label: 'Basic', description: 'Laminates, essential storage, simple modular kitchen', perSqftINR: [1200, 1800] },
    { label: 'Premium', description: 'Better finishes, custom wardrobes, designer lighting', perSqftINR: [1800, 2600] },
    { label: 'Luxury', description: 'High-end materials, premium modular kitchen, imported finishes', perSqftINR: [2600, 3800] }
]

export interface MiscTier {
    label: string
    description: string
    costINR: [number, number]
}

// Housewarming (griha pravesh) folded in here as one example, alongside the other small unplanned
// extras that come with any move — welcome gifts, a family gathering, odds and ends you forgot to
// budget for elsewhere.
export const miscTiers: MiscTier[] = [
    { label: 'Small', description: 'A modest housewarming (immediate family, priest + puja samagri) plus a little extra for odds and ends', costINR: [5000, 20000] },
    { label: 'Medium', description: 'Housewarming with extended family & friends (~30-50 guests), plus welcome gifts and general extras', costINR: [30000, 90000] },
    { label: 'Large', description: 'A full housewarming event (bigger guest list, catering, decor) plus a generous miscellaneous cushion', costINR: [100000, 320000] }
]

export interface DocumentationCost {
    label: string
    costINR: [number, number]
    note: string
}

export const documentationCosts: DocumentationCost[] = [
    { label: 'OCI card', costINR: [15000, 25000], note: 'For non-Indian-citizen family members (e.g. a foreign-citizen spouse or kids) — not needed if everyone holds an Indian passport.' },
    { label: 'PAN card', costINR: [0, 200], note: 'Nominal fee; usually fast online.' },
    { label: 'Aadhaar enrollment', costINR: [0, 0], note: 'Free.' },
    { label: 'Document apostille / notarization', costINR: [5000, 25000], note: 'Degree certificates, marriage/birth certificates etc. — per document set, varies by origin country.' },
    { label: 'Driving licence conversion', costINR: [1000, 5000], note: 'India does not automatically recognise most foreign licences long-term; process varies by state.' },
    { label: 'Pet relocation', costINR: [80000, 300000], note: 'If applicable — vaccinations, quarantine, airline pet cargo. Easy to forget, often a bigger line item than expected.' }
]

export const tempAccommodationPerNightINR: [number, number] = [3000, 8000]

// Storage in the origin country if you're not shipping/selling everything at once — per month, a
// small-to-medium unit. Highly dependent on origin city; treat as a rough planning range.
export const storageMonthlyINR: [number, number] = [4000, 15000]

// Interim/gap health insurance for the family — covers the window between losing employer coverage
// abroad and Indian coverage (employer or a new policy) actually kicking in. Per month, family cover.
export const interimHealthInsuranceMonthlyINR: [number, number] = [15000, 45000]

// Money transfer: bank wires typically mark up the exchange rate 2-5% above mid-market plus flat
// fees ($5-75); specialist services (Wise-style) typically run 0.5-1.5% with the real mid-market
// rate. Both ends may also deduct handling fees. Numbers here are for planning, not a quote —
// compare live rates before moving a large sum.
export const bankTransferSpreadPct: [number, number] = [2, 5]
export const specialistTransferSpreadPct: [number, number] = [0.5, 1.5]
