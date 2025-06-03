// src/hooks/useQuizzes.js
import { useState, useEffect } from 'react'
import { Code, Brain, Users, Briefcase } from 'lucide-react'

export const useQuizzes = () => {
  // Quiz categories and their metadata
  const quizCategories = [
    {
      id: 'technical',
      title: 'Technical Skills',
      description: 'Test your programming and technical knowledge',
      icon: Code,
      color: 'bg-blue-500',
      duration: 15,
      questions: [
        {
          question: "What is the time complexity of binary search?",
          options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
          correct: 1,
          explanation:
            "Binary search divides the search space in half with each iteration, resulting in O(log n) complexity."
        },
        {
          question: "Which HTTP method is idempotent?",
          options: ["POST", "PUT", "PATCH", "DELETE"],
          correct: 1,
          explanation:
            "PUT is idempotent - making the same request multiple times has the same effect as making it once."
        },
        {
          question: "What does REST stand for?",
          options: [
            "Representational State Transfer",
            "Remote State Transfer",
            "Reliable State Transfer",
            "Relational State Transfer"
          ],
          correct: 0,
          explanation:
            "REST stands for Representational State Transfer, an architectural style for web services."
        }
      ]
    },
    {
      id: 'analytical',
      title: 'Analytical Thinking',
      description: 'Evaluate your problem-solving abilities',
      icon: Brain,
      color: 'bg-purple-500',
      duration: 20,
      questions: [
        {
          question:
            "If all roses are flowers and some flowers fade quickly, which statement is definitely true?",
          options: [
            "All roses fade quickly",
            "Some roses are flowers",
            "No roses fade quickly",
            "All flowers are roses"
          ],
          correct: 1,
          explanation:
            "Since all roses are flowers, it's definitely true that some roses are flowers."
        },
        {
          question:
            "A company's profit increased by 20% in Q1 and decreased by 10% in Q2. What's the net change?",
          options: ["8% increase", "10% increase", "12% increase", "15% increase"],
          correct: 0,
          explanation:
            "1.20 × 0.90 = 1.08, representing an 8% net increase."
        }
      ]
    },
    {
      id: 'communication',
      title: 'Communication Skills',
      description: 'Assess your interpersonal abilities',
      icon: Users,
      color: 'bg-green-500',
      duration: 12,
      questions: [
        {
          question: "What's the most effective way to handle conflict in a team?",
          options: [
            "Avoid the conflict and hope it resolves itself",
            "Address it directly with all parties involved",
            "Report it to management immediately",
            "Side with the person you agree with"
          ],
          correct: 1,
          explanation:
            "Direct communication with all parties helps resolve conflicts constructively."
        }
      ]
    },
    {
      id: 'leadership',
      title: 'Leadership Potential',
      description: 'Measure your leadership qualities',
      icon: Briefcase,
      color: 'bg-orange-500',
      duration: 18,
      questions: [
        {
          question: "What's the most important quality of a good leader?",
          options: [
            "Being the smartest person in the room",
            "Making all decisions quickly",
            "Empowering others to succeed",
            "Having all the answers"
          ],
          correct: 2,
          explanation:
            "Great leaders focus on empowering their team members to reach their potential."
        }
      ]
    }
  ]

  // Hook state variables
  const [currentQuiz, setCurrentQuiz] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [answers, setAnswers] = useState([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)

  // Timer effect
  useEffect(() => {
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setQuizCompleted(true)
            calculateScore()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [quizStarted, quizCompleted, timeLeft])

  // Start a quiz: initialize state
  const startQuiz = quiz => {
    setCurrentQuiz(quiz)
    setCurrentQuestion(0)
    setAnswers([])
    setSelectedAnswer('')
    setTimeLeft(quiz.duration * 60) // minutes to seconds
    setQuizStarted(true)
    setQuizCompleted(false)
    setShowResults(false)
    setScore(0)
  }

  // Record selected answer for current question
  const selectAnswer = answerIndex => {
    setSelectedAnswer(answerIndex)
  }

  // Move to next question or finish quiz
  const nextQuestion = () => {
    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)
    setSelectedAnswer('')

    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizCompleted(true)
      calculateScore(newAnswers)
    }
  }

  // Move to previous question
  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1] || '')
    }
  }

  // Calculate final score
  const calculateScore = finalAnswers => {
    const answersToCheck = finalAnswers ?? answers
    let correctCount = 0

    currentQuiz.questions.forEach((question, index) => {
      if (answersToCheck[index] === question.correct) {
        correctCount++
      }
    })

    setScore(correctCount)
    setShowResults(true)
  }

  // Reset quiz state entirely
  const resetQuiz = () => {
    setCurrentQuiz(null)
    setCurrentQuestion(0)
    setAnswers([])
    setSelectedAnswer('')
    setQuizStarted(false)
    setQuizCompleted(false)
    setShowResults(false)
    setScore(0)
    setTimeLeft(0)
  }

  // Format timer display (MM:SS)
  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`
  }

  // Determine color based on score percentage
  const getScoreColor = () => {
    const percentage = (score / currentQuiz.questions.length) * 100
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  // Return a performance message based on score
  const getPerformanceMessage = () => {
    const percentage = (score / currentQuiz.questions.length) * 100
    if (percentage >= 80) return 'Excellent! You have strong skills in this area.'
    if (percentage >= 60) return "Good job! There's room for improvement."
    return 'Keep practicing! Focus on strengthening these skills.'
  }

  // Expose everything needed to the consumer
  return {
    quizCategories,
    currentQuiz,
    currentQuestion,
    selectedAnswer,
    answers,
    timeLeft,
    quizStarted,
    quizCompleted,
    score,
    showResults,
    startQuiz,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    calculateScore,
    resetQuiz,
    formatTime,
    getScoreColor,
    getPerformanceMessage
  }
}
