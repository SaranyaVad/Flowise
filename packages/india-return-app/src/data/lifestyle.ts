export type LifestyleTier = 'modest' | 'comfortable' | 'premium'

export interface LifestyleBaseline {
    tier: LifestyleTier
    label: string
    description: string
    monthlyPerAdultINR: {
        groceriesFood: number
        transport: number
        utilitiesPhoneInternet: number
        healthcareInsurance: number
        discretionaryLifestyle: number
    }
    domesticHelpMonthlyINR: number
}

// Indicative 2025 monthly baselines per adult, built from cost-of-living surveys
// (Wise, NoBroker, Sobha, GoDigit) for Hyderabad. Actual spend varies with habits.
export const lifestyleBaselines: LifestyleBaseline[] = [
    {
        tier: 'modest',
        label: 'Modest',
        description: 'Home-cooked meals, public transport/shared cabs, occasional eating out',
        monthlyPerAdultINR: {
            groceriesFood: 6000,
            transport: 3000,
            utilitiesPhoneInternet: 2000,
            healthcareInsurance: 1500,
            discretionaryLifestyle: 4000
        },
        domesticHelpMonthlyINR: 3000
    },
    {
        tier: 'comfortable',
        label: 'Comfortable',
        description: 'Own car/regular cabs, dining out weekly, gym, some travel',
        monthlyPerAdultINR: {
            groceriesFood: 9000,
            transport: 7000,
            utilitiesPhoneInternet: 3000,
            healthcareInsurance: 3000,
            discretionaryLifestyle: 10000
        },
        domesticHelpMonthlyINR: 6000
    },
    {
        tier: 'premium',
        label: 'Premium',
        description: 'Multiple cars/driver, frequent dining/travel, premium healthcare & gym',
        monthlyPerAdultINR: {
            groceriesFood: 15000,
            transport: 15000,
            utilitiesPhoneInternet: 5000,
            healthcareInsurance: 6000,
            discretionaryLifestyle: 25000
        },
        domesticHelpMonthlyINR: 15000
    }
]

export const CHILD_COST_MULTIPLIER = 0.45 // non-schooling living cost of a child, relative to an adult

// Rough effective "take-home to CTC" ratio at these income levels in India, once you net out
// income tax (new regime slabs), employer+employee PF and typical bonus deferral/vesting.
// Higher CTC skews lower because more of it sits in bonus/equity and higher tax slabs.
export function estimateTakeHomeRatio(annualCtcINR: number): number {
    if (annualCtcINR <= 1_000_000) return 0.86
    if (annualCtcINR <= 2_500_000) return 0.78
    if (annualCtcINR <= 5_000_000) return 0.72
    return 0.65
}

// Solve for the CTC whose take-home (after the ratio above) covers the target annual
// take-home need. The ratio depends on CTC itself, so iterate a few times to converge.
export function requiredCtcForTakeHome(targetAnnualTakeHomeINR: number): number {
    let ctc = targetAnnualTakeHomeINR / 0.75
    for (let i = 0; i < 6; i++) {
        const ratio = estimateTakeHomeRatio(ctc)
        ctc = targetAnnualTakeHomeINR / ratio
    }
    return ctc
}
