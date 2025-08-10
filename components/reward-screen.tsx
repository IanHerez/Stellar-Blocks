"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface RewardScreenProps {
  onContinue: () => void
}

export function RewardScreen({ onContinue }: RewardScreenProps) {
  const [xlmTokens, setXlmTokens] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])
  const [showRewards, setShowRewards] = useState(false)

  useEffect(() => {
    // Generate falling XLM tokens
    const generateTokens = () => {
      const newTokens = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10,
        delay: Math.random() * 2,
      }))
      setXlmTokens(newTokens)
    }

    generateTokens()
    setTimeout(() => setShowRewards(true), 1500)
  }, [])

  const rewards = [
    { icon: "🏆", name: "Maestro de Redes", description: "Conectaste todos los nodos exitosamente", xlm: 100 },
    { icon: "⚡", name: "Bono de Velocidad", description: "Completado en menos de 2 minutos", xlm: 50 },
    { icon: "🎯", name: "Precisión Perfecta", description: "Sin conexiones fallidas", xlm: 75 },
    { icon: "🔓", name: "Nuevo Mundo Desbloqueado", description: "Token Town ya está disponible", xlm: 0 },
  ]

  const totalXLM = rewards.reduce((sum, reward) => sum + reward.xlm, 0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-gray-900">
        {/* Falling XLM Tokens */}
        {xlmTokens.map((token) => (
          <div
            key={token.id}
            className="absolute w-8 h-8 animate-fall"
            style={{
              left: `${token.x}%`,
              animationDelay: `${token.delay}s`,
              animationDuration: "4s",
            }}
          >
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-1">
              <Image
                src="/images/stellar-xlm-logo.jpeg"
                alt="Stellar XLM Logo"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
          </div>
        ))}

        {/* Particle Effects */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float-particle opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Success Message */}
      <div className="relative z-10 text-center mb-12">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold pixel-font text-cyan-400 mb-4 animate-glow-title">MISIÓN</h1>
          <h2 className="text-6xl md:text-8xl font-bold pixel-font text-green-400 animate-glow-success">
            ¡COMPLETADA!
          </h2>
        </div>

        {/* XLM Earned */}
        <div className="bg-gray-900/90 px-8 py-6 pixel-border-3d mb-8 inline-block">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-2">
              <Image
                src="/images/stellar-xlm-logo.jpeg"
                alt="Stellar XLM Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <div className="pixel-font text-white text-2xl">+{totalXLM} XLM</div>
              <div className="pixel-font text-cyan-300 text-sm">TOKENS GANADOS</div>
            </div>
          </div>
        </div>

        {/* Celebration Effects */}
        <div className="flex justify-center space-x-4 mb-8">
          {["🎉", "✨", "🎊", "⭐", "🎯"].map((emoji, i) => (
            <div key={i} className="text-4xl animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>
              {emoji}
            </div>
          ))}
        </div>
      </div>

      {/* Rewards Panel */}
      {showRewards && (
        <div className="relative z-10 bg-gray-900/95 p-8 pixel-border-3d max-w-4xl w-full animate-fade-in">
          <h3 className="text-3xl pixel-font text-cyan-400 text-center mb-8 animate-glow">RECOMPENSAS OBTENIDAS</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {rewards.map((reward, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-purple-600/80 to-indigo-600/80 p-6 pixel-border-3d animate-slide-up hover:scale-105 transition-transform duration-200"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl animate-float" style={{ animationDelay: `${index * 0.1}s` }}>
                    {reward.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="pixel-font text-white font-bold text-lg mb-1">{reward.name}</h4>
                    <p className="pixel-font text-white/80 text-sm mb-2">{reward.description}</p>
                    {reward.xlm > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center p-0.5">
                          <Image
                            src="/images/stellar-xlm-logo.jpeg"
                            alt="Stellar XLM Logo"
                            width={12}
                            height={12}
                            className="object-contain"
                          />
                        </div>
                        <span className="pixel-font text-yellow-400 text-sm">+{reward.xlm} XLM</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress to Next Milestone */}
          <div className="text-center mb-8">
            <p className="pixel-font text-cyan-300 text-lg mb-4">PROGRESO A MAESTRO STELLAR</p>
            <div className="max-w-md mx-auto">
              <div className="bg-gray-800 h-6 pixel-border mb-2">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full w-2/5 animate-glow-bar" />
              </div>
              <p className="pixel-font text-white text-sm">40% - ¡Sigue explorando el universo blockchain!</p>
            </div>
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <button
              onClick={onContinue}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold text-2xl px-16 py-6 pixel-border-3d transform hover:scale-105 transition-all duration-300 animate-glow-button pixel-font"
            >
              CONTINUAR AVENTURA
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
