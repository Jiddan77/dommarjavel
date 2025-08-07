import { parseSwedishDate } from "@/utils/parseSwedishDate";

interface Match {
  date: string;
  home: string;
  away: string;
  score: string;
  referee: string;
  yellow: string;
  red: string;
  penalty: string;
}

export default function MatchList({ matches }: { matches: Match[] }) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-4">Matcher</h2>
      <div className="space-y-4">
        {matches.map((match, i) => {
          const date = parseSwedishDate(match.date);
          const formattedDate = date
            ? date.toLocaleDateString("sv-SE", { weekday: "short", day: "numeric", month: "short" })
            : "Okänt datum";

          return (
            <div key={i} className="bg-gray-800 text-white p-4 rounded-xl shadow-md">
              <div className="font-semibold">
                {formattedDate} {match.home} {match.score} {match.away}
              </div>
              <div className="text-sm text-gray-300">Domare: {match.referee}</div>
              <div className="mt-1 text-sm text-gray-300">
                Gula kort: {match.yellow} | Röda kort: {match.red} | Straffar: {match.penalty}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}