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
    /** Approximate [lat, lng] of the locality centre — for map placement, not a precise boundary. */
    coordinates: [number, number]
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
        buyPricePerSqftINR: [9850, 13850],
        coordinates: [17.4401, 78.3489]
    },
    {
        name: 'Financial District',
        tier: 'premium',
        knownFor: 'Corporate HQs, premium high-rises, expat/CXO crowd',
        rentMonthlyINR: { twoBHK: [30000, 45000], threeBHK: [40000, 75000] },
        buyPricePerSqftINR: [9500, 14000],
        coordinates: [17.4126, 78.3466]
    },
    {
        name: 'Kokapet / Neopolis',
        tier: 'premium',
        knownFor: 'Newest premium high-rise corridor, strong price appreciation',
        rentMonthlyINR: { twoBHK: [28000, 40000], threeBHK: [38000, 65000] },
        buyPricePerSqftINR: [9300, 13200],
        coordinates: [17.403, 78.3245]
    },
    {
        name: 'Kondapur',
        tier: 'mid',
        knownFor: 'Well-established, good schools and social infra, 10-15 min from Gachibowli',
        rentMonthlyINR: { twoBHK: [15000, 30000], threeBHK: [25000, 45000] },
        buyPricePerSqftINR: [7000, 10500],
        coordinates: [17.4615, 78.3676]
    },
    {
        name: 'Madhapur / HITEC City',
        tier: 'mid',
        knownFor: 'Walk-to-work for many IT campuses, dense social infra',
        rentMonthlyINR: { twoBHK: [20000, 32000], threeBHK: [30000, 50000] },
        buyPricePerSqftINR: [7500, 11000],
        coordinates: [17.4483, 78.3915]
    },
    {
        name: 'Manikonda / Nanakramguda',
        tier: 'mid',
        knownFor: 'Value-for-money alternative close to Gachibowli/Financial District',
        rentMonthlyINR: { twoBHK: [16000, 26000], threeBHK: [24000, 40000] },
        buyPricePerSqftINR: [6500, 9500],
        coordinates: [17.4023, 78.3809]
    },
    {
        name: 'Kukatpally / Miyapur',
        tier: 'budget',
        knownFor: 'More affordable, metro-connected, longer commute to Gachibowli IT corridor',
        rentMonthlyINR: { twoBHK: [12000, 20000], threeBHK: [18000, 30000] },
        buyPricePerSqftINR: [5500, 8000],
        coordinates: [17.4849, 78.4138]
    },
    {
        name: 'Banjara Hills / Jubilee Hills',
        tier: 'premium',
        knownFor: 'Legacy premium address, central location, top schools nearby',
        rentMonthlyINR: { twoBHK: [30000, 50000], threeBHK: [45000, 90000] },
        buyPricePerSqftINR: [10000, 16000],
        coordinates: [17.4156, 78.4347]
    },

    // ---- Western / IT corridor ----
    {
        name: 'Narsingi',
        tier: 'premium',
        knownFor: 'Fast-growing western suburb near ORR, close to Financial District',
        rentMonthlyINR: { twoBHK: [24000, 36000], threeBHK: [34000, 58000] },
        buyPricePerSqftINR: [8200, 12500],
        coordinates: [17.385, 78.348]
    },
    {
        name: 'Tellapur',
        tier: 'mid',
        knownFor: 'Riverside development along ORR, popular with IT families',
        rentMonthlyINR: { twoBHK: [16000, 28000], threeBHK: [24000, 42000] },
        buyPricePerSqftINR: [6800, 10000],
        coordinates: [17.464, 78.283]
    },
    {
        name: 'Nallagandla',
        tier: 'mid',
        knownFor: 'Established mid-range IT-corridor suburb near Gachibowli',
        rentMonthlyINR: { twoBHK: [15000, 26000], threeBHK: [22000, 38000] },
        buyPricePerSqftINR: [6200, 9200],
        coordinates: [17.47, 78.311]
    },
    {
        name: 'Gopanpally',
        tier: 'mid',
        knownFor: 'Emerging western suburb with newer gated communities',
        rentMonthlyINR: { twoBHK: [14000, 24000], threeBHK: [20000, 36000] },
        buyPricePerSqftINR: [6000, 8800],
        coordinates: [17.467, 78.323]
    },
    {
        name: 'Puppalaguda',
        tier: 'mid',
        knownFor: 'Hillside gated-community belt near Manikonda',
        rentMonthlyINR: { twoBHK: [16000, 27000], threeBHK: [24000, 40000] },
        buyPricePerSqftINR: [6500, 9500],
        coordinates: [17.402, 78.366]
    },
    {
        name: 'Kollur',
        tier: 'mid',
        knownFor: 'Emerging SEZ-adjacent locality beyond Kokapet, strong price appreciation',
        rentMonthlyINR: { twoBHK: [14000, 24000], threeBHK: [20000, 35000] },
        buyPricePerSqftINR: [6000, 9000],
        coordinates: [17.438, 78.265]
    },
    {
        name: 'Mokila',
        tier: 'budget',
        knownFor: 'Far-western emerging suburb near Indus International School',
        rentMonthlyINR: { twoBHK: [9000, 16000], threeBHK: [14000, 24000] },
        buyPricePerSqftINR: [4200, 6500],
        coordinates: [17.427, 78.175]
    },
    {
        name: 'Osman Nagar',
        tier: 'mid',
        knownFor: 'Quiet residential pocket between Kollur and Tellapur',
        rentMonthlyINR: { twoBHK: [15000, 25000], threeBHK: [22000, 37000] },
        buyPricePerSqftINR: [6200, 9000],
        coordinates: [17.452, 78.298]
    },

    // ---- North / Northwest ----
    {
        name: 'KPHB (Kukatpally Housing Board)',
        tier: 'mid',
        knownFor: 'Well-established, self-contained residential township with strong social infra',
        rentMonthlyINR: { twoBHK: [13000, 22000], threeBHK: [19000, 32000] },
        buyPricePerSqftINR: [5500, 8000],
        coordinates: [17.488, 78.399]
    },
    {
        name: 'Bachupally',
        tier: 'mid',
        knownFor: 'Popular with school-going families, several international schools nearby',
        rentMonthlyINR: { twoBHK: [12000, 20000], threeBHK: [18000, 30000] },
        buyPricePerSqftINR: [5200, 7500],
        coordinates: [17.524, 78.365]
    },
    {
        name: 'Nizampet',
        tier: 'budget',
        knownFor: 'Affordable, well-connected northwestern suburb',
        rentMonthlyINR: { twoBHK: [11000, 18000], threeBHK: [16000, 27000] },
        buyPricePerSqftINR: [4800, 7000],
        coordinates: [17.509, 78.38]
    },
    {
        name: 'Pragathi Nagar',
        tier: 'budget',
        knownFor: 'Budget-friendly extension of the Kukatpally belt',
        rentMonthlyINR: { twoBHK: [10000, 17000], threeBHK: [15000, 25000] },
        buyPricePerSqftINR: [4500, 6800],
        coordinates: [17.515, 78.391]
    },
    {
        name: 'Chandanagar',
        tier: 'budget',
        knownFor: 'Affordable, metro-connected, popular with young families',
        rentMonthlyINR: { twoBHK: [10000, 17000], threeBHK: [15000, 26000] },
        buyPricePerSqftINR: [4500, 6800],
        coordinates: [17.493, 78.332]
    },
    {
        name: 'Lingampally',
        tier: 'budget',
        knownFor: 'Railway/metro hub, budget option close to the IT corridor',
        rentMonthlyINR: { twoBHK: [9000, 16000], threeBHK: [14000, 23000] },
        buyPricePerSqftINR: [4200, 6200],
        coordinates: [17.489, 78.317]
    },
    {
        name: 'BHEL / Ramachandrapuram',
        tier: 'budget',
        knownFor: 'Established industrial-township area, quiet and affordable',
        rentMonthlyINR: { twoBHK: [9000, 15000], threeBHK: [13000, 22000] },
        buyPricePerSqftINR: [4000, 6000],
        coordinates: [17.5, 78.311]
    },
    {
        name: 'Kompally',
        tier: 'mid',
        knownFor: 'Growing northern suburb with several IB/international schools',
        rentMonthlyINR: { twoBHK: [13000, 22000], threeBHK: [19000, 32000] },
        buyPricePerSqftINR: [5000, 7500],
        coordinates: [17.542, 78.487]
    },

    // ---- Northeast ----
    {
        name: 'Secunderabad',
        tier: 'mid',
        knownFor: 'Twin-city core, railway hub, mixed legacy and new housing stock',
        rentMonthlyINR: { twoBHK: [14000, 24000], threeBHK: [20000, 36000] },
        buyPricePerSqftINR: [6000, 9000],
        coordinates: [17.4399, 78.4983]
    },
    {
        name: 'Alwal',
        tier: 'budget',
        knownFor: 'Affordable cantonment-adjacent residential area',
        rentMonthlyINR: { twoBHK: [9000, 15000], threeBHK: [13000, 22000] },
        buyPricePerSqftINR: [3800, 5800],
        coordinates: [17.503, 78.506]
    },
    {
        name: 'Sainikpuri',
        tier: 'mid',
        knownFor: 'Leafy, established colony popular with defence/government families',
        rentMonthlyINR: { twoBHK: [12000, 20000], threeBHK: [18000, 29000] },
        buyPricePerSqftINR: [5000, 7200],
        coordinates: [17.487, 78.556]
    },
    {
        name: 'Malkajgiri',
        tier: 'budget',
        knownFor: 'Affordable, well-connected northeastern residential belt',
        rentMonthlyINR: { twoBHK: [9000, 15000], threeBHK: [13000, 21000] },
        buyPricePerSqftINR: [3800, 5800],
        coordinates: [17.451, 78.53]
    },
    {
        name: 'ECIL / Kapra',
        tier: 'budget',
        knownFor: 'PSU-township origins, budget housing with good social infra',
        rentMonthlyINR: { twoBHK: [8500, 14000], threeBHK: [12500, 20000] },
        buyPricePerSqftINR: [3600, 5500],
        coordinates: [17.47, 78.562]
    },
    {
        name: 'Uppal',
        tier: 'budget',
        knownFor: 'Metro-connected eastern suburb, strong rental demand',
        rentMonthlyINR: { twoBHK: [9000, 15000], threeBHK: [13000, 21000] },
        buyPricePerSqftINR: [3800, 5800],
        coordinates: [17.401, 78.559]
    },
    {
        name: 'Tarnaka / Habsiguda',
        tier: 'mid',
        knownFor: 'Academic hub near Osmania University, established mid-range housing',
        rentMonthlyINR: { twoBHK: [13000, 22000], threeBHK: [19000, 31000] },
        buyPricePerSqftINR: [5500, 8000],
        coordinates: [17.418, 78.539]
    },

    // ---- East ----
    {
        name: 'Nacharam',
        tier: 'mid',
        knownFor: 'Industrial-area-adjacent, home to DPS Nacharam and several schools',
        rentMonthlyINR: { twoBHK: [11000, 19000], threeBHK: [16000, 27000] },
        buyPricePerSqftINR: [4800, 7000],
        coordinates: [17.424, 78.548]
    },
    {
        name: 'Boduppal',
        tier: 'budget',
        knownFor: 'Affordable eastern extension, growing apartment stock',
        rentMonthlyINR: { twoBHK: [8500, 14000], threeBHK: [12500, 20000] },
        buyPricePerSqftINR: [3600, 5500],
        coordinates: [17.426, 78.581]
    },
    {
        name: 'Dilsukhnagar',
        tier: 'budget',
        knownFor: 'Busy commercial-residential hub, very affordable',
        rentMonthlyINR: { twoBHK: [9000, 15000], threeBHK: [13000, 21000] },
        buyPricePerSqftINR: [3800, 5800],
        coordinates: [17.369, 78.525]
    },
    {
        name: 'Kothapet',
        tier: 'budget',
        knownFor: 'Dense, affordable residential area near Dilsukhnagar',
        rentMonthlyINR: { twoBHK: [9000, 15000], threeBHK: [13000, 21000] },
        buyPricePerSqftINR: [3800, 5800],
        coordinates: [17.367, 78.529]
    },
    {
        name: 'Vanasthalipuram',
        tier: 'budget',
        knownFor: 'Affordable southeastern suburb, growing apartment supply',
        rentMonthlyINR: { twoBHK: [8000, 13000], threeBHK: [12000, 19000] },
        buyPricePerSqftINR: [3500, 5200],
        coordinates: [17.34, 78.557]
    },
    {
        name: 'LB Nagar',
        tier: 'budget',
        knownFor: 'Major eastern hub, metro-connected, strong investment demand',
        rentMonthlyINR: { twoBHK: [9000, 15000], threeBHK: [13000, 21000] },
        buyPricePerSqftINR: [3800, 5800],
        coordinates: [17.346, 78.553]
    },

    // ---- South / Central / Old City ----
    {
        name: 'Mehdipatnam',
        tier: 'mid',
        knownFor: 'Central-south hub, well-connected, mixed old and new housing',
        rentMonthlyINR: { twoBHK: [12000, 20000], threeBHK: [17000, 28000] },
        buyPricePerSqftINR: [5000, 7500],
        coordinates: [17.396, 78.439]
    },
    {
        name: 'Tolichowki',
        tier: 'mid',
        knownFor: 'Multicultural central-south neighbourhood close to Golconda',
        rentMonthlyINR: { twoBHK: [12000, 20000], threeBHK: [17000, 28000] },
        buyPricePerSqftINR: [5000, 7500],
        coordinates: [17.4, 78.418]
    },
    {
        name: 'Rajendranagar',
        tier: 'budget',
        knownFor: 'Agricultural-university belt, home to Glendale Academy',
        rentMonthlyINR: { twoBHK: [9000, 15000], threeBHK: [13000, 21000] },
        buyPricePerSqftINR: [4000, 6000],
        coordinates: [17.331, 78.41]
    },
    {
        name: 'Attapur',
        tier: 'budget',
        knownFor: 'Affordable southern suburb, several CBSE schools nearby',
        rentMonthlyINR: { twoBHK: [10000, 16000], threeBHK: [14000, 23000] },
        buyPricePerSqftINR: [4200, 6200],
        coordinates: [17.38, 78.429]
    },
    {
        name: 'Charminar / Old City',
        tier: 'budget',
        knownFor: 'Historic core, dense and very affordable, distinct heritage character',
        rentMonthlyINR: { twoBHK: [7000, 12000], threeBHK: [10000, 17000] },
        buyPricePerSqftINR: [3200, 5000],
        coordinates: [17.3616, 78.4747]
    },
    {
        name: 'Abids / Himayatnagar',
        tier: 'mid',
        knownFor: 'Old commercial core, central location, legacy apartment stock',
        rentMonthlyINR: { twoBHK: [13000, 22000], threeBHK: [19000, 32000] },
        buyPricePerSqftINR: [6000, 9000],
        coordinates: [17.4, 78.477]
    },

    // ---- Central premium ----
    {
        name: 'Somajiguda',
        tier: 'premium',
        knownFor: 'Central business address near Banjara Hills, hospitals and offices',
        rentMonthlyINR: { twoBHK: [26000, 40000], threeBHK: [38000, 62000] },
        buyPricePerSqftINR: [9500, 14000],
        coordinates: [17.427, 78.461]
    },
    {
        name: 'Begumpet',
        tier: 'premium',
        knownFor: 'Central, historic, home to Hyderabad Public School and old-money addresses',
        rentMonthlyINR: { twoBHK: [25000, 38000], threeBHK: [36000, 58000] },
        buyPricePerSqftINR: [9000, 13500],
        coordinates: [17.443, 78.465]
    },
    {
        name: 'Ameerpet',
        tier: 'mid',
        knownFor: 'Central commercial/coaching hub, dense and well-connected',
        rentMonthlyINR: { twoBHK: [13000, 22000], threeBHK: [19000, 31000] },
        buyPricePerSqftINR: [6000, 8800],
        coordinates: [17.437, 78.448]
    },
    {
        name: 'Punjagutta',
        tier: 'premium',
        knownFor: 'Central premium address, close to Banjara Hills and Somajiguda',
        rentMonthlyINR: { twoBHK: [24000, 38000], threeBHK: [35000, 58000] },
        buyPricePerSqftINR: [9000, 13500],
        coordinates: [17.424, 78.453]
    },

    // ---- Southeast ----
    {
        name: 'Hayathnagar',
        tier: 'budget',
        knownFor: 'Far southeastern suburb, most affordable end of the market',
        rentMonthlyINR: { twoBHK: [7500, 13000], threeBHK: [11000, 18000] },
        buyPricePerSqftINR: [3400, 5000],
        coordinates: [17.333, 78.612]
    },
    {
        name: 'Nagole',
        tier: 'budget',
        knownFor: 'Metro-connected eastern suburb along the Musi river',
        rentMonthlyINR: { twoBHK: [8500, 14000], threeBHK: [12500, 20000] },
        buyPricePerSqftINR: [3600, 5500],
        coordinates: [17.383, 78.561]
    },
    {
        name: 'Shamshabad',
        tier: 'budget',
        knownFor: 'Airport-adjacent suburb, growing logistics/aviation employment',
        rentMonthlyINR: { twoBHK: [8000, 13000], threeBHK: [12000, 19000] },
        buyPricePerSqftINR: [3500, 5200],
        coordinates: [17.24, 78.429]
    }
]

export const localityTierLabels: Record<LocalityTier, string> = {
    budget: 'Budget',
    mid: 'Mid-range',
    premium: 'Premium'
}
