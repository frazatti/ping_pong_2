
import React from 'react';
import { ActiveView } from '../types';
import PingPongIcon from './icons/PingPongIcon';
import TrophyIcon from './icons/TrophyIcon';
import UsersIcon from './icons/UsersIcon';

interface BottomNavProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

const NavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => {
  const activeClasses = 'bg-primary-container text-on-primary-container';
  const inactiveClasses = 'text-on-surface-variant';
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 rounded-xl ${isActive ? activeClasses : inactiveClasses}`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeView, setActiveView }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface-variant shadow-[0_-2px_5px_rgba(0,0,0,0.1)] h-20 flex justify-around items-center px-2 pb-2 z-20">
      <div className="w-full max-w-md mx-auto grid grid-cols-3 gap-2">
        <NavItem
          label="Match"
          icon={<PingPongIcon className="w-6 h-6" />}
          isActive={activeView === 'match'}
          onClick={() => setActiveView('match')}
        />
        <NavItem
          label="Ranking"
          icon={<TrophyIcon className="w-6 h-6" />}
          isActive={activeView === 'ranking'}
          onClick={() => setActiveView('ranking')}
        />
        <NavItem
          label="Players"
          icon={<UsersIcon className="w-6 h-6" />}
          isActive={activeView === 'players'}
          onClick={() => setActiveView('players')}
        />
      </div>
    </nav>
  );
};

export default BottomNav;
