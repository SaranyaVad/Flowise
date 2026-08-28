export interface Insight {
    question: string
    answer: string
    seeAlso?: string
}

// Themes recurring across NRI/expat community discussions (Reddit's r/nri, r/developersIndia,
// r/FIRE_ind, TeamBlind's "Return to India" channel, and returnee blogs) about moving back —
// summarized and paired with the relevant section of this app where you can dig into the numbers.
export const insights: Insight[] = [
    {
        question: '"My US/UK salary in rupees looks huge — will I still be comfortable?"',
        answer:
            'The most common trap: converting a foreign salary straight to INR sets unrealistic expectations. The real gap has narrowed a lot — from roughly 7-10x a decade ago to about 2-3x now for comparable tech roles — and it is your Indian CTC, not your old paycheck, that has to cover Indian costs.',
        seeAlso: 'Salaries & Seniority'
    },
    {
        question: '"Is India actually cheaper to live in?"',
        answer:
            'Only partially. Rent and healthcare are genuinely cheaper than the US/UK, but groceries, dining, electronics, cars and school fees run close to Western prices — sometimes higher once you add import duties. Don\'t assume blanket savings; budget category by category.',
        seeAlso: 'Lifestyle Calculator'
    },
    {
        question: '"Will private school fees eat up what I save on rent?"',
        answer:
            'For families with kids, yes — this comes up constantly. A premium international/IB school can cost as much as rent itself, sometimes more. It is one of the single biggest swing factors in a returning family\'s budget, which is why it is modeled explicitly here rather than folded into a generic "cost of living" number.',
        seeAlso: 'Schools & Fees'
    },
    {
        question: '"Where should we live — near my office or near family?"',
        answer:
            'Recurring advice from people who\'ve done it: pick the first home based on commute, not sentiment. Bangalore/Hyderabad traffic can turn a 12km commute into 90 minutes each way; that daily tax outweighs most other lifestyle factors, especially in the first year while you\'re still adjusting.',
        seeAlso: 'Rent vs Buy'
    },
    {
        question: '"Rent or buy — what do most returnees do first?"',
        answer:
            'Rent first almost universally. Buying before you know which locality actually suits your commute and school choice is the most commonly regretted early decision. Most people rent for 12-24 months, then buy once the daily patterns (office, school, family visits) are settled.',
        seeAlso: 'Rent vs Buy'
    },
    {
        question: '"Do people regret moving back?"',
        answer:
            'It\'s common enough to be a recurring thread topic — some estimates cited in these communities put it at roughly half of returnees reconsidering within 5 years, usually over traffic, pollution, air quality, work culture, or missing the day-to-day convenience abroad. The advice that comes up most: go in with reset expectations rather than assuming it will feel like a vacation home.',
        seeAlso: undefined
    },
    {
        question: '"What about visa/immigration status back in the US/UK — should I keep it active?"',
        answer:
            'A frequently repeated tip: if you\'re on something like H-1B, keeping at least 1-2 years of validity stamped before you leave preserves the option to go back without restarting the process, in case the move doesn\'t work out or plans change.',
        seeAlso: undefined
    },
    {
        question: '"Any tips on timing the move?"',
        answer:
            'If you have school-age kids, move in summer — Indian academic years mostly run June/July to March/April, and mid-year transfers are harder to get into good schools. Align your notice period and move date to that admissions calendar, not just to visa or work timelines.',
        seeAlso: 'Schools & Fees'
    }
]
