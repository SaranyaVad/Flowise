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
    },
    {
        question: '"What about taxes — my old country\'s, and India\'s on the way in?"',
        answer:
            "This is the one area where a general answer can actively mislead you, because it hinges on your citizenship, income sources, asset locations and exact move date. What's worth knowing before you talk to a professional: India has an RNOR (\"Resident but Not Ordinarily Resident\") transition status — typically up to 2 years after you become a tax resident — during which foreign-source income generally isn't taxed in India, which is why timing your move and asset sales matters. Separately, your NRE/FCNR bank accounts need to be redesignated once you're a resident (banks want to know within weeks, not months). On the origin-country side, the rules vary hugely — US citizens/green card holders, for instance, keep tax filing obligations (and often FBAR/FATCA reporting) regardless of where they live, which is a very different situation from, say, a UK or Gulf-country departure. None of this is a number this app can give you — find a chartered accountant who specifically handles returning-NRI cases (not just general tax prep), before you sell assets or time a big transfer.",
        seeAlso: undefined
    },
    {
        question: '"How much money can I bring into India, and does it cost anything?"',
        answer:
            "Bringing money into India isn't capped the way sending it out is (India's Liberalised Remittance Scheme caps outward transfers at $250,000/person/year — relevant later, not on the way in). What does cost you: banks typically mark up the exchange rate 2-5% above the real mid-market rate plus a flat wire fee, while specialist transfer services (Wise-style) tend to run 0.5-1.5% at the real rate — on a large sum (selling a house, cashing out savings) that spread is real money. Compare live quotes from 2-3 options before moving anything sizeable, and loop in the same CA who's advising on your tax timing, since how and when you transfer can itself have tax implications.",
        seeAlso: 'Moving Costs'
    },
    {
        question: '"What other one-off costs come with the move itself, beyond monthly living costs?"',
        answer:
            "Easy to underbudget for: flights, shipping household goods (a sea container from the US/UK typically runs ₹3-8L depending on size), a car if you're buying one, furnishing a flat (Indian rentals/purchases are usually handed over as a bare shell — interiors commonly run ₹15-50L+ for a mid-size flat), a housewarming ceremony if your family observes one, paperwork (OCI cards, document apostille, driving licence conversion), temporary accommodation while house-hunting, and a cash buffer for the first few months before income stabilises. None of this is part of the recurring monthly budget.",
        seeAlso: 'Moving Costs'
    }
]
