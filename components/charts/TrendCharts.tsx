import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format, parseISO } from "date-fns";

export function CardsPerMonthChart({ matches }) {
  const monthlyStats = {};

  matches.forEach((match) => {
    if (!match.date) return;
    const date = parseISO(match.date);
    const key = format(date, "yyyy-MM");
    if (!monthlyStats[key]) {
      monthlyStats[key] = { cards: 0 };
    }
    monthlyStats[key].cards += (match.home_cards || 0) + (match.away_cards || 0);
  });

  const data = Object.entries(monthlyStats).map(([month, stats]) => ({
    month,
    cards: stats.cards,
  })).sort((a, b) => a.month.localeCompare(b.month));

  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow hover:shadow-xl transition col-span-full">
      <h2 className="text-lg font-semibold mb-4">📅 Totalt antal kort per månad</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fill: "#fff" }} />
          <YAxis tick={{ fill: "#fff" }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#1E3A8A", borderColor: "#4b5563", color: "#fff" }}
            labelStyle={{ color: "#FCD34D" }}
            itemStyle={{ color: "#fff" }}
          />
          <Line type="monotone" dataKey="cards" stroke="#FCD34D" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}