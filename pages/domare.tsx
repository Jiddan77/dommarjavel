import { useState } from "react";
import data from "../data/data.json";
import MatchList from "@/components/MatchList";
import { getAllReferees } from "../utils/getAllReferees";
import { filterMatches } from "../utils/filterMatches";
import FancyMultiSelect from "@/components/FancyMultiSelect";
import RefereeCharts from "@/components/charts/RefereeCharts";

export default function DomarePage() {
  const [selectedReferees, setSelectedReferees] = useState<string[]>([]);

  const refereeOptions = getAllReferees(data).map((r) => ({
    label: `👨‍⚖️ ${r}`,
    value: r,
  }));

  const filteredMatches = filterMatches(data, {
    referees: selectedReferees,
    teams: [],
    seasons: [],
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Domare</h1>

      <div className="max-w-md">
        <FancyMultiSelect
          options={refereeOptions}
          value={selectedReferees}
          onChange={setSelectedReferees}
          label="Välj domare"
        />
      </div>

      <RefereeCharts matches={filteredMatches} />
      <MatchList matches={filteredMatches} />
    </div>
  );
}