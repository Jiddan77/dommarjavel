'use client';

type Match = {
  score: string;
  yellow: string;
  red: string;
  penalty: string;
  home: string;
  away: string;
};

function parseStat(stat: string): [number, number] {
  return stat.split('–').map(Number) as [number, number];
}

export default function StatsPanel({
  filteredMatches,
  selectedTeams
}: {
  filteredMatches: Match[];
  selectedTeams: string[];
}) {
  const totalTeams = selectedTeams.length;
  if (filteredMatches.length === 0 || totalTeams === 0) return null;

  let totalGames = 0;
  let wins = 0, draws = 0, losses = 0;
  let yellow = 0, red = 0, penalty = 0;
  let yellowHits = 0, redHits = 0, penaltyHits = 0;

  for (const match of filteredMatches) {
    const [gH, gA] = match.score.split('–').map(Number);
    const [yH, yA] = parseStat(match.yellow);
    const [rH, rA] = parseStat(match.red);
    const [pH, pA] = parseStat(match.penalty);

    for (const team of selectedTeams) {
      const isHome = match.home === team;
      const isAway = match.away === team;
      if (!isHome && !isAway) continue;

      totalGames += 1;

      const teamGoals = isHome ? gH : gA;
      const oppGoals = isHome ? gA : gH;
      const teamY = isHome ? yH : yA;
      const teamR = isHome ? rH : rA;
      const teamP = isHome ? pH : pA;

      if (teamGoals > oppGoals) wins++;
      else if (teamGoals === oppGoals) draws++;
      else losses++;

      yellow += teamY;
      red += teamR;
      penalty += teamP;

      if (teamY > 0) yellowHits++;
      if (teamR > 0) redHits++;
      if (teamP > 0) penaltyHits++;
    }
  }

  const percent = (n: number) => totalGames > 0 ? `${Math.round((n / totalGames) * 100)} %` : "–";

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <StatCard title="⚔️ Matcher" value={totalGames.toString()} />
      <StatCard title="🏆 Vinst–Oavgjort–Förlust" value={`${wins}–${draws}–${losses} (${percent(wins)})`} />
      <StatCard title="🟨 Gula kort (snitt)" value={`${(yellow / totalGames).toFixed(2)} / match`} sub={`Sannolikhet: ${percent(yellowHits)}`} />
      <StatCard title="🟥 Röda kort (snitt)" value={`${(red / totalGames).toFixed(2)} / match`} sub={`Sannolikhet: ${percent(redHits)}`} />
      <StatCard title="⚖️ Straffar (snitt)" value={`${(penalty / totalGames).toFixed(2)} / match`} sub={`Sannolikhet: ${percent(penaltyHits)}`} />
    </section>
  );
}

function StatCard({ title, value, sub }: { title: string; value: string; sub?: string }) {
  return (
    <div className="bg-white/5 rounded-xl p-4">
      <h3 className="text-sm text-gray-400">{title}</h3>
      <p className="text-xl font-bold text-white">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}
