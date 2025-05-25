"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation?: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "Wie heißt du?",
    options: ["Ich heiße Maria", "Du heißt Maria", "Er heißt Maria", "Wir heißen Maria"],
    correct: 0,
  },
  {
    id: 2,
    question: "Was ist das? (pointing to a book)",
    options: ["Das ist ein Tisch", "Das ist ein Buch", "Das ist eine Lampe", "Das ist ein Stuhl"],
    correct: 1,
  },
  {
    id: 3,
    question: "Wo wohnst du?",
    options: ["Ich wohne in Berlin", "Du wohnst in Berlin", "Sie wohnt in Berlin", "Wir wohnen in Berlin"],
    correct: 0,
  },
  {
    id: 4,
    question: "Wie viel kostet das Brot?",
    options: [
      "Das Brot kostet drei Euro",
      "Das Brot kosten drei Euro",
      "Das Brot kostete drei Euro",
      "Das Brot wird drei Euro kosten",
    ],
    correct: 0,
  },
  {
    id: 5,
    question: "Wann stehst du auf?",
    options: [
      "Ich stehe um sieben Uhr auf",
      "Ich stehe um sieben Uhr an",
      "Ich stehe um sieben Uhr ab",
      "Ich stehe um sieben Uhr aus",
    ],
    correct: 0,
  },
  {
    id: 6,
    question: "Was machst du gern?",
    options: ["Ich lese gern Bücher", "Ich liest gern Bücher", "Ich lesen gern Bücher", "Ich las gern Bücher"],
    correct: 0,
  },
  {
    id: 7,
    question: "Welche Farbe hat der Himmel?",
    options: ["Der Himmel ist grün", "Der Himmel ist blau", "Der Himmel ist rot", "Der Himmel ist gelb"],
    correct: 1,
  },
  {
    id: 8,
    question: "Wo ist die Bank?",
    options: [
      "Die Bank ist neben dem Supermarkt",
      "Die Bank ist neben den Supermarkt",
      "Die Bank ist neben der Supermarkt",
      "Die Bank ist neben das Supermarkt",
    ],
    correct: 0,
  },
  {
    id: 9,
    question: "Was isst du zum Frühstück?",
    options: [
      "Ich esse Brot mit Butter",
      "Ich isst Brot mit Butter",
      "Ich essen Brot mit Butter",
      "Ich aß Brot mit Butter",
    ],
    correct: 0,
  },
  {
    id: 10,
    question: "Wie ist das Wetter heute?",
    options: [
      "Heute ist es kalt und regnerisch",
      "Heute bin es kalt und regnerisch",
      "Heute hat es kalt und regnerisch",
      "Heute wird es kalt und regnerisch",
    ],
    correct: 0,
  },
  {
    id: 11,
    question: "Wer ist das?",
    options: ["Das ist mein Bruder", "Das ist meinen Bruder", "Das ist meinem Bruder", "Das ist meines Bruders"],
    correct: 0,
  },
  {
    id: 12,
    question: "Kannst du mir helfen?",
    options: [
      "Ja, ich kann dir helfen",
      "Ja, ich kann dich helfen",
      "Ja, ich kann Sie helfen",
      "Ja, ich kann ihm helfen",
    ],
    correct: 0,
  },
  {
    id: 13,
    question: "Was trinkst du?",
    options: ["Ich trinke Wasser", "Ich trinkst Wasser", "Ich trinken Wasser", "Ich trank Wasser"],
    correct: 0,
  },
  {
    id: 14,
    question: "Wie spät ist es?",
    options: ["Es ist halb drei", "Es sind halb drei", "Es war halb drei", "Es wird halb drei"],
    correct: 0,
  },
  {
    id: 15,
    question: "Wo arbeitest du?",
    options: [
      "Ich arbeite in einem Büro",
      "Ich arbeitest in einem Büro",
      "Ich arbeiten in einem Büro",
      "Ich arbeitete in einem Büro",
    ],
    correct: 0,
  },
  {
    id: 16,
    question: "Was kaufst du im Supermarkt?",
    options: [
      "Ich kaufe Milch und Eier",
      "Ich kaufst Milch und Eier",
      "Ich kaufen Milch und Eier",
      "Ich kaufte Milch und Eier",
    ],
    correct: 0,
  },
  {
    id: 17,
    question: "Wie kommst du zur Arbeit?",
    options: ["Ich fahre mit dem Bus", "Ich fährst mit dem Bus", "Ich fahren mit dem Bus", "Ich fuhr mit dem Bus"],
    correct: 0,
  },
  {
    id: 18,
    question: "Was machst du am Wochenende?",
    options: [
      "Am Wochenende besuche ich meine Familie",
      "Am Wochenende besuchst ich meine Familie",
      "Am Wochenende besuchen ich meine Familie",
      "Am Wochenende besuchte ich meine Familie",
    ],
    correct: 0,
  },
  {
    id: 19,
    question: "Wie findest du den Film?",
    options: [
      "Ich finde den Film interessant",
      "Ich findest den Film interessant",
      "Ich finden den Film interessant",
      "Ich fand den Film interessant",
    ],
    correct: 0,
  },
  {
    id: 20,
    question: "Gehst du heute ins Kino?",
    options: [
      "Nein, ich gehe nicht ins Kino",
      "Nein, ich gehst nicht ins Kino",
      "Nein, ich gehen nicht ins Kino",
      "Nein, ich ging nicht ins Kino",
    ],
    correct: 0,
  },
]

export default function GermanQuizApp() {
  const [userName, setUserName] = useState("")
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([])
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([])

  // Shuffle array function
  const shuffleArray = (array: any[]) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Initialize shuffled questions when quiz starts
  useEffect(() => {
    if (quizStarted) {
      const questionsWithShuffledOptions = questions.map((q) => {
        const correctAnswer = q.options[q.correct]
        const shuffledOptions = shuffleArray(q.options)
        const newCorrectIndex = shuffledOptions.indexOf(correctAnswer)

        return {
          ...q,
          options: shuffledOptions,
          correct: newCorrectIndex,
        }
      })
      setShuffledQuestions(questionsWithShuffledOptions)
      setAnsweredQuestions(new Array(questions.length).fill(false))
    }
  }, [quizStarted])

  const startQuiz = () => {
    if (userName.trim()) {
      setQuizStarted(true)
    }
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answerIndex)
      setShowResult(true)

      if (answerIndex === shuffledQuestions[currentQuestion].correct) {
        setScore(score + 1)
      }

      const newAnsweredQuestions = [...answeredQuestions]
      newAnsweredQuestions[currentQuestion] = true
      setAnsweredQuestions(newAnsweredQuestions)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizStarted(false)
    setUserName("")
    setAnsweredQuestions([])
  }

  const getButtonColor = (index: number) => {
    if (!showResult) return ""
    if (index === shuffledQuestions[currentQuestion].correct) return "bg-green-500 text-white"
    if (index === selectedAnswer && index !== shuffledQuestions[currentQuestion].correct) return "bg-red-500 text-white"
    return ""
  }

  const isQuizComplete = currentQuestion === shuffledQuestions.length - 1 && showResult

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-blue-800">Deutsch Quiz A2</CardTitle>
            <p className="text-gray-600 mt-2">Teste dein Deutsch! Test your German!</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Wie heißt du? (What's your name?)
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Dein Name / Your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full"
              />
            </div>
            <Button onClick={startQuiz} className="w-full bg-blue-600 hover:bg-blue-700" disabled={!userName.trim()}>
              Quiz starten / Start Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isQuizComplete) {
    const percentage = Math.round((score / shuffledQuestions.length) * 100)
    let message = ""
    if (percentage >= 80) message = "Ausgezeichnet! Excellent!"
    else if (percentage >= 60) message = "Gut gemacht! Well done!"
    else if (percentage >= 40) message = "Nicht schlecht! Not bad!"
    else message = "Weiter üben! Keep practicing!"

    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-green-800">Quiz beendet!</CardTitle>
            <p className="text-gray-600">Quiz Complete!</p>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-4xl font-bold text-green-600">
              {score}/{shuffledQuestions.length}
            </div>
            <div className="text-xl text-gray-700">{percentage}%</div>
            <div className="text-lg font-semibold text-green-700">{message}</div>
            <p className="text-gray-600">Gut gemacht, {userName}!</p>
            <Button onClick={restartQuiz} className="w-full bg-green-600 hover:bg-green-700">
              Nochmal spielen / Play Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Frage {currentQuestion + 1} von {shuffledQuestions.length}
            </span>
            <span className="text-sm text-gray-600">Punkte: {score}</span>
          </div>
          <Progress value={((currentQuestion + 1) / shuffledQuestions.length) * 100} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-center">Hallo {userName}!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">{shuffledQuestions[currentQuestion]?.question}</h2>
            </div>

            <div className="space-y-3">
              {shuffledQuestions[currentQuestion]?.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`w-full text-left justify-start h-auto p-4 ${getButtonColor(index)}`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              ))}
            </div>

            {showResult && (
              <div className="text-center pt-4">
                {selectedAnswer === shuffledQuestions[currentQuestion].correct ? (
                  <p className="text-green-600 font-semibold">✓ Richtig! Correct!</p>
                ) : (
                  <p className="text-red-600 font-semibold">✗ Falsch! Incorrect!</p>
                )}

                {currentQuestion < shuffledQuestions.length - 1 ? (
                  <Button onClick={nextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700">
                    Nächste Frage / Next Question
                  </Button>
                ) : (
                  <p className="mt-4 text-gray-600">Quiz beendet! Quiz complete!</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
