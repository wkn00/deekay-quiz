"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"


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
    question: "Was ist das? 📖 ",
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
  const [isLoading, setIsLoading] = useState(false)
  const { theme } = useTheme()

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
      setIsLoading(true)
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
      
      // Simulate loading
      setTimeout(() => setIsLoading(false), 800)
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
    if (index === shuffledQuestions[currentQuestion].correct) return "bg-green-500 text-white hover:bg-green-600"
    if (index === selectedAnswer && index !== shuffledQuestions[currentQuestion].correct) return "bg-red-500 text-white hover:bg-red-600"
    return "hover:bg-gray-100 dark:hover:bg-gray-800"
  }

  const isQuizComplete = currentQuestion === shuffledQuestions.length - 1 && showResult

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black to-indigo-300 dark:from-gray-900 dark:to-blue-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border-l border-gray-300 dark:border-gray-700 opacity-20"
              initial={{ y: -100, x: Math.random() * window.innerWidth }}
              animate={{ y: window.innerHeight + 100 }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
              style={{
                height: 50 + Math.random() * 200,
                left: Math.random() * window.innerWidth,
                width: 1,
              }}
            />
          ))}
        </div>

       <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="w-full max-w-md z-10"
>
  <Card className="w-full backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 shadow-lg">
    <CardHeader className="text-center">
      <div className="flex justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-blue-600 dark:text-blue-400">
          <path d="m5 8 6 6" />
          <path d="m4 14 6-6 2-3" />
          <path d="M2 5h12" />
          <path d="M7 2h1" />
          <path d="m22 22-5-10-5 10" />
          <path d="M14 18h6" />
        </svg>
      </div>
      <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
        Deutsch Quiz A2
      </CardTitle>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Teste dein Deutsch!
      </p>
    </CardHeader>
    <CardContent className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Wie heißt du? 
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Dein Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full bg-white dark:bg-gray-700"
          onKeyDown={(e) => e.key === 'Enter' && startQuiz()}
        />
      </div>
      <Button 
        onClick={startQuiz} 
        className="w-full bg-gradient-to-r from-gray-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg transition-all hover:shadow-xl"
        disabled={!userName.trim()}
        size="lg"
      >
        Quiz starten
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </Button>
    </CardContent>
  </Card>
</motion.div>
</div>
)
}

if (isLoading) {
return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-950">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="h-16 w-16 rounded-full border-4 border-blue-500 border-t-transparent"
    />
  </div>
)
}

if (isQuizComplete) {
const percentage = Math.round((score / shuffledQuestions.length) * 100)
let message = ""
let emoji = ""
if (percentage >= 80) {
  message = "Ausgezeichnet! Excellent!"
  emoji = "🎉"
} else if (percentage >= 60) {
  message = "Gut gemacht! Well done!"
  emoji = "👍"
} else if (percentage >= 40) {
  message = "Nicht schlecht! Not bad!"
  emoji = "👌"
} else {
  message = "Weiter üben!"
  emoji = "💪"
}

return (
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 dark:from-gray-900 dark:to-teal-950 flex items-center justify-center p-4 relative overflow-hidden">
    {/* Confetti animation */}
    {percentage >= 80 && (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            initial={{ y: -50, x: Math.random() * window.innerWidth, opacity: 0 }}
            animate={{ y: window.innerHeight, opacity: [0, 1, 0] }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2
            }}
            style={{
              left: Math.random() * window.innerWidth,
            }}
          >
            {['🎉', '🎊', '🌟', '✨'][Math.floor(Math.random() * 4)]}
          </motion.div>
        ))}
      </div>
    )}

    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md z-10"
    >
      <Card className="w-full backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400">
            Quiz beendet!
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-300"></p>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-5xl mb-2"
          >
            {emoji}
          </motion.div>
          
          <div className="flex justify-center items-center space-x-4">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400"
            >
              {score}/{shuffledQuestions.length}
            </motion.div>
            
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-semibold text-gray-700 dark:text-gray-300"
            >
              {percentage}%
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400"
          >
            {message}
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600 dark:text-gray-400 text-lg"
          >
            Gut gemacht, <span className="font-semibold text-gray-800 dark:text-gray-200">{userName}</span>!
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button 
              onClick={restartQuiz} 
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl"
              size="lg"
            >
              Nochmal spielen
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M8 16H3v5" />
              </svg>
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  </div>
)
}

return (
<div className="min-h-screen bg-gradient-to-br from-black to-indigo-200 dark:from-gray-900 dark:to-blue-950 p-4 relative overflow-hidden">
  {/* Animated background waves */}
  <div className="absolute inset-0 overflow-hidden opacity-20 dark:opacity-10">
    <svg
      className="absolute bottom-0 left-0 w-full"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <path
        fill={theme === 'dark' ? '#3b82f6' : '#2563eb'}
        d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      >
        <animate
          attributeName="d"
          dur="15s"
          repeatCount="indefinite"
          values="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                  M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,192C672,192,768,160,864,138.7C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                  M0,128L48,154.7C96,181,192,235,288,234.7C384,235,480,181,576,181.3C672,181,768,235,864,250.7C960,267,1056,245,1152,213.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                  M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </path>
    </svg>
  </div>

  <div className="max-w-2xl mx-auto relative z-10">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          Frage {currentQuestion + 1} von {shuffledQuestions.length}
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          Punkte: <span className="font-bold text-blue-600 dark:text-blue-400">{score}</span>
        </span>
      </div>
      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
          style={{
            width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%`,
            transition: 'width 0.3s ease'
          }}
        />
      </div>
    </motion.div>

    <motion.div
      key={currentQuestion}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 shadow-lg overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="text-gray-800 dark:text-gray-200">Hallo {userName}!</span>
          </CardTitle>
        </CardHeader>
        
        <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
        
        <CardContent className="pt-6 space-y-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
              {shuffledQuestions[currentQuestion]?.question}
            </h2>
          </motion.div>

          <div className="space-y-4">
            <AnimatePresence>
              {shuffledQuestions[currentQuestion]?.options.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Button
                    variant="outline"
                    className={`w-full text-left justify-start h-auto py-4 px-6 rounded-lg transition-all duration-200 ${getButtonColor(index)}`}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                  >
                    <span className="font-bold mr-3 text-blue-600 dark:text-blue-400">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="text-left">{option}</span>
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {showResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center pt-4"
            >
              {selectedAnswer === shuffledQuestions[currentQuestion].correct ? (
                <div>

                 
                </div>
              ) : (
                <div>

    
                </div>
                
              )}

              {currentQuestion < shuffledQuestions.length - 1 ? (
                <Button 
                  onClick={nextQuestion} 
                  className="mt-4 bg-gradient-to-r from-gray-900 to-gray-600 hover:from-gray-600 hover:to-gray-900 text-white shadow-lg hover:shadow-xl"
                  size="lg"
                >
                  Nächste Frage
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
              ) : (
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Letzte Frage beantwortet! Last question answered!
                </p>
              )}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  </div>
</div>
)}