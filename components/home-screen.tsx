"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface HomeScreenProps {
  onStart: () => void
}

export function HomeScreen({ onStart }: HomeScreenProps) {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; opacity: number }>>([])

  useEffect(() => {
    // Generate animated stars
    const generateStars = () => {
      const newStars = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.8 + 0.2,
      }))
      setStars(newStars)
    }

    generateStars()
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* City Background */}
        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-30">
          <Image
            src="/images/city-background.png"
            alt="City Background"
            fill
            className="object-cover object-bottom"
            priority
          />
        </div>

        {/* Stars */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-cyan-300 rounded-full animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full max-w-4xl mx-auto">
        {/* Main Logo Section */}
        <div className="text-center mb-16 flex-1 flex flex-col items-center justify-center">
          <div className="relative w-[600px] h-[300px] mx-auto mb-12 max-w-[90vw]">
            <Image
              src="/images/stellar-logo.png"
              alt="Stellar Blocks Logo"
              fill
              className="object-contain animate-glow-logo drop-shadow-2xl"
              priority
            />
          </div>

          {/* Subtitle */}
          <p className="text-2xl md:text-3xl pixel-font text-cyan-300 mb-12 animate-fade-in-up tracking-wider drop-shadow-lg">
            APRENDE BLOCKCHAIN JUGANDO
          </p>
        </div>

        {/* Main Menu Section */}
        <div className="space-y-8 flex-shrink-0 mb-8">
          {/* Play Button */}
          <div className="text-center">
            <button
              onClick={onStart}
              className="group relative bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:via-blue-400 hover:to-purple-500 text-white font-bold text-3xl px-20 py-8 pixel-border-3d transform hover:scale-105 transition-all duration-300 pixel-font shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-30 animate-pulse rounded-sm" />
              <span className="relative z-10 tracking-wider">JUGAR</span>
            </button>
          </div>

          {/* Secondary Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="bg-gray-800/90 hover:bg-gray-700 text-cyan-300 font-bold px-10 py-4 pixel-border-3d pixel-font transition-all duration-200 hover:text-white hover:scale-105 text-lg tracking-wide">
              OPCIONES
            </button>
            <button className="bg-gray-800/90 hover:bg-gray-700 text-cyan-300 font-bold px-10 py-4 pixel-border-3d pixel-font transition-all duration-200 hover:text-white hover:scale-105 text-lg tracking-wide">
              CRÉDITOS
            </button>
          </div>
        </div>
      </div>

      {/* Particle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float-particle opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
