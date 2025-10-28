
export interface Player {
  id: string;
  name: string;
  wins: number;
  losses: number;
}

export interface Match {
  id: string;
  player1Id: string;
  player2Id: string;
  player1Score: number;
  player2Score: number;
  winnerId: string;
  date: string;
}

export type ActiveView = 'match' | 'ranking' | 'players';
