"use client"

import { useState } from "react"
import { HomeScreen } from "@/components/home-screen"
import { LevelSelectScreen } from "@/components/level-select-screen"
import { GameScreen } from "@/components/game-screen"
import { RewardScreen } from "@/components/reward-screen"

export default function StellarBlocks() {
  const [currentScreen, setCurrentScreen] = useState<"home" | "levels" | "game" | "reward">("home")
  const [selectedLevel, setSelectedLevel] = useState<string>("")

  const navigateToLevels = () => setCurrentScreen("levels")
  const navigateToGame = (levelId: string) => {
    setSelectedLevel(levelId)
    setCurrentScreen("game")
  }
  const navigateToReward = () => setCurrentScreen("reward")
  const navigateToHome = () => setCurrentScreen("home")

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-gray-900 overflow-hidden">
      {currentScreen === "home" && <HomeScreen onStart={navigateToLevels} />}
      {currentScreen === "levels" && <LevelSelectScreen onSelectLevel={navigateToGame} onBack={navigateToHome} />}
      {currentScreen === "game" && (
        <GameScreen levelId={selectedLevel} onComplete={navigateToReward} onBack={navigateToLevels} />
      )}
      {currentScreen === "reward" && <RewardScreen onContinue={navigateToLevels} />}
    </div>
  )
}
