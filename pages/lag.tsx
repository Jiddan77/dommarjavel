import { useState } from "react";
import data from "../data/data.json";
import FancyMultiSelect from "../components/FancyMultiSelect";
import StatsPanel from "../components/StatsPanel";
import MatchList from "../components/MatchList";
import getAllTeams from "../utils/getAllTeams";
import getAllSeasons from "../utils/getAllSeasons";
import getHomeAwayOptions from "../utils/getHomeAwayOptions";
import filterMatches from "../utils/filterMatches";
import { motion, AnimatePresence } from "framer-motion";

export default function LagView() {
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [selectedHomeAway, setSelectedHomeAway] = useState<string[]>([]);

  const teamOptions = getAllTeams(data).map((team) => ({
    label: "🏟 " + team,
    value: team,
  }));

  const seasonOptions = getAllSeasons(data).map((s) => ({
    label: "📅 " + s,
    value: s,
  }));

  const homeAwayOptions = getHomeAwayOptions().map((opt) => ({
    label: opt === "home" ? "🏠 Hemma" : "🚌 Borta",
    value: opt,
  }));

  const filteredMatches = filterMatches(data.matches, {
    teams: selectedTeams,
    seasons: selectedSeasons,
    home_away: selectedHomeAway,
  });

  return (
    <main className="min-h-screen p-4 bg-gray-950 text-white">
      <h1 className="text-2xl font-bold mb-4">🏟 Utforska Lag</h1>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <FancyMultiSelect
          options={teamOptions}
          selected={selectedTeams}
          onChange={setSelectedTeams}
          placeholder="Välj lag"
        />
        <FancyMultiSelect
          options={seasonOptions}
          selected={selectedSeasons}
          onChange={setSelectedSeasons}
          placeholder="Välj säsong"
        />
        <FancyMultiSelect
          options={homeAwayOptions}
          selected={selectedHomeAway}
          onChange={setSelectedHomeAway}
          placeholder="Hemma eller borta"
        />
      </div>

      <AnimatePresence mode="wait">
        {filteredMatches.length > 0 && (
          <motion.div
            key={selectedTeams.join(",") + selectedSeasons.join(",") + selectedHomeAway.join(",")}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <StatsPanel matches={filteredMatches} />
            <MatchList matches={filteredMatches} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}