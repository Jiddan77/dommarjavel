import { useState } from "react";
import data from "../data/data.json";
import FancyMultiSelect from "../components/FancyMultiSelect";
import StatsPanel from "../components/StatsPanel";
import MatchList from "../components/MatchList";
import getAllReferees from "../utils/getAllReferees";
import filterMatches from "../utils/filterMatches";
import { motion, AnimatePresence } from "framer-motion";

export default function DomareView() {
  const [selectedReferees, setSelectedReferees] = useState<string[]>([]);

  const refereeOptions = getAllReferees(data).map((ref) => ({
    label: "🧑‍⚖️ " + ref,
    value: ref,
  }));

  const filteredMatches = filterMatches(data.matches, {
    referees: selectedReferees,
  });

  return (
    <main className="min-h-screen p-4 bg-gray-950 text-white">
      <h1 className="text-2xl font-bold mb-4">👨‍⚖️ Utforska Domare</h1>
      <div className="mb-6 max-w-xl">
        <FancyMultiSelect
          options={refereeOptions}
          selected={selectedReferees}
          onChange={setSelectedReferees}
          placeholder="Välj en eller flera domare"
        />
      </div>

      <AnimatePresence mode="wait">
        {selectedReferees.length > 0 && (
          <motion.div
            key={selectedReferees.join(",")}
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