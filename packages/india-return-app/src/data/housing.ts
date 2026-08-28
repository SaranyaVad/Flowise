export type LocalityTier = 'budget' | 'mid' | 'premium'

export interface Locality {
    name: string
    tier: LocalityTier
    knownFor: string
    rentMonthlyINR: {
        twoBHK: [number, number]
        threeBHK: [number, number]
    }
    buyPricePerSqftINR: [number, number]
}

// Indicative 2025 figures gathered from listing sites (99acres, NoBroker, SquareYards, OLX)
// and market reports. Actual rent/price varies a lot by building age, amenities and floor —
// treat these as ballpark ranges for budgeting, not quotes.
export const localities: Locality[] = [
    {
        name: 'Gachibowli',
        tier: 'premium',
        knownFor: 'IT hub, closest to major tech campuses, top international schools',
        rentMonthlyINR: { twoBHK: [25000, 35000], threeBHK: [35000, 55000] },
        buyPricePerSqftINR: [9850, 13850]
    },
    {
        name: 'Financial District',
        tier: 'premium',
        knownFor: 'Corporate HQs, premium high-rises, expat/CXO crowd',
        rentMonthlyINR: { twoBHK: [30000, 45000], threeBHK: [40000, 75000] },
        buyPricePerSqftINR: [9500, 14000]
    },
    {
        name: 'Kokapet / Neopolis',
        tier: 'premium',
        knownFor: 'Newest premium high-rise corridor, strong price appreciation',
        rentMonthlyINR: { twoBHK: [28000, 40000], threeBHK: [38000, 65000] },
        buyPricePerSqftINR: [9300, 13200]
    },
    {
        name: 'Kondapur',
        tier: 'mid',
        knownFor: 'Well-established, good schools and social infra, 10-15 min from Gachibowli',
        rentMonthlyINR: { twoBHK: [15000, 30000], threeBHK: [25000, 45000] },
        buyPricePerSqftINR: [7000, 10500]
    },
    {
        name: 'Madhapur / HITEC City',
        tier: 'mid',
        knownFor: 'Walk-to-work for many IT campuses, dense social infra',
        rentMonthlyINR: { twoBHK: [20000, 32000], threeBHK: [30000, 50000] },
        buyPricePerSqftINR: [7500, 11000]
    },
    {
        name: 'Manikonda / Nanakramguda',
        tier: 'mid',
        knownFor: 'Value-for-money alternative close to Gachibowli/Financial District',
        rentMonthlyINR: { twoBHK: [16000, 26000], threeBHK: [24000, 40000] },
        buyPricePerSqftINR: [6500, 9500]
    },
    {
        name: 'Kukatpally / Miyapur',
        tier: 'budget',
        knownFor: 'More affordable, metro-connected, longer commute to Gachibowli IT corridor',
        rentMonthlyINR: { twoBHK: [12000, 20000], threeBHK: [18000, 30000] },
        buyPricePerSqftINR: [5500, 8000]
    },
    {
        name: 'Banjara Hills / Jubilee Hills',
        tier: 'premium',
        knownFor: 'Legacy premium address, central location, top schools nearby',
        rentMonthlyINR: { twoBHK: [30000, 50000], threeBHK: [45000, 90000] },
        buyPricePerSqftINR: [10000, 16000]
    }
]

export const localityTierLabels: Record<LocalityTier, string> = {
    budget: 'Budget',
    mid: 'Mid-range',
    premium: 'Premium'
}
