
import React, { useState } from 'react';
import { Player } from '../types';

interface PlayersProps {
  players: Player[];
  onAddPlayer: (name: string) => void;
}

const PlayerForm: React.FC<{ onAddPlayer: (name: string) => void }> = ({ onAddPlayer }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPlayer(name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome do novo jogador"
        className="flex-grow p-3 bg-surface-variant rounded-full text-on-surface-variant outline-none border-2 border-outline focus:border-primary"
      />
      <button type="submit" className="px-6 bg-primary text-white font-semibold rounded-full shadow-lg">
        Adicionar
      </button>
    </form>
  );
};

const PlayerList: React.FC<{ players: Player[] }> = ({ players }) => {
    if (players.length === 0) {
        return (
            <div className="text-center p-4 bg-secondary-container text-on-secondary-container rounded-2xl">
                <p>Nenhum jogador ainda. Adicione um acima!</p>
            </div>
        );
    }
    
    return (
        <div className="space-y-2">
        {players.map((player) => (
            <div key={player.id} className="p-4 bg-surface-variant rounded-2xl">
                <p className="text-on-surface-variant font-medium">{player.name}</p>
            </div>
        ))}
        </div>
    );
};


const Players: React.FC<PlayersProps> = ({ players, onAddPlayer }) => {
  return (
    <div>
      <PlayerForm onAddPlayer={onAddPlayer} />
      <h2 className="text-lg font-bold text-on-surface mb-4">Jogadores Cadastrados</h2>
      <PlayerList players={players} />
    </div>
  );
};

export default Players;
