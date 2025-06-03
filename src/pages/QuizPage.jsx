import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Trophy, 
  Target,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  BookOpen,
  Brain,
  Code,
  Briefcase,
  Users,
  TrendingUp
} from 'lucide-react';

const QuizPage = () => {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Sample quiz categories
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
          explanation: "Binary search divides the search space in half with each iteration, resulting in O(log n) complexity."
        },
        {
          question: "Which HTTP method is idempotent?",
          options: ["POST", "PUT", "PATCH", "DELETE"],
          correct: 1,
          explanation: "PUT is idempotent - making the same request multiple times has the same effect as making it once."
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
          explanation: "REST stands for Representational State Transfer, an architectural style for web services."
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
          question: "If all roses are flowers and some flowers fade quickly, which statement is definitely true?",
          options: [
            "All roses fade quickly",
            "Some roses are flowers",
            "No roses fade quickly",
            "All flowers are roses"
          ],
          correct: 1,
          explanation: "Since all roses are flowers, it's definitely true that some roses are flowers."
        },
        {
          question: "A company's profit increased by 20% in Q1 and decreased by 10% in Q2. What's the net change?",
          options: ["8% increase", "10% increase", "12% increase", "15% increase"],
          correct: 0,
          explanation: "1.20 × 0.90 = 1.08, representing an 8% net increase."
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
          explanation: "Direct communication with all parties helps resolve conflicts constructively."
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
          explanation: "Great leaders focus on empowering their team members to reach their potential."
        }
      ]
    }
  ];

  // Timer effect
  useEffect(() => {
    let timer;
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setQuizCompleted(true);
            calculateScore();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizStarted, quizCompleted, timeLeft]);

  const startQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer('');
    setTimeLeft(quiz.duration * 60); // Convert minutes to seconds
    setQuizStarted(true);
    setQuizCompleted(false);
    setShowResults(false);
    setScore(0);
  };

  const selectAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const nextQuestion = () => {
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setSelectedAnswer('');

    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      calculateScore(newAnswers);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || '');
    }
  };

  const calculateScore = (finalAnswers = answers) => {
    let correctCount = 0;
    currentQuiz.questions.forEach((question, index) => {
      if (finalAnswers[index] === question.correct) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuiz(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer('');
    setQuizStarted(false);
    setQuizCompleted(false);
    setShowResults(false);
    setScore(0);
    setTimeLeft(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = () => {
    const percentage = (score / currentQuiz.questions.length) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceMessage = () => {
    const percentage = (score / currentQuiz.questions.length) * 100;
    if (percentage >= 80) return 'Excellent! You have strong skills in this area.';
    if (percentage >= 60) return 'Good job! There\'s room for improvement.';
    return 'Keep practicing! Focus on strengthening these skills.';
  };

  // Quiz selection screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Skill Assessment Center
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover your strengths and areas for improvement with our comprehensive skill assessments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizCategories.map((quiz, index) => {
              const IconComponent = quiz.icon;
              return (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer border border-gray-200"
                  onClick={() => startQuiz(quiz)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`${quiz.color} p-3 rounded-lg text-white`}>
                      <IconComponent size={24} />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock size={16} className="mr-1" />
                        {quiz.duration} min
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {quiz.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {quiz.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {quiz.questions.length} questions
                    </span>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="flex items-center text-blue-600 font-medium"
                    >
                      Start Quiz
                      <ArrowRight size={16} className="ml-1" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Recent Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="mr-3 text-blue-600" />
              Your Progress
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className="text-sm text-gray-600">Quizzes Taken</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">85%</div>
                <div className="text-sm text-gray-600">Average Score</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">Technical</div>
                <div className="text-sm text-gray-600">Top Skill</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">7</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Quiz in progress
  if (quizStarted && !quizCompleted && !showResults) {
    const currentQ = currentQuiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / currentQuiz.questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {currentQuiz.title}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-600">
                  <Clock size={20} className="mr-2" />
                  <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                </div>
                <button
                  onClick={resetQuiz}
                  className="flex items-center text-gray-500 hover:text-gray-700"
                >
                  <RotateCcw size={20} />
                </button>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-blue-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>Question {currentQuestion + 1} of {currentQuiz.questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">
              {currentQ.question}
            </h2>

            <div className="space-y-4 mb-8">
              {currentQ.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    selectedAnswer === index
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                      selectedAnswer === index
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswer === index && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-lg">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  currentQuestion === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <ArrowLeft size={20} className="mr-2" />
                Previous
              </button>

              <button
                onClick={nextQuestion}
                disabled={selectedAnswer === ''}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedAnswer === ''
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {currentQuestion === currentQuiz.questions.length - 1 ? 'Finish' : 'Next'}
                <ArrowRight size={20} className="ml-2" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Results screen
  if (showResults) {
    const percentage = (score / currentQuiz.questions.length) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8 text-center"
          >
            <div className="mb-8">
              <Trophy size={64} className="mx-auto text-yellow-500 mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Quiz Completed!
              </h1>
              <p className="text-xl text-gray-600">
                {currentQuiz.title}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="text-6xl font-bold mb-2 ${getScoreColor()}">
                {Math.round(percentage)}%
              </div>
              <div className="text-xl text-gray-600 mb-4">
                {score} out of {currentQuiz.questions.length} correct
              </div>
              <p className="text-lg text-gray-700">
                {getPerformanceMessage()}
              </p>
            </div>

            {/* Question Review */}
            <div className="text-left mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Review Your Answers
              </h3>
              <div className="space-y-4">
                {currentQuiz.questions.map((question, index) => {
                  const userAnswer = answers[index];
                  const isCorrect = userAnswer === question.correct;
                  
                  return (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 flex-1">
                          {index + 1}. {question.question}
                        </h4>
                        {isCorrect ? (
                          <CheckCircle size={24} className="text-green-600 ml-2" />
                        ) : (
                          <XCircle size={24} className="text-red-600 ml-2" />
                        )}
                      </div>
                      
                      <div className="text-sm space-y-1">
                        <div className={`${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          Your answer: {question.options[userAnswer]}
                        </div>
                        {!isCorrect && (
                          <div className="text-green-700">
                            Correct answer: {question.options[question.correct]}
                          </div>
                        )}
                        <div className="text-gray-600 mt-2">
                          {question.explanation}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={resetQuiz}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Take Another Quiz
              </button>
              <button
                onClick={() => startQuiz(currentQuiz)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Retake Quiz
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
};

export default QuizPage;