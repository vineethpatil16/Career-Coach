import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  TrendingUp,
  Star,
  Award,
  Play,
  Pause,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const QuizPage = () => {
  const navigate = useNavigate();
  const { quizType } = useParams();
  const { user } = useAuth();
  
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(false);

  // Quiz categories with comprehensive questions
  const quizCategories = [
    {
      id: 'technical',
      title: 'Technical Skills Assessment',
      description: 'Evaluate your programming and technical knowledge',
      icon: Code,
      color: 'bg-blue-500',
      duration: 20,
      difficulty: 'Intermediate',
      questions: [
        {
          question: "What is the time complexity of binary search in a sorted array?",
          options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
          correct: 1,
          explanation: "Binary search divides the search space in half with each iteration, resulting in O(log n) complexity.",
          category: "Algorithms"
        },
        {
          question: "Which HTTP method is idempotent and safe?",
          options: ["POST", "PUT", "GET", "DELETE"],
          correct: 2,
          explanation: "GET is both idempotent (multiple calls have same effect) and safe (doesn't modify server state).",
          category: "Web Development"
        },
        {
          question: "In React, what is the purpose of useEffect hook?",
          options: [
            "To manage component state",
            "To handle side effects",
            "To create components",
            "To style components"
          ],
          correct: 1,
          explanation: "useEffect is used to handle side effects like API calls, subscriptions, and DOM manipulation.",
          category: "React"
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
          explanation: "REST stands for Representational State Transfer, an architectural style for web services.",
          category: "Web Development"
        },
        {
          question: "Which data structure follows LIFO (Last In, First Out) principle?",
          options: ["Queue", "Stack", "Array", "LinkedList"],
          correct: 1,
          explanation: "Stack follows LIFO principle where the last element added is the first one to be removed.",
          category: "Data Structures"
        }
      ]
    },
    {
      id: 'analytical',
      title: 'Analytical Thinking',
      description: 'Test your problem-solving and logical reasoning abilities',
      icon: Brain,
      color: 'bg-purple-500',
      duration: 25,
      difficulty: 'Advanced',
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
          explanation: "Since all roses are flowers, it's definitely true that some roses are flowers.",
          category: "Logic"
        },
        {
          question: "A company's profit increased by 20% in Q1 and decreased by 15% in Q2. What's the net change?",
          options: ["2% increase", "5% increase", "8% increase", "12% increase"],
          correct: 0,
          explanation: "1.20 × 0.85 = 1.02, representing a 2% net increase.",
          category: "Mathematics"
        },
        {
          question: "In a team of 8 people, if each person shakes hands with every other person exactly once, how many handshakes occur?",
          options: ["28", "32", "56", "64"],
          correct: 0,
          explanation: "Using combination formula C(8,2) = 8!/(2!(8-2)!) = 28 handshakes.",
          category: "Combinatorics"
        },
        {
          question: "What comes next in the sequence: 2, 6, 12, 20, 30, ?",
          options: ["40", "42", "45", "48"],
          correct: 1,
          explanation: "The pattern is n(n+1): 1×2, 2×3, 3×4, 4×5, 5×6, 6×7 = 42.",
          category: "Pattern Recognition"
        }
      ]
    },
    {
      id: 'communication',
      title: 'Communication Skills',
      description: 'Assess your interpersonal and communication abilities',
      icon: Users,
      color: 'bg-green-500',
      duration: 15,
      difficulty: 'Beginner',
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
          explanation: "Direct communication with all parties helps resolve conflicts constructively and maintains team relationships.",
          category: "Conflict Resolution"
        },
        {
          question: "When giving feedback to a colleague, what approach is most effective?",
          options: [
            "Focus on personal traits",
            "Use specific examples and behaviors",
            "Give feedback publicly",
            "Wait until the annual review"
          ],
          correct: 1,
          explanation: "Specific, behavior-focused feedback is more actionable and less likely to cause defensiveness.",
          category: "Feedback"
        },
        {
          question: "In active listening, what should you do first?",
          options: [
            "Prepare your response",
            "Give immediate advice", 
            "Pay full attention to the speaker",
            "Interrupt to clarify points"
          ],
          correct: 2,
          explanation: "Active listening starts with giving your full attention to understand the speaker's message.",
          category: "Active Listening"
        }
      ]
    },
    {
      id: 'leadership',
      title: 'Leadership Potential',
      description: 'Evaluate your leadership qualities and management skills',
      icon: Briefcase,
      color: 'bg-orange-500', 
      duration: 18,
      difficulty: 'Intermediate',
      questions: [
        {
          question: "What's the most important quality of an effective leader?",
          options: [
            "Being the smartest person in the room",
            "Making all decisions quickly",
            "Empowering others to succeed", 
            "Having all the answers"
          ],
          correct: 2,
          explanation: "Great leaders focus on empowering their team members to reach their potential and achieve collective goals.",
          category: "Leadership Style"
        },
        {
          question: "How should a leader handle team failure?",
          options: [
            "Blame specific team members",
            "Take responsibility and learn from it",
            "Ignore it and move forward",
            "Escalate to upper management"
          ],
          correct: 1,
          explanation: "Effective leaders take responsibility for team outcomes and use failures as learning opportunities.",
          category: "Accountability"
        },
        {
          question: "What's the best way to motivate a diverse team?", 
          options: [
            "Use the same approach for everyone",
            "Focus only on high performers",
            "Understand individual motivations",
            "Rely solely on monetary incentives"
          ],
          correct: 2,
          explanation: "Different people are motivated by different things - recognition, growth, autonomy, purpose, etc.",
          category: "Team Motivation"
        }
      ]
    },
    {
      id: 'emotional-intelligence',
      title: 'Emotional Intelligence',
      description: 'Measure your emotional awareness and social skills',
      icon: Target,
      color: 'bg-pink-500',
      duration: 12,
      difficulty: 'Intermediate',
      questions: [
        {
          question: "When you feel frustrated at work, what's the best first step?",
          options: [
            "Express your frustration immediately",
            "Ignore the feeling and continue working",
            "Pause and identify what's causing the frustration",
            "Leave the situation immediately"
          ],
          correct: 2,
          explanation: "Self-awareness starts with pausing to identify and understand your emotions before reacting.",
          category: "Self-Awareness"
        },
        {
          question: "How can you tell if someone is feeling uncomfortable in a conversation?",
          options: [
            "They will directly tell you",
            "Watch for non-verbal cues and body language",
            "It's impossible to know",
            "Ask them repeatedly if they're okay"
          ],
          correct: 1,
          explanation: "Non-verbal cues like body language, tone, and facial expressions often reveal emotional states.",
          category: "Social Awareness"
        }
      ]
    }
  ];

  // Timer effect
  useEffect(() => {
    let timer;
    if (quizStarted && !quizCompleted && !isPaused && timeLeft > 0) {
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
  }, [quizStarted, quizCompleted, isPaused, timeLeft]);

  // Load specific quiz if quizType is provided
  useEffect(() => {
    if (quizType) {
      const quiz = quizCategories.find(q => q.id === quizType);
      if (quiz) {
        startQuiz(quiz);
      }
    }
  }, [quizType]);

  const startQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer('');
    setTimeLeft(quiz.duration * 60);
    setQuizStarted(true);
    setQuizCompleted(false);
    setShowResults(false);
    setScore(0);
    setIsPaused(false);
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

  const calculateScore = async (finalAnswers = answers) => {
    let correctCount = 0;
    const detailedResults = [];
    
    currentQuiz.questions.forEach((question, index) => {
      const isCorrect = finalAnswers[index] === question.correct;
      if (isCorrect) correctCount++;
      
      detailedResults.push({
        question: question.question,
        userAnswer: question.options[finalAnswers[index]],
        correctAnswer: question.options[question.correct],
        isCorrect,
        explanation: question.explanation,
        category: question.category
      });
    });
    
    setScore(correctCount);
    setShowResults(true);
    
    // Save results to backend
    await saveQuizResults({
      quizId: currentQuiz.id,
      score: correctCount,
      totalQuestions: currentQuiz.questions.length,
      percentage: Math.round((correctCount / currentQuiz.questions.length) * 100),
      detailedResults,
      completedAt: new Date().toISOString()
    });
  };

  const saveQuizResults = async (results) => {
    setLoading(true);
    try {
      // TODO: Save to Supabase
      console.log('Saving quiz results:', results);
      // const { error } = await supabase
      //   .from('skill_assessments')
      //   .insert({
      //     user_id: user.id,
      //     quiz_type: results.quizId,
      //     score: results.score,
      //     total_questions: results.totalQuestions,
      //     percentage: results.percentage,
      //     detailed_results: results.detailedResults,
      //     taken_at: results.completedAt
      //   });
    } catch (error) {
      console.error('Error saving quiz results:', error);
    } finally {
      setLoading(false);
    }
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
    setIsPaused(false);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
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
    if (percentage >= 90) return 'Outstanding! You have exceptional skills in this area.';
    if (percentage >= 80) return 'Excellent! You have strong skills in this area.';
    if (percentage >= 70) return 'Good job! You have solid understanding with room for growth.';
    if (percentage >= 60) return 'Fair performance. Focus on strengthening these skills.';
    return 'Keep practicing! Consider additional study in this area.';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-orange-100 text-orange-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Quiz selection screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex justify-between items-center mb-8">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </button>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Skill Assessment Center
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover your strengths and areas for improvement with our comprehensive skill assessments
            </p>
          </motion.div>

          {/* Quiz Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
                      <span className={`px-2 py-1 text-xs rounded ${getDifficultyColor(quiz.difficulty)}`}>
                        {quiz.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {quiz.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {quiz.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={16} className="mr-1" />
                      {quiz.duration} min
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <BookOpen size={16} className="mr-1" />
                      {quiz.questions.length} questions
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center text-blue-600 font-medium w-full justify-center py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Play size={16} className="mr-2" />
                    Start Assessment
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          {/* Recent Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="mr-3 text-blue-600" />
              Your Assessment Progress
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className="text-sm text-gray-600">Assessments Taken</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">85%</div>
                <div className="text-sm text-gray-600">Average Score</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">Technical</div>
                <div className="text-sm text-gray-600">Strongest Area</div>
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
                  <span className={`font-mono text-lg ${timeLeft < 300 ? 'text-red-600' : ''}`}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <button
                  onClick={togglePause}
                  className="flex items-center text-gray-500 hover:text-gray-700"
                >
                  {isPaused ? <Play size={20} /> : <Pause size={20} />}
                </button>
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

          {/* Pause Overlay */}
          {isPaused && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <div className="bg-white rounded-lg p-8 text-center">
                <Pause size={48} className="mx-auto text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold mb-4">Quiz Paused</h3>
                <button
                  onClick={togglePause}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Resume Quiz
                </button>
              </div>
            </motion.div>
          )}

          {/* Question Card */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="mb-4">
              <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
                {currentQ.category}
              </span>
            </div>
            
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
            className="bg-white rounded-xl shadow-lg p-8"
          >
            {/* Results Header */}
            <div className="text-center mb-8">
              <div className="mb-6">
                {percentage >= 80 ? (
                  <Trophy size={64} className="mx-auto text-yellow-500 mb-4" />
                ) : percentage >= 60 ? (
                  <Award size={64} className="mx-auto text-blue-500 mb-4" />
                ) : (
                  <Target size={64} className="mx-auto text-gray-500 mb-4" />
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Assessment Completed!
              </h1>
              <p className="text-xl text-gray-600">
                {currentQuiz.title}
              </p>
            </div>

            {/* Score Display */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8 text-center">
              <div className={`text-6xl font-bold mb-2 ${getScoreColor()}`}>
                {Math.round(percentage)}%
              </div>
              <div className="text-xl text-gray-600 mb-4">
                {score} out of {currentQuiz.questions.length} correct
              </div>
              <p className="text-lg text-gray-700">
                {getPerformanceMessage()}
              </p>
            </div>

            {/* Category Breakdown */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Performance by Category
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[...new Set(currentQuiz.questions.map(q => q.category))].map(category => {
                  const categoryQuestions = currentQuiz.questions.filter(q => q.category === category);
                  const categoryScore = categoryQuestions.reduce((acc, question, index) => {
                    const questionIndex = currentQuiz.questions.indexOf(question);
                    return acc + (answers[questionIndex] === question.correct ? 1 : 0);
                  }, 0);
                  const categoryPercentage = Math.round((categoryScore / categoryQuestions.length) * 100);
                  
                  return (
                    <div key={category} className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-lg font-semibold text-gray-900">{category}</div>
                      <div className="text-2xl font-bold text-blue-600">{categoryPercentage}%</div>
                      <div className="text-sm text-gray-600">{categoryScore}/{categoryQuestions.length} correct</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Question Review */}
            <div className="text-left mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Review Your Answers
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
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
                          Your answer: {question.options[userAnswer] || 'No answer selected'}
                        </div>
                        {!isCorrect && (
                          <div className="text-green-700">
                            Correct answer: {question.options[question.correct]}
                          </div>
                        )}
                        <div className="text-gray-600 mt-2 bg-white p-2 rounded">
                          <strong>Explanation:</strong> {question.explanation}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="mr-2" />
                Personalized Recommendations
              </h3>
              <div className="space-y-3">
                {percentage < 70 && (
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Focus Areas for Improvement</p>
                      <p className="text-sm text-gray-600">Consider additional study in areas where you scored below 70%</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start space-x-3">
                  <BookOpen className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Recommended Resources</p>
                    <p className="text-sm text-gray-600">Check out our curated learning materials for {currentQuiz.title.toLowerCase()}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Target className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Next Steps</p>
                    <p className="text-sm text-gray-600">Take related assessments to build a comprehensive skill profile</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => navigate('/explore')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Explore Learning Resources
              </button>
              <button
                onClick={resetQuiz}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Take Another Assessment
              </button>
              <button
                onClick={() => startQuiz(currentQuiz)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Retake This Quiz
              </button>
              <button
                onClick={() => navigate('/reflect')}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                View All Results
              </button>
            </div>

            {loading && (
              <div className="text-center mt-4">
                <div className="inline-flex items-center text-gray-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                  Saving results...
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
};

export default QuizPage;