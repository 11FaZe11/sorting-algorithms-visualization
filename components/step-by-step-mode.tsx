"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TutorialPanel } from "./tutorial-panel"

interface StepByStepModeProps {
  algorithm: string
  onStepModeChange: (enabled: boolean) => void
  onStepChange: (step: number) => void
  currentStep: number
  isRunning: boolean
}

export function StepByStepMode({
  algorithm,
  onStepModeChange,
  onStepChange,
  currentStep,
  isRunning,
}: StepByStepModeProps) {
  const [stepByStepEnabled, setStepByStepEnabled] = useState(false)
  const [autoStep, setAutoStep] = useState(false)

  const toggleStepByStep = () => {
    setStepByStepEnabled(!stepByStepEnabled)
    onStepModeChange(!stepByStepEnabled)
  }

  if (!stepByStepEnabled) {
    return (
      <Card className="neon-border bg-card">
        <CardHeader>
          <CardTitle>Learning Mode</CardTitle>
          <CardDescription>Step through the algorithm with explanations</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={toggleStepByStep} className="w-full bg-accent hover:bg-accent/80">
            🎓 Enable Step-by-Step Mode
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card className="neon-border bg-card">
        <CardHeader>
          <CardTitle className="text-accent">Step-by-Step Mode Active</CardTitle>
          <CardDescription>Learn by controlling each step</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Button onClick={toggleStepByStep} variant="outline" className="flex-1 bg-transparent">
              Disable Learning Mode
            </Button>
            <Button onClick={() => setAutoStep(!autoStep)} className={autoStep ? "flex-1 bg-accent" : "flex-1"}>
              {autoStep ? "⏸ Auto Mode" : "▶ Auto Mode"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <TutorialPanel
        algorithm={algorithm}
        currentStep={currentStep}
        onStepChange={onStepChange}
        isRunning={isRunning}
      />
    </div>
  )
}
