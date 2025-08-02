export function getAllSeasons(matches: any[]): string[] {
    const seasons = matches.map(match => String(match.season));
    return [...new Set(seasons)].sort((a, b) => b.localeCompare(a));
  }
  