"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getAlgorithmTutorial } from "@/lib/tutorial-content"

interface TutorialPanelProps {
  algorithm: string
  currentStep: number
  onStepChange: (step: number) => void
  isRunning: boolean
}

export function TutorialPanel({ algorithm, currentStep, onStepChange, isRunning }: TutorialPanelProps) {
  const [showHint, setShowHint] = useState(false)
  const [quizMode, setQuizMode] = useState(false)
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)

  const tutorial = getAlgorithmTutorial(algorithm)

  if (!tutorial) {
    return (
      <Card className="neon-border bg-card">
        <CardHeader>
          <CardTitle>Tutorial Mode</CardTitle>
          <CardDescription>Not available for this algorithm</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (quizMode) {
    const quiz = tutorial.quizzes[currentQuiz]

    return (
      <Card className="neon-border bg-card">
        <CardHeader>
          <CardTitle className="text-primary">Quiz Time!</CardTitle>
          <CardDescription>{`Question ${currentQuiz + 1} of ${tutorial.quizzes.length}`}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="font-semibold">{quiz.question}</p>

          <div className="space-y-2">
            {quiz.options.map((option, idx) => (
              <Button
                key={idx}
                onClick={() => {
                  setSelectedAnswer(idx)
                  setAnswered(true)
                }}
                disabled={answered}
                className={`w-full justify-start text-left h-auto py-3 px-4 ${
                  selectedAnswer === idx
                    ? idx === quiz.correct
                      ? "bg-green-500/20 border-green-500"
                      : "bg-red-500/20 border-red-500"
                    : idx === quiz.correct && answered
                      ? "bg-green-500/20 border-green-500"
                      : "bg-card"
                }`}
              >
                {option}
              </Button>
            ))}
          </div>

          {answered && (
            <div
              className={`p-3 rounded-lg text-sm ${
                selectedAnswer === quiz.correct ? "bg-green-500/10 text-green-300" : "bg-red-500/10 text-red-300"
              }`}
            >
              {quiz.explanation}
            </div>
          )}

          <div className="flex gap-2">
            {answered && currentQuiz < tutorial.quizzes.length - 1 && (
              <Button
                onClick={() => {
                  setCurrentQuiz(currentQuiz + 1)
                  setSelectedAnswer(null)
                  setAnswered(false)
                }}
                className="flex-1 bg-primary hover:bg-primary/80"
              >
                Next Question
              </Button>
            )}
            {answered && currentQuiz === tutorial.quizzes.length - 1 && (
              <Button
                onClick={() => {
                  setQuizMode(false)
                  setCurrentQuiz(0)
                  setSelectedAnswer(null)
                  setAnswered(false)
                }}
                className="flex-1 bg-primary hover:bg-primary/80"
              >
                Back to Tutorial
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  const step = tutorial.steps[currentStep]

  return (
    <Card className="neon-border bg-card">
      <CardHeader>
        <CardTitle className="text-primary">{tutorial.name} Tutorial</CardTitle>
        <CardDescription>{`Step ${currentStep + 1} of ${tutorial.steps.length}`}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-accent">{step.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
          </div>

          <div className="bg-primary/10 border border-primary/30 rounded-lg p-3">
            <p className="text-sm">{step.explanation}</p>
          </div>

          <Button onClick={() => setShowHint(!showHint)} variant="outline" className="w-full text-sm">
            {showHint ? "Hide Hint" : "Show Hint"}
          </Button>

          {showHint && (
            <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-3">
              <p className="text-sm text-secondary">{step.hint}</p>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => onStepChange(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0 || isRunning}
            variant="outline"
            className="flex-1"
          >
            ← Previous
          </Button>
          <Button
            onClick={() => onStepChange(Math.min(tutorial.steps.length - 1, currentStep + 1))}
            disabled={currentStep === tutorial.steps.length - 1 || isRunning}
            className="flex-1 bg-primary hover:bg-primary/80"
          >
            Next →
          </Button>
        </div>

        {currentStep === tutorial.steps.length - 1 && (
          <Button
            onClick={() => {
              setQuizMode(true)
              setCurrentQuiz(0)
            }}
            className="w-full bg-accent hover:bg-accent/80"
          >
            📝 Take Quiz
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
