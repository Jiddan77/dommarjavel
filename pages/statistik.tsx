import { CardsPerMonthChart } from "../components/charts/TrendCharts";
import { TeamCardsChart } from "../components/charts/TeamCharts";
import { RefereeCardsBarChart, RefereePenaltiesChart, CardsVsPenaltiesChart } from "../components/charts/RefereeCharts";
import data from "../data/data.json";
import { useMemo } from "react";
import { calculateRefereeStats } from "../utils/statHelpers";


import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

function RefereeCardsBarChart({ data }) {
  const sorted = [...data].sort((a, b) => b.avgCards - a.avgCards).slice(0, 10);

  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow hover:shadow-xl transition col-span-full">
      <h2 className="text-lg font-semibold mb-4">📈 Flest kort per match (Topp 10)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={sorted}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: "#fff" }} />
          <YAxis tick={{ fill: "#fff" }} />
          <Tooltip contentStyle={{ backgroundColor: "#1f2937", borderColor: "#4b5563" }} />
          <Bar dataKey="avgCards" fill="#facc15" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}


export default function StatistikView() {
  const stats = useMemo(() => calculateRefereeStats(data.matches), []);

  return (
    <main className="min-h-screen p-4 bg-gray-950 text-white">
      <h1 className="text-3xl font-bold mb-6">📊 Topplistor & Statistik</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <StatCard title="🟨 Snällaste domare" items={stats.kindest} unit="kort/match" />
        <StatCard title="🔥 Elakaste domare" items={stats.strictest} unit="kort/match" />
        <StatCard title="🏠 Bäst för hemmalag" items={stats.homeWinners} unit="% vinster" />
        <StatCard title="🚌 Bäst för bortalag" items={stats.awayWinners} unit="% vinster" />
        <StatCard title="⚽ Flest straffar utdelade" items={stats.penaltiesGiven} unit="straffar" />
        <StatCard title="🎭 Mest avgörande domare" items={stats.mostDramatic} unit="avgöranden" />
      </div>
      <div className='mt-8'><RefereeCardsBarChart data={stats.all} /></div>
  <div className="mt-8"><TeamCardsChart matches={data.matches} /></div>
  <div className="mt-8"><CardsPerMonthChart matches={data.matches} /></div>
</main>
  );
}

function StatCard({ title, items, unit }) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow hover:shadow-xl transition">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <ul className="space-y-1 text-sm">
        {items.map((item, idx) => (
          <li key={idx} className="flex justify-between">
            <span>{item.name}</span>
            <span className="text-right text-gray-300">{item.value} {unit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}