import React, { useState } from 'react';
import { 
  Gamepad2, Trophy, Coins, Users, Activity, 
  Settings, ToggleLeft, ToggleRight, CheckCircle2,
  Clock, Flame, Brain, Target, Info
} from 'lucide-react';

const GAMES_DATA = [
  {
    id: 'snake',
    name: 'Snake & Chase',
    icon: Flame,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    description: 'Classic snake game. Players earn coins based on the length of the snake and points scored.',
    config: {
      coinsPerPoint: 0.2, // 5 points = 1 coin
      dailyLimit: 3,
      enabled: true
    },
    stats: {
      playsToday: 1245,
      coinsRewarded: 8400
    }
  },
  {
    id: 'quiz',
    name: 'Brain Teaser Quiz',
    icon: Brain,
    color: 'text-indigo-500',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    description: 'Trivia quiz answering multiple choice questions. Rewards based on correct answers and speed.',
    config: {
      coinsPerPoint: 10, // 1 correct answer = 10 coins
      dailyLimit: 1,
      enabled: true
    },
    stats: {
      playsToday: 3420,
      coinsRewarded: 28500
    }
  },
  {
    id: 'speedtap',
    name: 'Speed Tap Challenge',
    icon: Activity,
    color: 'text-rose-500',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    description: 'Fast-paced screen tapping game. High score leaderboards determine the coin payout.',
    config: {
      coinsPerPoint: 0.1, // 10 taps = 1 coin
      dailyLimit: 5,
      enabled: false
    },
    stats: {
      playsToday: 0,
      coinsRewarded: 0
    }
  },
  {
    id: 'tictactoe',
    name: 'Tic Tac Toe',
    icon: Target,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    description: 'Play against Mynzo AI. Winning streaks unlock mystery boxes and extra coins.',
    config: {
      coinsPerPoint: 50, // 1 win = 50 coins
      dailyLimit: 3,
      enabled: true
    },
    stats: {
      playsToday: 890,
      coinsRewarded: 12500
    }
  }
];

export default function GameManager() {
  const [games, setGames] = useState(GAMES_DATA);
  const [saved, setSaved] = useState(false);

  const handleToggle = (id) => {
    setGames(prev => prev.map(g => 
      g.id === id ? { ...g, config: { ...g.config, enabled: !g.config.enabled } } : g
    ));
  };

  const handleConfigChange = (id, field, value) => {
    setGames(prev => prev.map(g => 
      g.id === id ? { ...g, config: { ...g.config, [field]: Number(value) } } : g
    ));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const totalPlays = games.reduce((acc, g) => acc + g.stats.playsToday, 0);
  const totalCoins = games.reduce((acc, g) => acc + g.stats.coinsRewarded, 0);

  return (
    <div className="space-y-6 pb-20 max-w-[1400px]">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 tracking-tight font-montserrat">Game Manager</h1>
          <p className="text-slate-500 mt-1">Configure user engagement games and adjust coin reward payouts.</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-7 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg ${saved ? 'bg-green-500 text-white' : 'bg-blue-500 text-white shadow-blue-100 hover:scale-105'}`}
        >
          {saved ? <CheckCircle2 size={16} /> : <Settings size={16} />}
          {saved ? 'Settings Applied!' : 'Save Game Settings'}
        </button>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center gap-5 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
            <Gamepad2 size={24} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Active Games</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{games.filter(g => g.config.enabled).length} / 4</h3>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center gap-5 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <Coins size={24} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Coins Distributed Today</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{(totalCoins).toLocaleString()}</h3>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center gap-5 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Total Plays Today</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{(totalPlays).toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 flex gap-3">
        <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800 font-medium leading-relaxed">
          <strong>Coin Economics:</strong> Modifying the "Coins Per Point" value directly affects your platform's liability. Ensure that game payouts align with your promotional budget. Games set to "Inactive" will immediately disappear from the User Frontend.
        </p>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {games.map(game => (
          <div key={game.id} className={`bg-white rounded-2xl border ${game.config.enabled ? 'border-slate-200 shadow-md' : 'border-slate-200 opacity-75 shadow-sm'} overflow-hidden flex flex-col transition-all duration-300`}>
            
            {/* Card Header */}
            <div className={`p-6 ${game.bg} border-b ${game.border} flex items-center justify-between`}>
              <div className="flex items-center gap-4">
                <div className={`p-3 bg-white rounded-xl shadow-sm ${game.color}`}>
                  <game.icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{game.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${game.config.enabled ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-500'}`}>
                      {game.config.enabled ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </div>
                </div>
              </div>
              <button onClick={() => handleToggle(game.id)}>
                {game.config.enabled
                  ? <ToggleRight size={36} className="text-blue-500" />
                  : <ToggleLeft size={36} className="text-slate-300" />
                }
              </button>
            </div>

            {/* Card Body */}
            <div className="p-6 flex-1 space-y-6">
              <p className="text-sm text-slate-600 leading-relaxed font-medium">{game.description}</p>

              <div className="grid grid-cols-2 gap-4">
                {/* Config: Coins */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Coins Per Win/Point</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500">
                      <Coins size={16} />
                    </div>
                    <input 
                      type="number" 
                      step="0.1"
                      value={game.config.coinsPerPoint}
                      onChange={(e) => handleConfigChange(game.id, 'coinsPerPoint', e.target.value)}
                      disabled={!game.config.enabled}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-blue-100 outline-none disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Config: Limit */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Daily Play Limit</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <Clock size={16} />
                    </div>
                    <input 
                      type="number" 
                      value={game.config.dailyLimit}
                      onChange={(e) => handleConfigChange(game.id, 'dailyLimit', e.target.value)}
                      disabled={!game.config.enabled}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-blue-100 outline-none disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer (Stats) */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm">
                <Users size={16} className="text-slate-400" />
                <span className="font-semibold text-slate-700">{game.stats.playsToday.toLocaleString()}</span>
                <span className="text-slate-500">plays today</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Trophy size={16} className="text-amber-500" />
                <span className="font-semibold text-slate-700">{game.stats.coinsRewarded.toLocaleString()}</span>
                <span className="text-slate-500">coins paid</span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
