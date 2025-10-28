
import React, { useState, useEffect } from 'react';
import { Player } from '../types';

interface ScoreboardProps {
  players: Player[];
  onAddMatch: (match: {
    player1Id: string;
    player2Id: string;
    player1Score: number;
    player2Score: number;
    winnerId: string;
  }) => void;
}

const WINNING_SCORE = 11;

const Scoreboard: React.FC<ScoreboardProps> = ({ players, onAddMatch }) => {
  const [player1Id, setPlayer1Id] = useState<string>('');
  const [player2Id, setPlayer2Id] = useState<string>('');
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winnerId, setWinnerId] = useState<string | null>(null);

  useEffect(() => {
    if (players.length >= 2) {
      if (!player1Id) setPlayer1Id(players[0].id);
      if (!player2Id) setPlayer2Id(players[1].id);
    }
  }, [players, player1Id, player2Id]);

  useEffect(() => {
    const checkGameOver = () => {
      if ((score1 >= WINNING_SCORE || score2 >= WINNING_SCORE) && Math.abs(score1 - score2) >= 2) {
        const winner = score1 > score2 ? player1Id : player2Id;
        setWinnerId(winner);
        setGameOver(true);
      }
    };
    checkGameOver();
  }, [score1, score2, player1Id, player2Id]);

  const handleReset = () => {
    setScore1(0);
    setScore2(0);
    setGameOver(false);
    setWinnerId(null);
  };
  
  const handleFinishMatch = () => {
    if (gameOver && winnerId && player1Id && player2Id) {
      onAddMatch({
        player1Id,
        player2Id,
        player1Score: score1,
        player2Score: score2,
        winnerId,
      });
      handleReset();
    }
  };

  const availablePlayersForP1 = players.filter(p => p.id !== player2Id);
  const availablePlayersForP2 = players.filter(p => p.id !== player1Id);

  if (players.length < 2) {
    return (
      <div className="text-center p-4 bg-secondary-container text-on-secondary-container rounded-2xl">
        <p>You need at least two players to start a match. Please add players in the 'Players' tab.</p>
      </div>
    );
  }

  const PlayerDisplay: React.FC<{
    playerId: string | undefined, 
    score: number, 
    onIncrement: () => void,
    isWinner: boolean
  }> = ({ playerId, score, onIncrement, isWinner }) => {
    const player = players.find(p => p.id === playerId);
    return (
      <div className={`flex flex-col items-center justify-between p-4 rounded-3xl transition-all duration-300 ${isWinner ? 'bg-tertiary-container' : 'bg-surface-variant'}`}>
        <h2 className="text-xl font-bold text-on-surface-variant truncate max-w-full">{player?.name || 'Select Player'}</h2>
        <p className="text-7xl font-light my-6 text-on-surface">{score}</p>
        <button
          onClick={onIncrement}
          disabled={gameOver}
          className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg disabled:bg-outline disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <select value={player1Id} onChange={e => setPlayer1Id(e.target.value)} className="w-full p-3 bg-surface-variant rounded-full text-on-surface-variant outline-none border-2 border-outline focus:border-primary">
          {availablePlayersForP1.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select value={player2Id} onChange={e => setPlayer2Id(e.target.value)} className="w-full p-3 bg-surface-variant rounded-full text-on-surface-variant outline-none border-2 border-outline focus:border-primary">
          {availablePlayersForP2.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PlayerDisplay playerId={player1Id} score={score1} onIncrement={() => setScore1(s => s + 1)} isWinner={winnerId === player1Id} />
        <PlayerDisplay playerId={player2Id} score={score2} onIncrement={() => setScore2(s => s + 1)} isWinner={winnerId === player2Id} />
      </div>

      {gameOver && (
        <div className="text-center p-4 bg-tertiary-container text-on-tertiary-container rounded-2xl animate-pulse">
          <p className="font-bold text-lg">Game Over! Winner is {players.find(p => p.id === winnerId)?.name}</p>
        </div>
      )}
      
      <div className="flex justify-center items-center gap-4 mt-4">
        <button onClick={handleReset} className="py-3 px-6 bg-secondary-container text-on-secondary-container font-semibold rounded-full shadow-sm">Reset</button>
        <button onClick={handleFinishMatch} disabled={!gameOver} className="py-3 px-6 bg-primary text-white font-semibold rounded-full shadow-lg disabled:bg-outline disabled:cursor-not-allowed">Finish & Save Match</button>
      </div>

    </div>
  );
};

export default Scoreboard;
