export function getAllTeams(matches: any[]): string[] {
    const teams = matches.flatMap(match => [match.home, match.away]);
    return [...new Set(teams)].sort((a, b) => a.localeCompare(b, 'sv'));
  }
  