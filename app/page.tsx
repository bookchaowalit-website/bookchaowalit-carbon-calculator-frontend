"use client";

import { useMemo, useState } from "react";

type Activity = { id: number; label: string; amount: number; unit: string; factor: number; category: "Travel" | "Home" | "Food" };
const initial: Activity[] = [
  { id: 1, label: "Motorbike commute", amount: 42, unit: "km", factor: .09, category: "Travel" },
  { id: 2, label: "Grid electricity", amount: 18, unit: "kWh", factor: .42, category: "Home" },
  { id: 3, label: "Rice meal", amount: 4, unit: "servings", factor: .38, category: "Food" },
];

export default function Home() {
  const [activities, setActivities] = useState(initial);
  const [category, setCategory] = useState<Activity["category"]>("Travel");
  const [label, setLabel] = useState("Train trip");
  const [amount, setAmount] = useState(12);
  const unit = "km";
  const factorByCategory: Record<Activity["category"], number> = { Travel: .04, Home: .42, Food: .38 };
  const totals = useMemo(() => activities.reduce((result, item) => { const kg = item.amount * item.factor; result.total += kg; result[item.category] += kg; return result; }, { total: 0, Travel: 0, Home: 0, Food: 0 }), [activities]);
  const add = () => { if (!label.trim() || amount <= 0) return; setActivities((current) => [...current, { id: Date.now(), label: label.trim(), amount, unit, factor: factorByCategory[category], category }]); setLabel(""); setAmount(1); };

  return (
    <main className="tally-page"><div className="tally-shell">
      <header className="tally-header"><div className="tally-brand"><span className="tally-mark">CO₂</span><span>CARBON / TALLY</span></div><span>PERSONAL STUDY / 01</span><span className="tally-status">ESTIMATE · NOT AUDITED</span></header>
      <section className="tally-hero"><div><p className="tally-kicker">make the assumption visible</p><h1>Count what<br /><em>you can change.</em></h1><p className="tally-deck">A simple activity ledger for seeing which everyday inputs make up the estimate — before reaching for a perfect number.</p></div><div className="tally-total"><span>THIS STUDY</span><strong>{totals.total.toFixed(1)}</strong><small>kg CO₂e<br />demonstrative estimate</small></div></section>
      <section className="tally-workspace" aria-label="Carbon activity ledger"><div className="activity-ledger"><div className="ledger-title"><span>ACTIVITY LEDGER</span><span>{activities.length} entries</span></div>{activities.map((item, index) => <div className="activity-row" key={item.id}><span className="activity-index">{String(index + 1).padStart(2, "0")}</span><span><strong>{item.label}</strong><small>{item.category} · default factor {item.factor.toFixed(2)}</small></span><b>{(item.amount * item.factor).toFixed(1)} <small>kg</small></b><button type="button" onClick={() => setActivities((current) => current.filter((entry) => entry.id !== item.id))} aria-label={`Remove ${item.label}`}>×</button></div>)}{activities.length === 0 ? <p className="empty-tally">The ledger is empty. Add one visible assumption below.</p> : null}</div><aside className="tally-breakdown"><span className="tally-kicker">WHERE IT SITS</span><h2>Three<br /><em>signals.</em></h2>{(["Travel", "Home", "Food"] as const).map((item) => <div className="breakdown-row" key={item}><div><span>{item}</span><strong>{totals[item].toFixed(1)} kg</strong></div><i><b style={{ width: `${totals.total ? Math.max(4, (totals[item] / totals.total) * 100) : 0}%` }} /></i></div>)}<p className="factor-note">Defaults are intentionally simple: they are here to show the shape of the ledger, not to certify an emissions report.</p></aside></section>
      <section className="add-activity" aria-labelledby="add-title"><div><p className="tally-kicker">ADD ONE ASSUMPTION</p><h2 id="add-title">Put another line<br />on the paper.</h2></div><div className="activity-form"><label><span>ACTIVITY</span><input value={label} onChange={(event) => setLabel(event.target.value)} /></label><label><span>CATEGORY</span><select value={category} onChange={(event) => setCategory(event.target.value as Activity["category"])}><option>Travel</option><option>Home</option><option>Food</option></select></label><label><span>AMOUNT / {unit}</span><input type="number" min="0" step="1" value={amount} onChange={(event) => setAmount(Number(event.target.value))} /></label><button type="button" onClick={add}>Add line →</button></div></section>
      <footer className="tally-footer"><span>BOOKCHAOWALIT / CARBON CALCULATOR</span><span>DEFAULT FACTORS · CLIENT-SIDE · NO OFFSET OR CERTIFICATION</span></footer>
    </div></main>
  );
}
