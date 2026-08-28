import { useMemo, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import { schools, schoolTierLabels, SchoolTier } from '../data/schools'
import { localities, localityTierLabels, LocalityTier } from '../data/housing'
import { formatRangeINR } from '../format'

const HYDERABAD_CENTER: [number, number] = [17.428, 78.412]

const TIER_COLOR: Record<'budget' | 'mid' | 'premium', string> = {
    budget: '#3d7a5c',
    mid: '#5b7fb5',
    premium: '#d98324'
}

type LayerFilter = 'both' | 'schools' | 'localities'

export function MapSection() {
    const [layer, setLayer] = useState<LayerFilter>('both')
    const [tierFilter, setTierFilter] = useState<SchoolTier | LocalityTier | 'all'>('all')

    const visibleSchools = useMemo(
        () => (layer === 'localities' ? [] : schools.filter((s) => tierFilter === 'all' || s.tier === tierFilter)),
        [layer, tierFilter]
    )
    const visibleLocalities = useMemo(
        () => (layer === 'schools' ? [] : localities.filter((l) => tierFilter === 'all' || l.tier === tierFilter)),
        [layer, tierFilter]
    )

    return (
        <section>
            <h2>Map</h2>
            <p className='section-intro'>
                Schools and localities plotted on a map of Hyderabad, colour-coded by tier — click a pin for fee/rent details.
                Pins mark the general area/campus, not an exact address; inspired by school-map sites like Locrating, adapted for
                Hyderabad.
            </p>
            <div className='filters'>
                <label>
                    Show{' '}
                    <select value={layer} onChange={(e) => setLayer(e.target.value as LayerFilter)}>
                        <option value='both'>Schools & localities</option>
                        <option value='schools'>Schools only</option>
                        <option value='localities'>Localities only</option>
                    </select>
                </label>
                <label>
                    Tier{' '}
                    <select value={tierFilter} onChange={(e) => setTierFilter(e.target.value as SchoolTier | 'all')}>
                        <option value='all'>All</option>
                        <option value='budget'>Budget</option>
                        <option value='mid'>Mid-range</option>
                        <option value='premium'>Premium</option>
                    </select>
                </label>
            </div>
            <div className='legend'>
                <span>
                    <i style={{ background: TIER_COLOR.budget }} /> Budget
                </span>
                <span>
                    <i style={{ background: TIER_COLOR.mid }} /> Mid-range
                </span>
                <span>
                    <i style={{ background: TIER_COLOR.premium }} /> Premium
                </span>
                <span className='muted small'>White-ringed pins = schools, dark-ringed pins = localities</span>
            </div>
            <div className='map-wrap'>
                <MapContainer center={HYDERABAD_CENTER} zoom={11} scrollWheelZoom style={{ height: '560px', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                    />
                    {visibleLocalities.map((l) => (
                        <CircleMarker
                            key={l.name}
                            center={l.coordinates}
                            radius={9}
                            pathOptions={{ color: '#0b0f16', weight: 1.5, fillColor: TIER_COLOR[l.tier], fillOpacity: 0.9 }}
                        >
                            <Popup>
                                <strong>{l.name}</strong>
                                <div>{localityTierLabels[l.tier]} locality</div>
                                <div>2BHK rent: {formatRangeINR(l.rentMonthlyINR.twoBHK)}/mo</div>
                                <div>3BHK rent: {formatRangeINR(l.rentMonthlyINR.threeBHK)}/mo</div>
                                <div>Buy: {formatRangeINR(l.buyPricePerSqftINR)}/sqft</div>
                            </Popup>
                        </CircleMarker>
                    ))}
                    {visibleSchools.map((s) => (
                        <CircleMarker
                            key={s.name}
                            center={s.coordinates}
                            radius={7}
                            pathOptions={{ color: '#fff', weight: 1.5, fillColor: TIER_COLOR[s.tier], fillOpacity: 0.95 }}
                        >
                            <Popup>
                                <strong>{s.name}</strong>
                                <div>{s.area}</div>
                                <div>{schoolTierLabels[s.tier]}</div>
                                <div>Rating: {s.reputationScore.toFixed(1)}/5</div>
                                <div>Boards: {s.boards.join(', ')}</div>
                                <div>Annual tuition: {formatRangeINR(s.annualTuitionFeeINR)}</div>
                            </Popup>
                        </CircleMarker>
                    ))}
                </MapContainer>
            </div>
        </section>
    )
}
