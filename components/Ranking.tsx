
import React from 'react';
import { Player } from '../types';
import TrophyIcon from './icons/TrophyIcon';

interface RankingProps {
  players: Player[];
}

const Ranking: React.FC<RankingProps> = ({ players }) => {
  if (players.length === 0) {
    return (
      <div className="text-center p-4 bg-secondary-container text-on-secondary-container rounded-2xl">
        <p>Nenhum jogador disponível. Adicione alguns jogadores para ver o ranking.</p>
      </div>
    );
  }

  const getRankColor = (rank: number) => {
    switch(rank) {
      case 1: return 'text-yellow-500';
      case 2: return 'text-gray-400';
      case 3: return 'text-yellow-700';
      default: return 'text-outline';
    }
  }

  return (
    <div className="space-y-3">
      {players.map((player, index) => {
        const rank = index + 1;
        const totalGames = player.wins + player.losses;
        const winRate = totalGames === 0 ? 0 : (player.wins / totalGames) * 100;
        
        return (
          <div key={player.id} className="flex items-center p-4 bg-surface-variant rounded-2xl shadow-sm">
            <div className="flex items-center justify-center w-12 text-2xl font-bold">
              <span className={getRankColor(rank)}>{rank}</span>
              {rank <= 3 && <TrophyIcon className={`w-6 h-6 ml-1 ${getRankColor(rank)}`} />}
            </div>
            <div className="flex-grow ml-4">
              <p className="text-lg font-bold text-on-surface-variant">{player.name}</p>
              <div className="flex text-sm text-on-surface-variant space-x-4">
                <span>V: {player.wins}</span>
                <span>D: {player.losses}</span>
                <span>Taxa de Vit.: {winRate.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Ranking;
