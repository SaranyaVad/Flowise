import { useState } from 'react'
import { SchoolsSection } from './components/SchoolsSection'
import { HousingSection } from './components/HousingSection'
import { SalariesSection } from './components/SalariesSection'
import { LifestyleCalculator } from './components/LifestyleCalculator'
import { CITY } from './data/schools'

type Tab = 'schools' | 'housing' | 'salaries' | 'calculator'

const tabs: { id: Tab; label: string }[] = [
    { id: 'schools', label: 'Schools & Fees' },
    { id: 'housing', label: 'Rent vs Buy' },
    { id: 'salaries', label: 'Salaries & Seniority' },
    { id: 'calculator', label: 'Lifestyle Calculator' }
]

export default function App() {
    const [tab, setTab] = useState<Tab>('schools')

    return (
        <div className='app'>
            <header className='app-header'>
                <h1>Return to India — {CITY} Guide</h1>
                <p className='muted'>Schools, housing, and pay benchmarks to plan a move back home.</p>
            </header>
            <nav className='tabs'>
                {tabs.map((t) => (
                    <button key={t.id} className={t.id === tab ? 'tab active' : 'tab'} onClick={() => setTab(t.id)}>
                        {t.label}
                    </button>
                ))}
            </nav>
            <main className='app-main'>
                {tab === 'schools' && <SchoolsSection />}
                {tab === 'housing' && <HousingSection />}
                {tab === 'salaries' && <SalariesSection />}
                {tab === 'calculator' && <LifestyleCalculator />}
            </main>
            <footer className='app-footer'>
                <p className='muted small'>
                    Data is indicative (2025-26), gathered from public listings, school fee structures and salary surveys. Always
                    verify current figures before making financial decisions.
                </p>
            </footer>
        </div>
    )
}
