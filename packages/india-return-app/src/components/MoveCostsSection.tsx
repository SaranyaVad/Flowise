import { useMemo, useState } from 'react'
import {
    flightEstimates,
    shippingOptions,
    carSegments,
    interiorTiers,
    miscTiers,
    documentationCosts,
    tempAccommodationPerNightINR,
    storageMonthlyINR,
    interimHealthInsuranceMonthlyINR,
    bankTransferSpreadPct,
    specialistTransferSpreadPct
} from '../data/moveCosts'
import { average } from '../calc'
import { useCurrency } from '../CurrencyContext'

export function MoveCostsSection() {
    const { formatMoney, formatMoneyRange } = useCurrency()

    const [travelers, setTravelers] = useState(2)
    const [flightRegionIdx, setFlightRegionIdx] = useState(0)

    const [shippingIdx, setShippingIdx] = useState(1)

    const [wantsCar, setWantsCar] = useState(true)
    const [carSegmentIdx, setCarSegmentIdx] = useState(1)
    const [carDownPct, setCarDownPct] = useState(20)

    const [flatSizeSqft, setFlatSizeSqft] = useState(1400)
    const [interiorTierIdx, setInteriorTierIdx] = useState(1)

    const [miscIdx, setMiscIdx] = useState(1)

    const [needOci, setNeedOci] = useState(false)
    const [needApostille, setNeedApostille] = useState(true)
    const [needDl, setNeedDl] = useState(true)
    const [hasPet, setHasPet] = useState(false)

    const [tempNights, setTempNights] = useState(14)

    const [exitSettlementCost, setExitSettlementCost] = useState(50000)

    const [needsStorage, setNeedsStorage] = useState(false)
    const [storageMonths, setStorageMonths] = useState(2)

    const [needsInterimHealth, setNeedsInterimHealth] = useState(true)
    const [healthGapMonths, setHealthGapMonths] = useState(2)

    const [bufferMonths, setBufferMonths] = useState(3)
    const [monthlyBudget, setMonthlyBudget] = useState(150000)

    const [transferAmountInr, setTransferAmountInr] = useState(3000000)
    const [transferMethod, setTransferMethod] = useState<'bank' | 'specialist'>('specialist')

    const flightCost = useMemo(() => {
        const r = flightEstimates[flightRegionIdx].perPersonOneWayINR
        return { low: r[0] * travelers, high: r[1] * travelers }
    }, [flightRegionIdx, travelers])

    const shippingCost = shippingOptions[shippingIdx].costINR

    const carDownPayment = useMemo(() => {
        if (!wantsCar) return { low: 0, high: 0 }
        const r = carSegments[carSegmentIdx].onRoadPriceINR
        return { low: r[0] * (carDownPct / 100), high: r[1] * (carDownPct / 100) }
    }, [wantsCar, carSegmentIdx, carDownPct])

    const interiorCost = useMemo(() => {
        const r = interiorTiers[interiorTierIdx].perSqftINR
        return { low: r[0] * flatSizeSqft, high: r[1] * flatSizeSqft }
    }, [interiorTierIdx, flatSizeSqft])

    const miscCost = miscTiers[miscIdx].costINR

    const docCostRows = documentationCosts.filter((d) => {
        if (d.label === 'OCI card') return needOci
        if (d.label === 'Document apostille / notarization') return needApostille
        if (d.label === 'Driving licence conversion') return needDl
        if (d.label === 'Pet relocation') return hasPet
        return true // PAN, Aadhaar always shown (free)
    })
    const docCostTotal = docCostRows.reduce((s, d) => s + average(d.costINR), 0)

    const tempAccommodationCost = useMemo(
        () => ({ low: tempAccommodationPerNightINR[0] * tempNights, high: tempAccommodationPerNightINR[1] * tempNights }),
        [tempNights]
    )

    const storageCost = useMemo(
        () =>
            needsStorage
                ? { low: storageMonthlyINR[0] * storageMonths, high: storageMonthlyINR[1] * storageMonths }
                : { low: 0, high: 0 },
        [needsStorage, storageMonths]
    )

    const interimHealthCost = useMemo(
        () =>
            needsInterimHealth
                ? { low: interimHealthInsuranceMonthlyINR[0] * healthGapMonths, high: interimHealthInsuranceMonthlyINR[1] * healthGapMonths }
                : { low: 0, high: 0 },
        [needsInterimHealth, healthGapMonths]
    )

    const bufferCost = bufferMonths * monthlyBudget

    const grandTotal = useMemo(() => {
        const low =
            flightCost.low +
            shippingCost[0] +
            exitSettlementCost +
            carDownPayment.low +
            interiorCost.low +
            miscCost[0] +
            docCostTotal +
            tempAccommodationCost.low +
            storageCost.low +
            interimHealthCost.low +
            bufferCost
        const high =
            flightCost.high +
            shippingCost[1] +
            exitSettlementCost +
            carDownPayment.high +
            interiorCost.high +
            miscCost[1] +
            docCostTotal +
            tempAccommodationCost.high +
            storageCost.high +
            interimHealthCost.high +
            bufferCost
        return { low, high }
    }, [
        flightCost,
        shippingCost,
        exitSettlementCost,
        carDownPayment,
        interiorCost,
        miscCost,
        docCostTotal,
        tempAccommodationCost,
        storageCost,
        interimHealthCost,
        bufferCost
    ])

    const transferCostEstimate = useMemo(() => {
        const spread = transferMethod === 'bank' ? bankTransferSpreadPct : specialistTransferSpreadPct
        return { low: (transferAmountInr * spread[0]) / 100, high: (transferAmountInr * spread[1]) / 100 }
    }, [transferAmountInr, transferMethod])

    return (
        <section>
            <h2>Moving & One-Time Costs</h2>
            <p className='section-intro'>
                The one-time costs of the move itself — separate from the recurring monthly budget in the Lifestyle
                Calculator. Flights, shipping, settling up abroad, buying a car, furnishing an unfurnished flat (very
                common in India), miscellaneous extras, paperwork, temporary accommodation, storage, interim health
                insurance, and a savings buffer for the first few months. All figures are indicative and vary a lot by
                origin country, mover, and personal choices.
            </p>

            <div className='calc-group'>
                <h4>Flights</h4>
                <div className='calc-grid'>
                    <label>
                        Travelers
                        <input type='number' min={1} max={8} value={travelers} onChange={(e) => setTravelers(Number(e.target.value))} />
                    </label>
                    <label>
                        Moving from
                        <select value={flightRegionIdx} onChange={(e) => setFlightRegionIdx(Number(e.target.value))}>
                            {flightEstimates.map((f, i) => (
                                <option key={f.region} value={i}>
                                    {f.region}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <p className='muted small' style={{ marginTop: '8px' }}>
                    One-way, economy, per person — {formatMoneyRange(flightEstimates[flightRegionIdx].perPersonOneWayINR)} each.
                </p>
            </div>

            <div className='calc-group'>
                <h4>Shipping household goods</h4>
                <div className='calc-grid'>
                    <label>
                        How much are you moving?
                        <select value={shippingIdx} onChange={(e) => setShippingIdx(Number(e.target.value))}>
                            {shippingOptions.map((s, i) => (
                                <option key={s.label} value={i}>
                                    {s.label}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <p className='muted small' style={{ marginTop: '8px' }}>
                    {shippingOptions[shippingIdx].description}. Typical transit: {shippingOptions[shippingIdx].duration}. Add
                    ~20-30% if you want insurance and inland trucking beyond a basic quote.
                </p>
            </div>

            <div className='calc-group'>
                <h4>Car</h4>
                <div className='calc-grid'>
                    <label className='checkbox-label'>
                        <input type='checkbox' checked={wantsCar} onChange={(e) => setWantsCar(e.target.checked)} />
                        Buying a car
                    </label>
                    {wantsCar && (
                        <>
                            <label>
                                Segment
                                <select value={carSegmentIdx} onChange={(e) => setCarSegmentIdx(Number(e.target.value))}>
                                    {carSegments.map((c, i) => (
                                        <option key={c.label} value={i}>
                                            {c.label}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                Down payment %
                                <input
                                    type='number'
                                    min={0}
                                    max={100}
                                    value={carDownPct}
                                    onChange={(e) => setCarDownPct(Number(e.target.value))}
                                />
                            </label>
                        </>
                    )}
                </div>
                {wantsCar && (
                    <p className='muted small' style={{ marginTop: '8px' }}>
                        On-road price {formatMoneyRange(carSegments[carSegmentIdx].onRoadPriceINR)}; the rest is financed via a
                        car loan (10-90% financing is typical — see banks' car loan terms).
                    </p>
                )}
            </div>

            <div className='calc-group'>
                <h4>Settling up abroad</h4>
                <p className='muted small'>
                    Winding down life in your origin country: an early lease-break penalty, move-out cleaning, closing
                    utility accounts. Selling a car you're not bringing, or getting deposits back, usually offsets some of
                    this — enter your best net estimate.
                </p>
                <div className='calc-grid'>
                    <label>
                        Net exit costs (₹)
                        <input
                            type='number'
                            min={0}
                            step={5000}
                            value={exitSettlementCost}
                            onChange={(e) => setExitSettlementCost(Number(e.target.value))}
                        />
                    </label>
                </div>
            </div>

            <div className='calc-group'>
                <h4>Interiors & furnishing</h4>
                <p className='muted small'>Most Indian flats — rented or bought — are handed over as a bare shell.</p>
                <div className='calc-grid'>
                    <label>
                        Flat size (sqft)
                        <input
                            type='number'
                            min={300}
                            step={50}
                            value={flatSizeSqft}
                            onChange={(e) => setFlatSizeSqft(Number(e.target.value))}
                        />
                    </label>
                    <label>
                        Finish level
                        <select value={interiorTierIdx} onChange={(e) => setInteriorTierIdx(Number(e.target.value))}>
                            {interiorTiers.map((t, i) => (
                                <option key={t.label} value={i}>
                                    {t.label}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <p className='muted small' style={{ marginTop: '8px' }}>
                    {interiorTiers[interiorTierIdx].description} — {formatMoneyRange(interiorTiers[interiorTierIdx].perSqftINR)}/sqft.
                </p>
            </div>

            <div className='calc-group'>
                <h4>Miscellaneous (housewarming, gifts & extras)</h4>
                <p className='muted small'>
                    A housewarming/griha pravesh if your family observes one, plus the small unplanned extras every move
                    brings — welcome gifts, odds and ends. Pick the scale that's closest to what you expect.
                </p>
                <div className='calc-grid'>
                    <label>
                        Scale
                        <select value={miscIdx} onChange={(e) => setMiscIdx(Number(e.target.value))}>
                            {miscTiers.map((m, i) => (
                                <option key={m.label} value={i}>
                                    {m.label}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <p className='muted small' style={{ marginTop: '8px' }}>{miscTiers[miscIdx].description}</p>
            </div>

            <div className='calc-group'>
                <h4>Paperwork & setup</h4>
                <div className='calc-grid'>
                    <label className='checkbox-label'>
                        <input type='checkbox' checked={needOci} onChange={(e) => setNeedOci(e.target.checked)} />
                        OCI card needed
                    </label>
                    <label className='checkbox-label'>
                        <input type='checkbox' checked={needApostille} onChange={(e) => setNeedApostille(e.target.checked)} />
                        Document apostille/notarization
                    </label>
                    <label className='checkbox-label'>
                        <input type='checkbox' checked={needDl} onChange={(e) => setNeedDl(e.target.checked)} />
                        Driving licence conversion
                    </label>
                    <label className='checkbox-label'>
                        <input type='checkbox' checked={hasPet} onChange={(e) => setHasPet(e.target.checked)} />
                        Bringing a pet
                    </label>
                </div>
                <table className='breakdown' style={{ marginTop: '12px' }}>
                    <tbody>
                        {docCostRows.map((d) => (
                            <tr key={d.label}>
                                <td>
                                    {d.label}
                                    <div className='muted small'>{d.note}</div>
                                </td>
                                <td>{formatMoneyRange(d.costINR)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='calc-group'>
                <h4>Temporary accommodation</h4>
                <p className='muted small'>Many families rent a hotel/serviced apartment for a few weeks while house-hunting, before signing a lease.</p>
                <div className='calc-grid'>
                    <label>
                        Nights
                        <input type='number' min={0} max={90} value={tempNights} onChange={(e) => setTempNights(Number(e.target.value))} />
                    </label>
                </div>
                <p className='muted small' style={{ marginTop: '8px' }}>{formatMoneyRange(tempAccommodationPerNightINR)}/night, mid-range serviced apartment/hotel.</p>
            </div>

            <div className='calc-group'>
                <h4>Storage</h4>
                <p className='muted small'>If you're not shipping or selling everything at once, a storage unit back in your origin country bridges the gap.</p>
                <div className='calc-grid'>
                    <label className='checkbox-label'>
                        <input type='checkbox' checked={needsStorage} onChange={(e) => setNeedsStorage(e.target.checked)} />
                        Need storage
                    </label>
                    {needsStorage && (
                        <label>
                            Months
                            <input
                                type='number'
                                min={1}
                                max={24}
                                value={storageMonths}
                                onChange={(e) => setStorageMonths(Number(e.target.value))}
                            />
                        </label>
                    )}
                </div>
                {needsStorage && (
                    <p className='muted small' style={{ marginTop: '8px' }}>{formatMoneyRange(storageMonthlyINR)}/month — varies a lot by origin city.</p>
                )}
            </div>

            <div className='calc-group'>
                <h4>Interim health insurance</h4>
                <p className='muted small'>
                    The gap between losing employer health coverage abroad and Indian coverage (a new employer's policy,
                    or one you buy yourself) actually starting.
                </p>
                <div className='calc-grid'>
                    <label className='checkbox-label'>
                        <input
                            type='checkbox'
                            checked={needsInterimHealth}
                            onChange={(e) => setNeedsInterimHealth(e.target.checked)}
                        />
                        Need gap coverage
                    </label>
                    {needsInterimHealth && (
                        <label>
                            Months of gap
                            <input
                                type='number'
                                min={1}
                                max={12}
                                value={healthGapMonths}
                                onChange={(e) => setHealthGapMonths(Number(e.target.value))}
                            />
                        </label>
                    )}
                </div>
                {needsInterimHealth && (
                    <p className='muted small' style={{ marginTop: '8px' }}>
                        {formatMoneyRange(interimHealthInsuranceMonthlyINR)}/month for the family, international/travel cover.
                    </p>
                )}
            </div>

            <div className='calc-group'>
                <h4>Buffer / contingency fund</h4>
                <p className='muted small'>
                    A cushion for the first few months while income stabilises — enter your monthly budget from the Lifestyle
                    Calculator tab.
                </p>
                <div className='calc-grid'>
                    <label>
                        Your monthly budget (₹)
                        <input type='number' min={0} step={5000} value={monthlyBudget} onChange={(e) => setMonthlyBudget(Number(e.target.value))} />
                    </label>
                    <label>
                        Months of buffer
                        <input type='number' min={0} max={12} value={bufferMonths} onChange={(e) => setBufferMonths(Number(e.target.value))} />
                    </label>
                </div>
            </div>

            <div className='result-card'>
                <h3>Estimated one-time moving budget</h3>
                <table className='breakdown'>
                    <tbody>
                        <tr>
                            <td>Flights ({travelers} traveler{travelers !== 1 ? 's' : ''})</td>
                            <td>{formatMoneyRange([flightCost.low, flightCost.high])}</td>
                        </tr>
                        <tr>
                            <td>Shipping household goods</td>
                            <td>{formatMoneyRange(shippingCost)}</td>
                        </tr>
                        <tr>
                            <td>Settling up abroad</td>
                            <td>{formatMoney(exitSettlementCost)}</td>
                        </tr>
                        {wantsCar && (
                            <tr>
                                <td>Car down payment</td>
                                <td>{formatMoneyRange([carDownPayment.low, carDownPayment.high])}</td>
                            </tr>
                        )}
                        <tr>
                            <td>Interiors & furnishing</td>
                            <td>{formatMoneyRange([interiorCost.low, interiorCost.high])}</td>
                        </tr>
                        <tr>
                            <td>Miscellaneous (housewarming, gifts & extras)</td>
                            <td>{formatMoneyRange(miscCost)}</td>
                        </tr>
                        <tr>
                            <td>Paperwork & setup</td>
                            <td>{formatMoney(docCostTotal)}</td>
                        </tr>
                        <tr>
                            <td>Temporary accommodation ({tempNights} nights)</td>
                            <td>{formatMoneyRange([tempAccommodationCost.low, tempAccommodationCost.high])}</td>
                        </tr>
                        {needsStorage && (
                            <tr>
                                <td>Storage ({storageMonths} months)</td>
                                <td>{formatMoneyRange([storageCost.low, storageCost.high])}</td>
                            </tr>
                        )}
                        {needsInterimHealth && (
                            <tr>
                                <td>Interim health insurance ({healthGapMonths} months)</td>
                                <td>{formatMoneyRange([interimHealthCost.low, interimHealthCost.high])}</td>
                            </tr>
                        )}
                        <tr>
                            <td>Buffer ({bufferMonths} months)</td>
                            <td>{formatMoney(bufferCost)}</td>
                        </tr>
                        <tr className='total-row'>
                            <td>Total one-time budget</td>
                            <td>{formatMoneyRange([grandTotal.low, grandTotal.high])}</td>
                        </tr>
                    </tbody>
                </table>
                <p className='muted small'>
                    This is on top of the recurring monthly budget from the Lifestyle Calculator, and separate from a house
                    down payment (already covered by the EMI calculator on the Rent vs Buy tab) and a school's one-time
                    admission fee (shown per-school on the Schools & Fees tab — easy to forget it's separate from tuition).
                </p>
            </div>

            <div className='calc-group'>
                <h4>Transferring money to India</h4>
                <p className='muted small'>
                    Bank wires typically mark up the exchange rate 2-5% above the mid-market rate plus flat fees ($5-75).
                    Specialist services (Wise-style) typically run 0.5-1.5% using the real mid-market rate. Both ends may also
                    deduct handling fees. This is a planning estimate — compare live rates before moving a large sum.
                </p>
                <div className='calc-grid'>
                    <label>
                        Amount to transfer (₹)
                        <input
                            type='number'
                            min={0}
                            step={100000}
                            value={transferAmountInr}
                            onChange={(e) => setTransferAmountInr(Number(e.target.value))}
                        />
                    </label>
                    <label>
                        Method
                        <select value={transferMethod} onChange={(e) => setTransferMethod(e.target.value as 'bank' | 'specialist')}>
                            <option value='specialist'>Specialist service (Wise-style)</option>
                            <option value='bank'>Bank wire transfer</option>
                        </select>
                    </label>
                </div>
                <p className='muted small' style={{ marginTop: '8px' }}>
                    Estimated cost of this transfer: <strong>{formatMoneyRange([transferCostEstimate.low, transferCostEstimate.high])}</strong> lost
                    to fees/spread.
                </p>
            </div>

            <div className='callout-note'>
                <h4>Taxes — this app can't give you a number, and neither should anyone without knowing your details</h4>
                <p className='muted small'>
                    What you owe depends on your citizenship, income sources, asset locations, and exactly when you move — this
                    varies too much to give a figure here, and getting it wrong is costly. See the tax questions in{' '}
                    <strong>Common Questions</strong> for the concepts to know before you talk to a cross-border tax CA
                    (chartered accountant) — which is genuinely the right next step, not a calculator.
                </p>
                <p className='muted small' style={{ marginTop: '8px' }}>
                    This also covers <strong>retirement and investment accounts</strong> (401(k)/pension/ISA-style accounts):
                    whether to cash out or leave them in place, and any exit tax that triggers, depends entirely on your
                    account type, country and residency status — another reason to loop this into the same CA conversation
                    rather than guess.
                </p>
            </div>
        </section>
    )
}
