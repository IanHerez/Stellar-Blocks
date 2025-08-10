"use client"

import Image from "next/image"

interface LevelSelectScreenProps {
  onSelectLevel: (levelId: string) => void
  onBack: () => void
}

const worlds = [
  {
    id: "decentralized",
    name: "MUNDO DECENTRALIZADO",
    description: "Explora las redes descentralizadas",
    color: "from-emerald-400 via-green-500 to-teal-600",
    bgColor: "bg-emerald-900/20",
    icon: "🌐",
    completed: true,
    characters: ["👨‍💻", "🔗", "🌍"],
  },
  {
    id: "wallet",
    name: "CIUDAD DE LA CARTERA",
    description: "Domina las carteras digitales",
    color: "from-purple-400 via-violet-500 to-indigo-600",
    bgColor: "bg-purple-900/20",
    icon: "🏦",
    completed: true,
    characters: ["💳", "🏛️", "💰"],
  },
  {
    id: "token",
    name: "CIUDAD DE TOKENS",
    description: "Comercia con tokens",
    color: "from-orange-400 via-amber-500 to-yellow-600",
    bgColor: "bg-orange-900/20",
    icon: "🪙",
    completed: false,
    characters: ["🛒", "💎", "⚡"],
  },
  {
    id: "soroban",
    name: "LABORATORIO SOROBAN",
    description: "Experimenta con smart contracts",
    color: "from-cyan-400 via-blue-500 to-teal-600",
    bgColor: "bg-cyan-900/20",
    icon: "🧪",
    completed: false,
    characters: ["⚗️", "🔬", "🤖"],
  },
  {
    id: "treasure",
    name: "CAMINO DEL TESORO",
    description: "Encuentra el tesoro final",
    color: "from-purple-600 via-indigo-700 to-gray-800",
    bgColor: "bg-purple-900/20",
    icon: "💎",
    completed: false,
    characters: ["🗝️", "👑", "✨"],
  },
]

export function LevelSelectScreen({ onSelectLevel, onBack }: LevelSelectScreenProps) {
  const completedWorlds = worlds.filter((world) => world.completed).length
  const totalWorlds = worlds.length
  const progress = (completedWorlds / totalWorlds) * 100

  return (
    <div className="min-h-screen p-8 relative overflow-hidden pb-32">
      {/* Background */}
      <div className="absolute inset-0 opacity-20">
        <Image src="/images/game-interface.png" alt="Game Interface Background" fill className="object-cover" />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-12">
        <button
          onClick={onBack}
          className="absolute top-0 left-0 bg-gray-800/90 hover:bg-gray-700 text-cyan-300 px-8 py-4 pixel-border-3d pixel-font transition-all duration-200 text-lg"
        >
          ← VOLVER
        </button>

        <h1 className="text-5xl md:text-7xl font-bold pixel-font text-white mb-8 animate-glow-title tracking-wider">
          BLOQUES ESTELARES
        </h1>

        {/* HUD Style Header */}
        <div className="flex justify-between items-center max-w-5xl mx-auto mb-10">
          <div className="bg-gray-900/90 px-8 py-4 pixel-border-3d">
            <span className="pixel-font text-cyan-300 text-lg">INFORMACIÓN</span>
          </div>
          <div className="bg-gray-900/90 px-8 py-4 pixel-border-3d flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center p-1">
              <Image
                src="/images/stellar-xlm-logo.jpeg"
                alt="Stellar XLM Logo"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            <span className="pixel-font text-white text-xl">500 XLM</span>
          </div>
        </div>

        {/* Progress Chain */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gray-900/90 p-6 pixel-border-3d">
            <div className="flex items-center justify-between mb-4">
              <span className="pixel-font text-cyan-300 text-lg">PROGRESO TOTAL</span>
              <span className="pixel-font text-white text-lg">
                {completedWorlds}/{totalWorlds}
              </span>
            </div>
            <div className="bg-gray-800 h-6 pixel-border mb-2">
              <div
                className="bg-gradient-to-r from-cyan-400 to-blue-600 h-full transition-all duration-1000 animate-glow-bar"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="pixel-font text-white/80 text-center mt-2">{Math.round(progress)}% completado</p>
          </div>
        </div>
      </div>

      {/* Worlds Grid */}
      <div className="relative z-10 max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {worlds.map((world, index) => (
            <div key={world.id} className="relative group">
              {/* Connection Chain */}
              {index < worlds.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 z-0 animate-pulse" />
              )}

              {/* World Card */}
              <div
                className={`relative cursor-pointer transform hover:scale-105 transition-all duration-300 ${
                  world.completed ? "" : "opacity-60"
                }`}
                onClick={() => world.completed && onSelectLevel(world.id)}
              >
                <div
                  className={`bg-gradient-to-br ${world.color} p-8 pixel-border-3d relative overflow-hidden min-h-[240px] shadow-2xl`}
                >
                  {/* Lock Overlay */}
                  {!world.completed && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
                      <div className="text-5xl animate-pulse">🔒</div>
                    </div>
                  )}

                  {/* World Content */}
                  <div className="relative z-5 text-center">
                    {/* World Icon */}
                    <div className="text-5xl mb-4 animate-float">{world.icon}</div>

                    {/* World Name */}
                    <h3 className="text-sm font-bold pixel-font text-white mb-3 leading-tight tracking-wide">
                      {world.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs pixel-font text-white/90 mb-4 leading-relaxed">{world.description}</p>

                    {/* Characters */}
                    <div className="flex justify-center space-x-2 mb-2">
                      {world.characters.map((char, i) => (
                        <span key={i} className="text-xl animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>
                          {char}
                        </span>
                      ))}
                    </div>

                    {/* Completion Badge */}
                    {world.completed && (
                      <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 pixel-border text-xs pixel-font">
                        ✓
                      </div>
                    )}
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation - Fixed with proper spacing */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 bg-gray-900/95 p-4 pixel-border-3d backdrop-blur-sm">
        <div className="flex gap-6">
          <button className="bg-gray-800/90 hover:bg-gray-700 text-cyan-300 px-8 py-4 pixel-border-3d pixel-font transition-all duration-200 text-base hover:scale-105">
            JUGAR
          </button>
          <button className="bg-gray-800/90 hover:bg-gray-700 text-cyan-300 px-8 py-4 pixel-border-3d pixel-font transition-all duration-200 text-base hover:scale-105">
            INVENTARIO
          </button>
          <button className="bg-gray-800/90 hover:bg-gray-700 text-cyan-300 px-8 py-4 pixel-border-3d pixel-font transition-all duration-200 text-base hover:scale-105">
            VER BLOQUES
          </button>
          <button className="bg-blue-600/90 hover:bg-blue-500 text-white px-8 py-4 pixel-border-3d pixel-font transition-all duration-200 text-base hover:scale-105">
            CONECTAR WALLET
          </button>
        </div>
      </div>
    </div>
  )
}
