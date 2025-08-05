import { useState, useMemo } from "react";
import data from "../data/data.json";
import { CardsPerMonthChart } from "../components/charts/TrendCharts";
import FancyMultiSelect from "../components/FancyMultiSelect";
import { getAllReferees } from "../utils/getAllReferees";
import { getAllTeams } from "../utils/getAllTeams";
import { getAllSeasons } from "../utils/getAllSeasons";
import { filterMatches } from "../utils/filterMatches";
import { calculateRefereeStats } from "../utils/statHelpers";
import RefereeOverview from "@/components/RefereeOverview";
import StatsPanel from "@/components/StatsPanel";
import MatchList from "@/components/MatchList";

export default function DashboardPage() {
  const [selectedReferees, setSelectedReferees] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);

  const refereeOptions = getAllReferees(data).map((r) => ({
    label: `👨‍⚖️ ${r}`,
    value: r,
  }));
  const teamOptions = getAllTeams(data).map((t) => ({
    label: `🏟️ ${t}`,
    value: t,
  }));
  const seasonOptions = getAllSeasons(data).map((s) => ({
    label: "📅 " + s,
    value: s,
  }));

  const filteredMatches = filterMatches(data, {
    referees: selectedReferees,
    teams: selectedTeams,
    seasons: selectedSeasons,
    homeAway: [], // 👈 lägg till detta
  });

  const filteredRefereeStats = calculateRefereeStats(data);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dommarjävel</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FancyMultiSelect
  options={refereeOptions}
  selected={selectedReferees}
  onChange={setSelectedReferees}
  label="Domare"
/>

<FancyMultiSelect
  options={teamOptions}
  selected={selectedTeams}
  onChange={setSelectedTeams}
  label="Lag"
/>

<FancyMultiSelect
  options={seasonOptions}
  selected={selectedSeasons}
  onChange={setSelectedSeasons}
  label="Säsong"
/>

<FancyMultiSelect
  options={homeAwayOptions}
  selected={selectedHomeAway}
  onChange={setSelectedHomeAway}
  label="Hemma/Borta"
/>

      </div>

      <StatsPanel matches={filteredMatches} />
      <RefereeOverview stats={filteredRefereeStats} />
      <CardsPerMonthChart matches={filteredMatches} />
      <MatchList matches={filteredMatches} />
    </div>
  );
}