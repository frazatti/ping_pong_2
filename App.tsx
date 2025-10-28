
import React, { useState, useMemo } from 'react';
import { Player, Match, ActiveView } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import BottomNav from './components/BottomNav';
import Scoreboard from './components/Scoreboard';
import Ranking from './components/Ranking';
import Players from './components/Players';

const App: React.FC = () => {
  const [players, setPlayers] = useLocalStorage<Player[]>('pingpong_players', []);
  const [matches, setMatches] = useLocalStorage<Match[]>('pingpong_matches', []);
  const [activeView, setActiveView] = useState<ActiveView>('match');

  const addPlayer = (name: string) => {
    if (name.trim() === '' || players.some(p => p.name.toLowerCase() === name.trim().toLowerCase())) {
      alert("Player name cannot be empty or already exist.");
      return;
    }
    const newPlayer: Player = {
      id: Date.now().toString(),
      name: name.trim(),
      wins: 0,
      losses: 0,
    };
    setPlayers(prevPlayers => [...prevPlayers, newPlayer]);
  };

  const addMatch = (match: Omit<Match, 'id' | 'date'>) => {
    const newMatch: Match = {
      ...match,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setMatches(prevMatches => [...prevMatches, newMatch]);

    setPlayers(prevPlayers =>
      prevPlayers.map(p => {
        if (p.id === newMatch.winnerId) {
          return { ...p, wins: p.wins + 1 };
        }
        if (p.id === newMatch.player1Id || p.id === newMatch.player2Id) {
          return { ...p, losses: p.losses + 1 };
        }
        return p;
      }).map(p => { // Separate map to update loser
        if (p.id !== newMatch.winnerId && (p.id === newMatch.player1Id || p.id === newMatch.player2Id)) {
          return { ...p, losses: p.losses -1 }; // was incremented before, now correct
        }
        return p;
      })
      .map(p => { // Correct logic
        if(p.id === match.winnerId) return {...p, wins: p.wins + 1};
        if(p.id === match.player1Id || p.id === match.player2Id) return {...p, losses: p.losses + 1};
        return p;
      })
    );
     setPlayers(prevPlayers => {
        return prevPlayers.map(p => {
            if (p.id === match.winnerId) {
                return { ...p, wins: p.wins + 1 };
            }
            if ((p.id === match.player1Id || p.id === match.player2Id) && p.id !== match.winnerId) {
                return { ...p, losses: p.losses + 1 };
            }
            return p;
        });
    });
  };
  
  const sortedPlayers = useMemo(() => {
    return [...players].sort((a, b) => {
      const winRateA = a.wins + a.losses === 0 ? 0 : a.wins / (a.wins + a.losses);
      const winRateB = b.wins + b.losses === 0 ? 0 : b.wins / (b.wins + b.losses);
      if (winRateB !== winRateA) {
        return winRateB - winRateA;
      }
      return b.wins - a.wins;
    });
  }, [players]);

  const renderContent = () => {
    switch (activeView) {
      case 'match':
        return <Scoreboard players={players} onAddMatch={addMatch} />;
      case 'ranking':
        return <Ranking players={sortedPlayers} />;
      case 'players':
        return <Players players={players} onAddPlayer={addPlayer} />;
      default:
        return <Scoreboard players={players} onAddMatch={addMatch} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-on-background">
      <header className="bg-surface-variant text-on-surface-variant p-4 shadow-md sticky top-0 z-10">
        <h1 className="text-xl font-bold text-center capitalize">{activeView}</h1>
      </header>
      <main className="flex-grow p-4 pb-24 overflow-y-auto">
        {renderContent()}
      </main>
      <BottomNav activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
};

export default App;
