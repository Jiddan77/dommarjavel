import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

export function RefereeCardsBarChart({ data }) {
  const sorted = [...data].sort((a, b) => b.avgCards - a.avgCards).slice(0, 10);
  return (
    <ChartContainer title="📈 Flest kort per match (Topp 10)">
      <BarChart data={sorted}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fill: "#fff" }} />
        <YAxis tick={{ fill: "#fff" }} />
        <Tooltip contentStyle={{ backgroundColor: "#1E3A8A", borderColor: "#4b5563" }} />
        <Bar dataKey="avgCards" fill="#FCD34D" />
      </BarChart>
    </ChartContainer>
  );
}

export function RefereePenaltiesChart({ data }) {
  const sorted = [...data].sort((a, b) => b.penalties - a.penalties).slice(0, 10);
  return (
    <ChartContainer title="⚽ Flest straffar utdelade (Topp 10)">
      <BarChart data={sorted}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fill: "#fff" }} />
        <YAxis tick={{ fill: "#fff" }} />
        <Tooltip contentStyle={{ backgroundColor: "#1E3A8A", borderColor: "#4b5563" }} />
        <Bar dataKey="penalties" fill="#3B82F6" />
      </BarChart>
    </ChartContainer>
  );
}

export function CardsVsPenaltiesChart({ data }) {
  const sorted = [...data].sort((a, b) => (b.avgCards + b.penalties) - (a.avgCards + a.penalties)).slice(0, 10);
  return (
    <ChartContainer title="⚖️ Kort vs Straffar per domare (Topp 10)">
      <BarChart data={sorted}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fill: "#fff" }} />
        <YAxis tick={{ fill: "#fff" }} />
        <Tooltip contentStyle={{ backgroundColor: "#1E3A8A", borderColor: "#4b5563" }} />
        <Legend />
        <Bar dataKey="avgCards" fill="#FCD34D" name="Kort/match" />
        <Bar dataKey="penalties" fill="#3B82F6" name="Straffar" />
      </BarChart>
    </ChartContainer>
  );
}

function ChartContainer({ title, children }) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow hover:shadow-xl transition col-span-full">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}