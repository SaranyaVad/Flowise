import { useMemo, useState } from 'react'
import {
    lifestyleBaselines,
    LifestyleTier,
    CHILD_COST_MULTIPLIER,
    requiredCtcForTakeHome,
    requiredMonthlySavingsForRetirement,
    TransportMode,
    transportModeLabels,
    TRANSPORT_MODE_COST
} from '../data/lifestyle'
import { localities, LocalityTier } from '../data/housing'
import { schools, SchoolTier } from '../data/schools'
import { calculateEmi } from '../calc'
import { useCurrency } from '../CurrencyContext'

const FLAT_SIZE_SQFT = { twoBHK: 1000, threeBHK: 1450 }

const LIFESTYLE_CATEGORY_LABELS: { key: keyof (typeof lifestyleBaselines)[number]['monthlyPerAdultINR']; label: string }[] = [
    { key: 'groceriesFood', label: 'Groceries & food' },
    { key: 'utilitiesPhoneInternet', label: 'Utilities / phone / internet' },
    { key: 'healthcareInsurance', label: 'Healthcare / insurance' },
    { key: 'discretionaryLifestyle', label: 'Discretionary (dining, shopping)' }
]

interface Range {
    low: number
    high: number
}

function rangeOf(low: number, high: number): Range {
    return { low, high }
}
function addRanges(...ranges: Range[]): Range {
    return { low: ranges.reduce((s, r) => s + r.low, 0), high: ranges.reduce((s, r) => s + r.high, 0) }
}
function fixedRange(n: number): Range {
    return { low: n, high: n }
}

export function LifestyleCalculator() {
    const { formatMoney, formatMoneyRange, formatSalary, currency } = useCurrency()
    const formatRange = (r: Range) => formatMoneyRange([r.low, r.high])
    const [adults, setAdults] = useState(2)
    const [kids, setKids] = useState(1)
    const [lifestyleTier, setLifestyleTier] = useState<LifestyleTier>('comfortable')
    const [showLifestyleDetail, setShowLifestyleDetail] = useState(false)

    const [schoolTier, setSchoolTier] = useState<SchoolTier>('mid')
    const [specificSchool, setSpecificSchool] = useState('all')

    const [housingMode, setHousingMode] = useState<'rent' | 'buy'>('rent')
    const [localityTier, setLocalityTier] = useState<LocalityTier>('mid')
    const [specificLocality, setSpecificLocality] = useState('all')
    const [downPaymentPct, setDownPaymentPct] = useState(20)
    const [interestRatePct, setInterestRatePct] = useState(8.5)
    const [tenureYears, setTenureYears] = useState(20)

    const [transportMode, setTransportMode] = useState<TransportMode>('car')
    const [wantsHelp, setWantsHelp] = useState(true)

    const [holidaysMonthly, setHolidaysMonthly] = useState(8000)
    const [miscMonthly, setMiscMonthly] = useState(5000)

    const [savingsMode, setSavingsMode] = useState<'manual' | 'goal'>('manual')
    const [manualSavings, setManualSavings] = useState(15000)
    const [currentAge, setCurrentAge] = useState(35)
    const [retirementAge, setRetirementAge] = useState(60)
    const [currentSavingsLumpsum, setCurrentSavingsLumpsum] = useState(2000000)

    const selectedBaseline = lifestyleBaselines.find((b) => b.tier === lifestyleTier)!
    const selectedBaselinePerAdultTotal = LIFESTYLE_CATEGORY_LABELS.reduce(
        (sum, c) => sum + selectedBaseline.monthlyPerAdultINR[c.key],
        0
    )

    const schoolsInTier = useMemo(() => schools.filter((s) => s.tier === schoolTier), [schoolTier])
    const localitiesInTier = useMemo(() => localities.filter((l) => l.tier === localityTier), [localityTier])

    const result = useMemo(() => {
        const perAdult = selectedBaseline.monthlyPerAdultINR
        const perAdultTotal = perAdult.groceriesFood + perAdult.utilitiesPhoneInternet + perAdult.healthcareInsurance + perAdult.discretionaryLifestyle
        const adultLiving = fixedRange(perAdultTotal * adults)
        const kidLiving = fixedRange(
            (perAdult.groceriesFood + perAdult.healthcareInsurance + perAdult.discretionaryLifestyle) * CHILD_COST_MULTIPLIER * kids
        )

        // ---- Schooling: specific school (its own range) or tier average (avg of lows, avg of highs) ----
        let schoolingMonthly = fixedRange(0)
        if (kids > 0) {
            if (specificSchool !== 'all') {
                const school = schools.find((s) => s.name === specificSchool)
                if (school) schoolingMonthly = rangeOf((school.annualTuitionFeeINR[0] * kids) / 12, (school.annualTuitionFeeINR[1] * kids) / 12)
            } else if (schoolsInTier.length > 0) {
                const avgLow = schoolsInTier.reduce((s, sc) => s + sc.annualTuitionFeeINR[0], 0) / schoolsInTier.length
                const avgHigh = schoolsInTier.reduce((s, sc) => s + sc.annualTuitionFeeINR[1], 0) / schoolsInTier.length
                schoolingMonthly = rangeOf((avgLow * kids) / 12, (avgHigh * kids) / 12)
            }
        }

        // ---- Housing: specific locality or tier average, rent or buy (buy uses editable EMI params) ----
        const bhkKey = adults + kids >= 3 ? 'threeBHK' : 'twoBHK'
        let rentLow: number, rentHigh: number, sqftLow: number, sqftHigh: number
        if (specificLocality !== 'all') {
            const loc = localities.find((l) => l.name === specificLocality)
            rentLow = loc ? loc.rentMonthlyINR[bhkKey][0] : 0
            rentHigh = loc ? loc.rentMonthlyINR[bhkKey][1] : 0
            sqftLow = loc ? loc.buyPricePerSqftINR[0] : 0
            sqftHigh = loc ? loc.buyPricePerSqftINR[1] : 0
        } else if (localitiesInTier.length > 0) {
            rentLow = localitiesInTier.reduce((s, l) => s + l.rentMonthlyINR[bhkKey][0], 0) / localitiesInTier.length
            rentHigh = localitiesInTier.reduce((s, l) => s + l.rentMonthlyINR[bhkKey][1], 0) / localitiesInTier.length
            sqftLow = localitiesInTier.reduce((s, l) => s + l.buyPricePerSqftINR[0], 0) / localitiesInTier.length
            sqftHigh = localitiesInTier.reduce((s, l) => s + l.buyPricePerSqftINR[1], 0) / localitiesInTier.length
        } else {
            rentLow = rentHigh = sqftLow = sqftHigh = 0
        }

        let housingMonthly: Range
        let housingNote: string
        let priceLow = 0
        let priceHigh = 0
        if (housingMode === 'rent') {
            housingMonthly = rangeOf(rentLow, rentHigh)
            housingNote = `${bhkKey === 'threeBHK' ? '3BHK' : '2BHK'} rent — ${specificLocality !== 'all' ? specificLocality : `${localityTier}-tier average`}`
        } else {
            const size = FLAT_SIZE_SQFT[bhkKey]
            priceLow = size * sqftLow
            priceHigh = size * sqftHigh
            const loanLow = priceLow * (1 - downPaymentPct / 100)
            const loanHigh = priceHigh * (1 - downPaymentPct / 100)
            housingMonthly = rangeOf(calculateEmi(loanLow, interestRatePct, tenureYears), calculateEmi(loanHigh, interestRatePct, tenureYears))
            housingNote = `EMI on ~${size} sqft (${downPaymentPct}% down, ${interestRatePct}% / ${tenureYears}yr)`
        }

        // ---- Transport ----
        let transportMonthly = 0
        if (transportMode === 'metro') transportMonthly = TRANSPORT_MODE_COST.metroPerAdult * adults
        else if (transportMode === 'carpool') transportMonthly = TRANSPORT_MODE_COST.carpoolPerAdult * adults
        else if (transportMode === 'car') transportMonthly = TRANSPORT_MODE_COST.carPerHousehold

        const helpMonthly = wantsHelp ? selectedBaseline.domesticHelpMonthlyINR : 0

        const fixedMonthly = fixedRange(transportMonthly + helpMonthly + holidaysMonthly + miscMonthly)

        // ---- Savings: manual figure, or computed from a retirement goal ----
        const sustainableMonthlyExpense =
            adultLiving.low + housingMonthly.low + transportMonthly + helpMonthly + holidaysMonthly + miscMonthly
        const goalSavings = requiredMonthlySavingsForRetirement(currentAge, retirementAge, currentSavingsLumpsum, sustainableMonthlyExpense)
        const savingsMonthly = fixedRange(savingsMode === 'manual' ? manualSavings : goalSavings)

        const totalMonthly = addRanges(adultLiving, kidLiving, housingMonthly, schoolingMonthly, fixedMonthly, savingsMonthly)
        const totalAnnual = rangeOf(totalMonthly.low * 12, totalMonthly.high * 12)
        const requiredCtc = rangeOf(requiredCtcForTakeHome(totalAnnual.low), requiredCtcForTakeHome(totalAnnual.high))

        return {
            adultLiving,
            kidLiving,
            housingMonthly,
            housingNote,
            schoolingMonthly,
            transportMonthly,
            helpMonthly,
            holidaysMonthly,
            miscMonthly,
            savingsMonthly,
            goalSavings,
            totalMonthly,
            totalAnnual,
            requiredCtc
        }
    }, [
        adults,
        kids,
        selectedBaseline,
        schoolTier,
        specificSchool,
        schoolsInTier,
        housingMode,
        localityTier,
        specificLocality,
        localitiesInTier,
        downPaymentPct,
        interestRatePct,
        tenureYears,
        transportMode,
        wantsHelp,
        holidaysMonthly,
        miscMonthly,
        savingsMode,
        manualSavings,
        currentAge,
        retirementAge,
        currentSavingsLumpsum
    ])

    return (
        <section>
            <h2>Lifestyle Calculator</h2>
            <p className='section-intro'>
                Build up a monthly budget step by step — school, housing (with a real EMI calculation), transport, savings
                goal, holidays and miscellaneous — and see the monthly/annual salary you'd need to sustain it. Ranges use
                both the low and high end of each category's real fee/rent data. Hyderabad-specific 2025-26 estimates — for
                planning, not a guarantee.
            </p>

            <div className='calc-group'>
                <h4>Household</h4>
                <div className='calc-grid'>
                    <label>
                        Adults
                        <input type='number' min={1} max={4} value={adults} onChange={(e) => setAdults(Number(e.target.value))} />
                    </label>
                    <label>
                        School-age kids
                        <input type='number' min={0} max={4} value={kids} onChange={(e) => setKids(Number(e.target.value))} />
                    </label>
                    <label>
                        Lifestyle (groceries, utilities, healthcare, extras)
                        <select value={lifestyleTier} onChange={(e) => setLifestyleTier(e.target.value as LifestyleTier)}>
                            {lifestyleBaselines.map((b) => (
                                <option key={b.tier} value={b.tier}>
                                    {b.label}
                                </option>
                            ))}
                        </select>
                        <button type='button' className='link-button' onClick={() => setShowLifestyleDetail((v) => !v)}>
                            {showLifestyleDetail ? 'Hide' : 'What does this include?'}
                        </button>
                    </label>
                </div>
            </div>

            {showLifestyleDetail && (
                <div className='lifestyle-detail'>
                    <h4>{selectedBaseline.label} lifestyle — what's in it</h4>
                    <p className='muted small'>{selectedBaseline.description}</p>
                    <table className='breakdown'>
                        <tbody>
                            {LIFESTYLE_CATEGORY_LABELS.map((c) => (
                                <tr key={c.key}>
                                    <td>{c.label}</td>
                                    <td>{formatMoney(selectedBaseline.monthlyPerAdultINR[c.key])}</td>
                                </tr>
                            ))}
                            <tr className='total-row'>
                                <td>Per adult, per month</td>
                                <td>{formatMoney(selectedBaselinePerAdultTotal)}</td>
                            </tr>
                            <tr>
                                <td>Domestic help (household, if selected below)</td>
                                <td>{formatMoney(selectedBaseline.domesticHelpMonthlyINR)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className='muted small'>
                        Transport, schooling, holidays and miscellaneous are set separately below — this covers groceries,
                        utilities, healthcare and everyday discretionary spend only. A child is estimated at{' '}
                        {Math.round(CHILD_COST_MULTIPLIER * 100)}% of an adult's food/healthcare/discretionary spend.
                    </p>
                </div>
            )}

            {kids > 0 && (
                <div className='calc-group'>
                    <h4>School</h4>
                    <div className='calc-grid'>
                        <label>
                            School tier
                            <select
                                value={schoolTier}
                                onChange={(e) => {
                                    setSchoolTier(e.target.value as SchoolTier)
                                    setSpecificSchool('all')
                                }}
                            >
                                <option value='budget'>Budget</option>
                                <option value='mid'>Mid-range</option>
                                <option value='premium'>Premium/International</option>
                            </select>
                        </label>
                        <label>
                            Specific school (optional)
                            <select value={specificSchool} onChange={(e) => setSpecificSchool(e.target.value)}>
                                <option value='all'>Use {schoolTier}-tier average</option>
                                {schoolsInTier.map((s) => (
                                    <option key={s.name} value={s.name}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>
            )}

            <div className='calc-group'>
                <h4>Housing</h4>
                <div className='calc-grid'>
                    <label>
                        Housing
                        <select value={housingMode} onChange={(e) => setHousingMode(e.target.value as 'rent' | 'buy')}>
                            <option value='rent'>Rent</option>
                            <option value='buy'>Buy (home loan EMI)</option>
                        </select>
                    </label>
                    <label>
                        Locality tier
                        <select
                            value={localityTier}
                            onChange={(e) => {
                                setLocalityTier(e.target.value as LocalityTier)
                                setSpecificLocality('all')
                            }}
                        >
                            <option value='budget'>Budget</option>
                            <option value='mid'>Mid-range</option>
                            <option value='premium'>Premium</option>
                        </select>
                    </label>
                    <label>
                        Specific locality (optional)
                        <select value={specificLocality} onChange={(e) => setSpecificLocality(e.target.value)}>
                            <option value='all'>Use {localityTier}-tier average</option>
                            {localitiesInTier.map((l) => (
                                <option key={l.name} value={l.name}>
                                    {l.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    {housingMode === 'buy' && (
                        <>
                            <label>
                                Down payment %
                                <input
                                    type='number'
                                    min={0}
                                    max={90}
                                    value={downPaymentPct}
                                    onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                                />
                            </label>
                            <label>
                                Interest rate %
                                <input
                                    type='number'
                                    min={1}
                                    max={20}
                                    step={0.1}
                                    value={interestRatePct}
                                    onChange={(e) => setInterestRatePct(Number(e.target.value))}
                                />
                            </label>
                            <label>
                                Tenure (years)
                                <input
                                    type='number'
                                    min={1}
                                    max={30}
                                    value={tenureYears}
                                    onChange={(e) => setTenureYears(Number(e.target.value))}
                                />
                            </label>
                        </>
                    )}
                </div>
            </div>

            <div className='calc-group'>
                <h4>Transport & help</h4>
                <div className='calc-grid'>
                    <label>
                        Transport
                        <select value={transportMode} onChange={(e) => setTransportMode(e.target.value as TransportMode)}>
                            {(Object.keys(transportModeLabels) as TransportMode[]).map((m) => (
                                <option key={m} value={m}>
                                    {transportModeLabels[m]}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className='checkbox-label'>
                        <input type='checkbox' checked={wantsHelp} onChange={(e) => setWantsHelp(e.target.checked)} />
                        Domestic help
                    </label>
                </div>
            </div>

            <div className='calc-group'>
                <h4>Holidays & miscellaneous</h4>
                <div className='calc-grid'>
                    <label>
                        Holidays/travel (₹/month)
                        <input type='number' min={0} step={500} value={holidaysMonthly} onChange={(e) => setHolidaysMonthly(Number(e.target.value))} />
                    </label>
                    <label>
                        Miscellaneous (₹/month)
                        <input type='number' min={0} step={500} value={miscMonthly} onChange={(e) => setMiscMonthly(Number(e.target.value))} />
                    </label>
                </div>
            </div>

            <div className='calc-group'>
                <h4>Savings goal</h4>
                <div className='calc-grid'>
                    <label>
                        Approach
                        <select value={savingsMode} onChange={(e) => setSavingsMode(e.target.value as 'manual' | 'goal')}>
                            <option value='manual'>Set my own monthly target</option>
                            <option value='goal'>Estimate from a retirement goal</option>
                        </select>
                    </label>
                    {savingsMode === 'manual' ? (
                        <label>
                            Monthly savings target (₹)
                            <input type='number' min={0} step={1000} value={manualSavings} onChange={(e) => setManualSavings(Number(e.target.value))} />
                        </label>
                    ) : (
                        <>
                            <label>
                                Current age
                                <input type='number' min={18} max={70} value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} />
                            </label>
                            <label>
                                Retirement age
                                <input
                                    type='number'
                                    min={40}
                                    max={80}
                                    value={retirementAge}
                                    onChange={(e) => setRetirementAge(Number(e.target.value))}
                                />
                            </label>
                            <label>
                                Current savings (₹)
                                <input
                                    type='number'
                                    min={0}
                                    step={100000}
                                    value={currentSavingsLumpsum}
                                    onChange={(e) => setCurrentSavingsLumpsum(Number(e.target.value))}
                                />
                            </label>
                        </>
                    )}
                </div>
                {savingsMode === 'goal' && (
                    <p className='muted small'>
                        Estimated monthly savings needed: <strong>{formatMoney(result.goalSavings)}</strong>. Assumes a 25×-expenses
                        retirement corpus (the "4% rule") and 10%/year returns — a rough planning heuristic, not financial
                        advice.
                    </p>
                )}
            </div>

            <div className='result-card'>
                <h3>Estimated monthly budget</h3>
                <table className='breakdown'>
                    <tbody>
                        <tr>
                            <td>Adults' living costs</td>
                            <td>{formatRange(result.adultLiving)}</td>
                        </tr>
                        {kids > 0 && (
                            <tr>
                                <td>Kids' living costs</td>
                                <td>{formatRange(result.kidLiving)}</td>
                            </tr>
                        )}
                        <tr>
                            <td>
                                Housing ({housingMode === 'rent' ? 'rent' : 'EMI'})
                                <div className='muted small'>{result.housingNote}</div>
                            </td>
                            <td>{formatRange(result.housingMonthly)}</td>
                        </tr>
                        {kids > 0 && (
                            <tr>
                                <td>Schooling (amortized monthly)</td>
                                <td>{formatRange(result.schoolingMonthly)}</td>
                            </tr>
                        )}
                        <tr>
                            <td>Transport ({transportModeLabels[transportMode]})</td>
                            <td>{formatMoney(result.transportMonthly)}</td>
                        </tr>
                        {wantsHelp && (
                            <tr>
                                <td>Domestic help</td>
                                <td>{formatMoney(result.helpMonthly)}</td>
                            </tr>
                        )}
                        <tr>
                            <td>Holidays/travel</td>
                            <td>{formatMoney(result.holidaysMonthly)}</td>
                        </tr>
                        <tr>
                            <td>Miscellaneous</td>
                            <td>{formatMoney(result.miscMonthly)}</td>
                        </tr>
                        <tr>
                            <td>Savings ({savingsMode === 'manual' ? 'your target' : 'retirement goal'})</td>
                            <td>{formatMoney(result.savingsMonthly.low)}</td>
                        </tr>
                        <tr className='total-row'>
                            <td>Total monthly</td>
                            <td>{formatRange(result.totalMonthly)}</td>
                        </tr>
                        <tr>
                            <td>Total annual</td>
                            <td>{formatRange(result.totalAnnual)}</td>
                        </tr>
                    </tbody>
                </table>

                <div className='headline-result'>
                    <div>
                        <span className='label'>Salary needed (with your savings target already included)</span>
                        <span className='value big'>
                            {formatMoney(result.requiredCtc.low / 12)}
                            {result.requiredCtc.low !== result.requiredCtc.high ? ` – ${formatMoney(result.requiredCtc.high / 12)}` : ''}/month
                        </span>
                        <span className='sub-value'>
                            {formatRange(rangeOf(result.requiredCtc.low, result.requiredCtc.high))}/year CTC
                            {currency === 'INR' && (
                                <>
                                    {' '}
                                    ({formatSalary(result.requiredCtc.low)}
                                    {result.requiredCtc.low !== result.requiredCtc.high ? ` – ${formatSalary(result.requiredCtc.high)}` : ''})
                                </>
                            )}
                        </span>
                    </div>
                </div>
                <p className='muted small'>
                    Range reflects the low and high end of the actual fee/rent data for your chosen school and locality tiers.
                    CTC estimate accounts for income tax, PF and typical bonus/equity structure at that income level — it's a
                    planning estimate, not tax advice.
                </p>
            </div>
        </section>
    )
}
