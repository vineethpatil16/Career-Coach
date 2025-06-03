import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, DollarSign, Users, Star, ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react'

const IkigaiPage = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState({
    whatYouLove: [],
    whatYoureGoodAt: [],
    whatTheWorldNeeds: [],
    whatYouCanBePaidFor: []
  })
  const [currentResponse, setCurrentResponse] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [alreadyCompleted, setAlreadyCompleted] = useState(false)

  // Check if Ikigai was already completed
  useEffect(() => {
    const completed = localStorage.getItem('ikigaiCompleted')
    if (completed === 'true') {
      setAlreadyCompleted(true)
      setIsComplete(true)
    }
  }, [])

  const ikigaiQuestions = [
    {
      id: 'whatYouLove',
      title: 'What do you LOVE?',
      subtitle: 'Your Passion',
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      questions: [
        "What activities make you lose track of time?",
        "What topics do you find yourself constantly reading about?",
        "What would you do even if you weren't paid for it?",
        "What brings you joy and fulfillment?",
        "What are you naturally curious about?"
      ]
    },
    {
      id: 'whatYoureGoodAt',
      title: 'What are you GOOD AT?',
      subtitle: 'Your Skills & Talents',
      icon: Star,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      questions: [
        "What do people often compliment you on?",
        "What skills come naturally to you?",
        "What have you achieved that you're proud of?",
        "What do friends and colleagues ask for your help with?",
        "What are your strongest abilities?"
      ]
    },
    {
      id: 'whatTheWorldNeeds',
      title: 'What does the WORLD NEED?',
      subtitle: 'Your Mission',
      icon: Users,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      questions: [
        "What problems do you see that need solving?",
        "What changes would you like to see in the world?",
        "What causes are you passionate about?",
        "How can you contribute to making the world better?",
        "What needs do you see in your community or industry?"
      ]
    },
    {
      id: 'whatYouCanBePaidFor',
      title: 'What can you be PAID FOR?',
      subtitle: 'Your Profession',
      icon: DollarSign,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      questions: [
        "What skills are in demand in the market?",
        "What services could people pay you for?",
        "What expertise could become a career?",
        "What value can you provide to employers or clients?",
        "What are the market opportunities in your areas of interest?"
      ]
    }
  ]

  const currentQuestion = ikigaiQuestions[currentStep]
  const Icon = currentQuestion?.icon

  const handleAddResponse = () => {
    if (currentResponse.trim()) {
      setResponses(prev => ({
        ...prev,
        [currentQuestion.id]: [...prev[currentQuestion.id], currentResponse.trim()]
      }))
      setCurrentResponse('')
    }
  }

  const handleRemoveResponse = (index) => {
    setResponses(prev => ({
      ...prev,
      [currentQuestion.id]: prev[currentQuestion.id].filter((_, i) => i !== index)
    }))
  }

  const handleNext = () => {
    if (currentStep < ikigaiQuestions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsComplete(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setResponses({
      whatYouLove: [],
      whatYoureGoodAt: [],
      whatTheWorldNeeds: [],
      whatYouCanBePaidFor: []
    })
    setCurrentResponse('')
    setIsComplete(false)
  }

  const generateIkigai = () => {
    // This would typically call an AI service to analyze responses
    return {
      passion: "Technology and helping others learn",
      mission: "Democratizing education through technology",
      profession: "Educational Technology Developer",
      vocation: "Creating accessible learning platforms",
      ikigai: "Empowering people through innovative educational technology solutions"
    }
  }

  const handleSaveIkigai = async () => {
    setIsSaving(true)
    try {
      const ikigaiData = {
        responses,
        generatedIkigai: generateIkigai(),
        completedAt: new Date().toISOString()
      }
      
      // TODO: Save to Supabase
      console.log('Saving Ikigai:', ikigaiData)
      
      // Save to localStorage for persistence
      localStorage.setItem('ikigaiData', JSON.stringify(ikigaiData))
      localStorage.setItem('ikigaiCompleted', 'true')
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Navigate to dashboard after successful save
      navigate('/dashboard', { 
        state: { 
          message: 'Ikigai saved successfully! Your journey continues.',
          ikigaiComplete: true 
        }
      })
    } catch (error) {
      console.error('Error saving Ikigai:', error)
      alert('Error saving your Ikigai. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleContinueJourney = () => {
    navigate('/dashboard')
  }

  if (isComplete) {
    const ikigai = generateIkigai()
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                🌸 Your Ikigai Discovery 🌸
              </h1>
              <p className="text-gray-600">
                {alreadyCompleted 
                  ? "Here's your saved Ikigai. You can update it anytime." 
                  : "Based on your responses, here's your personalized Ikigai"
                }
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div className="p-4 bg-red-50 rounded-lg">
                  <h3 className="font-semibold text-red-700 mb-2">Your Passion</h3>
                  <p className="text-gray-700">{ikigai.passion}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-700 mb-2">Your Mission</h3>
                  <p className="text-gray-700">{ikigai.mission}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h3 className="font-semibold text-yellow-700 mb-2">Your Profession</h3>
                  <p className="text-gray-700">{ikigai.profession}</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-700 mb-2">Your Vocation</h3>
                  <p className="text-gray-700">{ikigai.vocation}</p>
                </div>
              </div>
            </div>

            <div className="text-center p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Ikigai</h2>
              <p className="text-lg text-gray-700 italic">"{ikigai.ikigai}"</p>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={handleReset}
                className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Start Over
              </button>
              <button
                onClick={handleSaveIkigai}
                disabled={isSaving}
                className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Save My Ikigai
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header with back button */}
      <div className="p-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>
      </div>
      
      <div className="px-6">
        <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Discover Your Ikigai</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/profile')}
                className="text-sm text-gray-600 hover:text-primary-600 underline"
              >
                Skip & go to Profile
              </button>
              <span className="text-sm text-gray-600">
                {currentStep + 1} of {ikigaiQuestions.length}
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / ikigaiQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Question Header */}
          <div className={`text-center mb-8 p-6 ${currentQuestion.bgColor} rounded-lg`}>
            <Icon className={`w-12 h-12 ${currentQuestion.color} mx-auto mb-4`} />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {currentQuestion.title}
            </h2>
            <p className="text-gray-600">{currentQuestion.subtitle}</p>
          </div>

          {/* Questions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Reflect on these questions:
            </h3>
            <ul className="space-y-2 text-gray-700">
              {currentQuestion.questions.map((question, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  {question}
                </li>
              ))}
            </ul>
          </div>

          {/* Response Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your thoughts:
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentResponse}
                onChange={(e) => setCurrentResponse(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddResponse()}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Share your thoughts and press Enter or click Add"
              />
              <button
                onClick={handleAddResponse}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Add
              </button>
            </div>
          </div>

          {/* Current Responses */}
          {responses[currentQuestion.id].length > 0 && (
            <div className="mb-8">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Your responses:</h4>
              <div className="space-y-2">
                {responses[currentQuestion.id].map((response, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-700">{response}</span>
                    <button
                      onClick={() => handleRemoveResponse(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </button>
            <button
                onClick={handleNext}
                disabled={responses[currentQuestion.id].length === 0}
                className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === ikigaiQuestions.length - 1 ? 'Generate My Ikigai' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default IkigaiPage