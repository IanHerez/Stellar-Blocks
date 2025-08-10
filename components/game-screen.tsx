"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface GameScreenProps {
  levelId: string
  onComplete: () => void
  onBack: () => void
}

export function GameScreen({ levelId, onComplete, onBack }: GameScreenProps) {
  const [score, setScore] = useState(1250)
  const [gameProgress, setGameProgress] = useState(0) // 0-100%
  const [criticalError, setCriticalError] = useState(false)

  // Game state for Decentralized World (Node Connection)
  const [nodes, setNodes] = useState<Array<{ id: number; x: number; y: number; connected: boolean; color: string }>>([])
  const [nodeParticles, setNodeParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  // Game state for Wallet City (Wallet Matching)
  const [walletQuestion, setWalletQuestion] = useState<{
    question: string
    options: { id: string; icon: string; correct: boolean }[]
  } | null>(null)
  const [selectedWalletOption, setSelectedWalletOption] = useState<string | null>(null)
  const [walletFeedback, setWalletFeedback] = useState<"correct" | "incorrect" | null>(null)
  const [walletRound, setWalletRound] = useState(0)
  const maxWalletRounds = 3

  useEffect(() => {
    if (levelId === "decentralized") {
      // Initialize nodes for Decentralized World
      const centerX = 400
      const centerY = 300
      const radius = 150

      const initialNodes = Array.from({ length: 8 }, (_, i) => {
        const angle = (i * Math.PI * 2) / 8
        const colors = ["#FFD700", "#00BFFF", "#32CD32", "#FF6347"]
        return {
          id: i,
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          connected: false, // Start unconnected for gameplay
          color: colors[Math.floor(Math.random() * colors.length)],
        }
      })
      setNodes(initialNodes)
      setGameProgress(0)
      setCriticalError(false)
      // Simulate critical error after 3 seconds for visual effect
      setTimeout(() => setCriticalError(true), 3000)
    } else if (levelId === "wallet") {
      // Initialize game for Wallet City
      startNewWalletRound()
      setGameProgress(0)
      setWalletRound(0)
    }
  }, [levelId])

  useEffect(() => {
    if (levelId === "decentralized") {
      const connectedNodes = nodes.filter((node) => node.connected).length
      const progress = (connectedNodes / nodes.length) * 100
      setGameProgress(progress)
      if (progress === 100) {
        setTimeout(onComplete, 1000) // Complete level after all nodes are connected
      }
    } else if (levelId === "wallet") {
      if (walletRound >= maxWalletRounds && walletFeedback === "correct") {
        setGameProgress(100)
        setTimeout(onComplete, 1000) // Complete level after all rounds
      } else if (walletRound < maxWalletRounds && walletFeedback === "correct") {
        setTimeout(startNewWalletRound, 1000) // Start next round after a delay
      }
    }
  }, [nodes, walletRound, walletFeedback, onComplete, levelId])

  // --- Decentralized World Game Logic ---
  const handleNodeClick = (nodeId: number) => {
    setNodes((prev) =>
      prev.map((node) => (node.id === nodeId && !node.connected ? { ...node, connected: true } : node)),
    )
    setScore((prev) => prev + 50)

    // Add particle effect
    const clickedNode = nodes.find((n) => n.id === nodeId)
    if (clickedNode) {
      const newParticle = { id: Date.now(), x: clickedNode.x, y: clickedNode.y }
      setNodeParticles((prev) => [...prev, newParticle])
      setTimeout(() => {
        setNodeParticles((prev) => prev.filter((p) => p.id !== newParticle.id))
      }, 1000)
    }
  }

  // --- Wallet City Game Logic ---
  const walletQuestions = [
    {
      question:
        "¿Qué tipo de cartera es ideal para almacenar grandes cantidades de criptomonedas de forma segura sin conexión a internet?",
      options: [
        { id: "hot", icon: "🔥", correct: false },
        { id: "cold", icon: "❄️", correct: true },
        { id: "mobile", icon: "📱", correct: false },
      ],
    },
    {
      question:
        "¿Qué tipo de cartera es una aplicación en tu smartphone que te permite enviar y recibir criptomonedas fácilmente?",
      options: [
        { id: "desktop", icon: "💻", correct: false },
        { id: "hardware", icon: "🔑", correct: false },
        { id: "mobile", icon: "📱", correct: true },
      ],
    },
    {
      question: "¿Qué tipo de cartera se ejecuta en tu computadora y te da control total sobre tus claves privadas?",
      options: [
        { id: "web", icon: "🌐", correct: false },
        { id: "desktop", icon: "💻", correct: true },
        { id: "paper", icon: "📄", correct: false },
      ],
    },
  ]

  const startNewWalletRound = () => {
    if (walletRound < maxWalletRounds) {
      const nextQuestion = walletQuestions[walletRound]
      setWalletQuestion(nextQuestion)
      setSelectedWalletOption(null)
      setWalletFeedback(null)
      setWalletRound((prev) => prev + 1)
      setGameProgress(((walletRound + 1) / maxWalletRounds) * 100)
    }
  }

  const handleWalletOptionClick = (optionId: string, isCorrect: boolean) => {
    if (selectedWalletOption) return // Prevent multiple clicks
    setSelectedWalletOption(optionId)
    if (isCorrect) {
      setWalletFeedback("correct")
      setScore((prev) => prev + 200)
    } else {
      setWalletFeedback("incorrect")
      setScore((prev) => Math.max(0, prev - 100)) // Deduct score, but not below 0
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image src="/images/gameplay-scene.png" alt="Gameplay Background" fill className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900/80" />
      </div>

      {/* HUD */}
      <div className="relative z-10 p-6">
        <div className="flex justify-between items-start">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="bg-gray-800/90 hover:bg-gray-700 text-cyan-300 px-6 py-3 pixel-border-3d pixel-font transition-all duration-200"
          >
            ← VOLVER
          </button>

          {/* Score Display */}
          <div className="bg-gray-900/90 px-8 py-4 pixel-border-3d">
            <div className="pixel-font text-white text-xl">
              PUNTUACIÓN: <span className="text-cyan-400">{score}</span>
            </div>
            <div className="bg-gray-800 h-2 w-32 mt-2 pixel-border">
              <div
                className="bg-gradient-to-r from-cyan-400 to-blue-600 h-full transition-all duration-500"
                style={{ width: `${gameProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Game Title */}
        <div className="text-center mt-8 mb-4">
          <h1 className="text-4xl pixel-font text-white mb-2 animate-glow-title">
            {levelId === "decentralized" ? "MUNDO DECENTRALIZADO" : "CIUDAD DE LA CARTERA"}
          </h1>
          {criticalError && levelId === "decentralized" && (
            <div className="text-2xl pixel-font text-red-400 animate-pulse mb-4">ERROR CRÍTICO</div>
          )}
        </div>
      </div>

      {/* Game Area */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-8">
        {levelId === "decentralized" && (
          <div className="relative w-full max-w-4xl h-96">
            {/* Central Server */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-24 h-32 bg-gradient-to-b from-gray-400 via-gray-600 to-gray-800 pixel-border-3d animate-pulse">
                  <div className="absolute inset-2 bg-gray-700">
                    <div className="w-full h-1 bg-green-400 mb-1" />
                    <div className="w-full h-1 bg-green-400 mb-1" />
                    <div className="w-full h-1 bg-yellow-400 mb-1" />
                    <div className="w-full h-1 bg-red-400" />
                  </div>
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 pixel-font text-white text-sm">
                  NOVA
                </div>
                {criticalError && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-yellow-400 animate-ping"
                        style={{
                          left: `${Math.random() * 40 - 20}px`,
                          top: `${Math.random() * 40 - 20}px`,
                          animationDelay: `${Math.random() * 1}s`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Network Nodes */}
            {nodes.map((node) => (
              <div key={node.id} className="absolute">
                <button
                  onClick={() => handleNodeClick(node.id)}
                  className={`w-8 h-8 pixel-border-3d transform hover:scale-125 transition-all duration-200 animate-float ${
                    node.connected ? "bg-green-500" : ""
                  }`}
                  style={{
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    backgroundColor: node.connected ? "" : node.color, // Use color only if not connected
                    opacity: node.connected ? 1 : 0.6,
                    animationDelay: `${node.id * 0.2}s`,
                  }}
                  disabled={node.connected}
                >
                  {node.connected && <div className="text-white text-xs">✓</div>}
                </button>

                {/* Connection Lines */}
                {node.connected && (
                  <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <line
                      x1={node.x + 16}
                      y1={node.y + 16}
                      x2={400 + 48}
                      y2={300 + 64}
                      stroke={node.color}
                      strokeWidth="3"
                      className="animate-pulse"
                      strokeDasharray="5,5"
                    />
                  </svg>
                )}
              </div>
            ))}

            {/* Particle Effects */}
            {nodeParticles.map((particle) => (
              <div
                key={particle.id}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-ping"
                style={{ left: `${particle.x}px`, top: `${particle.y}px` }}
              />
            ))}

            {/* Character */}
            <div className="absolute bottom-8 left-8">
              <div className="w-12 h-12 bg-gradient-to-b from-orange-400 to-red-600 pixel-border-3d animate-bounce">
                <div className="w-full h-full flex items-center justify-center text-white text-xs">👨‍🚀</div>
              </div>
            </div>
          </div>
        )}

        {levelId === "wallet" && walletQuestion && (
          <div className="relative w-full max-w-3xl h-96 bg-gray-900/80 pixel-border-3d flex flex-col items-center justify-center p-8">
            <h2 className="text-2xl pixel-font text-cyan-300 mb-8 text-center animate-fade-in">
              {walletQuestion.question}
            </h2>
            <div className="flex gap-8 mb-8">
              {walletQuestion.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleWalletOptionClick(option.id, option.correct)}
                  className={`w-32 h-32 flex flex-col items-center justify-center pixel-border-3d text-5xl transition-all duration-300 ${
                    selectedWalletOption === option.id
                      ? option.correct
                        ? "bg-green-600 animate-pulse"
                        : "bg-red-600 animate-shake"
                      : "bg-gray-700 hover:bg-gray-600"
                  } ${selectedWalletOption && selectedWalletOption !== option.id && !option.correct ? "opacity-50" : ""}`}
                  disabled={!!selectedWalletOption}
                >
                  {option.icon}
                  <span className="pixel-font text-sm mt-2 text-white">{option.id.toUpperCase()}</span>
                </button>
              ))}
            </div>
            {walletFeedback && (
              <div
                className={`text-xl pixel-font ${
                  walletFeedback === "correct" ? "text-green-400 animate-fade-in-up" : "text-red-400 animate-shake"
                }`}
              >
                {walletFeedback === "correct" ? "¡CORRECTO!" : "INCORRECTO"}
              </div>
            )}
            <div className="absolute bottom-4 right-4 pixel-font text-white text-sm">
              Ronda {walletRound} / {maxWalletRounds}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action */}
      <div className="relative z-10 text-center pb-8">
        {levelId === "decentralized" && (
          <button
            onClick={() => gameProgress >= 100 && onComplete()}
            className={`bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 text-white font-bold text-xl px-12 py-4 pixel-border-3d pixel-font transition-all duration-200 ${
              gameProgress >= 100 ? "animate-glow-button" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={gameProgress < 100}
          >
            CONECTAR NODO
          </button>
        )}
        {levelId === "wallet" && (
          <button
            onClick={() => gameProgress >= 100 && onComplete()}
            className={`bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 text-white font-bold text-xl px-12 py-4 pixel-border-3d pixel-font transition-all duration-200 ${
              gameProgress >= 100 ? "animate-glow-button" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={gameProgress < 100}
          >
            CONTINUAR
          </button>
        )}
      </div>
    </div>
  )
}
