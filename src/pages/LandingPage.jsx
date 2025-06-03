import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div className="text-2xl font-bold text-primary-600">
          Career Coach AI
        </div>
        <Link 
          to="/signin" 
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          Login
        </Link>
      </header>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center py-20 px-6">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Transform Your Career with AI-Powered Coaching
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover your Ikigai, build projects, and land your dream job with personalized AI guidance.
        </p>
        <Link 
          to="/signup"
          className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          Start Your Journey
        </Link>
      </div>

      {/* Features Preview */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6 py-16">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Discover Your Ikigai</h3>
          <p className="text-gray-600">Find your purpose and passion with AI-guided self-discovery</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📊</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
          <p className="text-gray-600">Monitor your journey through 4 structured phases</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🚀</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Land Your Dream Job</h3>
          <p className="text-gray-600">Build projects and connect with target companies</p>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
