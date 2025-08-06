import data from "../data/data.json";
import { useMemo } from "react";
import { calculateRefereeStats } from "@/utils/statHelpers";
import RefereeOverview from "@/components/RefereeOverview";
import { CardsPerMonthChart } from "@/components/charts/TrendCharts";
import TeamCardsChart from "@/components/charts/TeamCharts";

export default function StatistikPage() {
  // Här använder vi alla matcher och ingen filtrering
  const stats = useMemo(() => calculateRefereeStats(data), []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Statistik</h1>

      {/* Här skickar vi alla matcher och tom lista av lag till RefereeOverview */}
      <RefereeOverview allMatches={data} selectedTeams={[]} />

      <div className="mt-8">
        <TeamCardsChart matches={data} />
      </div>

      <div className="mt-8">
        <CardsPerMonthChart matches={data} />
      </div>
    </div>
  );
}