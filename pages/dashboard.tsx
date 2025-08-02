import { useState } from "react";
import data from "../data/data.json";
import { RefereeCardsBarChart, RefereePenaltiesChart, CardsVsPenaltiesChart } from "../components/charts/RefereeCharts";
import { TeamCardsChart, TeamRedCardsChart, TeamPenaltiesChart } from "../components/charts/TeamCharts";
import { CardsPerMonthChart } from "../components/charts/TrendCharts";
import FancyMultiSelect from "../components/FancyMultiSelect";
import { getAllReferees } from "../utils/getAllReferees";
import { getAllTeams } from "../utils/getAllTeams";
import { getAllSeasons } from "../utils/getAllSeasons";
import { filterMatches } from "../utils/filterMatches";
import { calculateRefereeStats } from "../utils/statHelpers";

export default function DashboardView() {
  const [selectedReferees, setSelectedReferees] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);

  const refereeOptions = getAllReferees(data).map((ref) => ({ label: "👨‍⚖️ " + ref, value: ref }));
  const teamOptions = getAllTeams(data).map((team) => ({ label: "🏟 " + team, value: team }));
  const seasonOptions = getAllSeasons(data).map((s) => ({ label: "📅 " + s, value: s }));

  const filteredMatches = filterMatches(data.matches, {
    referees: selectedReferees,
    teams: selectedTeams,
    seasons: selectedSeasons,
  });

  const filteredRefereeStats = calculateRefereeStats(filteredMatches);

  return (
    <main className="min-h-screen p-4 bg-gray-950 text-white">
      <h1 className="text-3xl font-bold mb-6">📊 Interaktiv Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <FancyMultiSelect options={refereeOptions} selected={selectedReferees} onChange={setSelectedReferees} placeholder="Välj domare" />
        <FancyMultiSelect options={teamOptions} selected={selectedTeams} onChange={setSelectedTeams} placeholder="Välj lag" />
        <FancyMultiSelect options={seasonOptions} selected={selectedSeasons} onChange={setSelectedSeasons} placeholder="Välj säsong" />
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">👨‍⚖️ Domarstatistik</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RefereeCardsBarChart data={filteredRefereeStats.all} />
          <RefereePenaltiesChart data={filteredRefereeStats.all} />
          <CardsVsPenaltiesChart data={filteredRefereeStats.all} />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">🏟 Lagstatistik</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TeamCardsChart matches={filteredMatches} />
          <TeamRedCardsChart matches={filteredMatches} />
          <TeamPenaltiesChart matches={filteredMatches} />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">📅 Trender över tid</h2>
        <CardsPerMonthChart matches={filteredMatches} />
      </section>
    </main>
  );
}