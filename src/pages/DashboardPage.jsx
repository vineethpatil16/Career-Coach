import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { 
  User, 
  Target, 
  BookOpen, 
  BarChart3, 
  Zap, 
  Plus, 
  Calendar,
  TrendingUp,
  MessageSquare,
  Building2,
  LogOut,
  Quote,
  CheckCircle
} from 'lucide-react'
import { PHASES } from '../constants'

const Dashboard = () => {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const [currentPhase] = useState(1) // This would come from user data
  const [phaseProgress] = useState(25) // This would be calculated based on completed tasks
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [ikigaiCompleted, setIkigaiCompleted] = useState(false) // Track Ikigai completion
  const [profileCompleted, setProfileCompleted] = useState(false) // Track Profile completion
  
  // Check for success message from navigation state
  useEffect(() => {
    if (location.state?.message) {
      setShowSuccessMessage(true)
      
      // Update completion states
      if (location.state?.ikigaiComplete) {
        setIkigaiCompleted(true)
        localStorage.setItem('ikigaiCompleted', 'true')
      }
      if (location.state?.profileComplete) {
        setProfileCompleted(true)
        localStorage.setItem('profileCompleted', 'true')
      }
      
      // Clear the message after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccessMessage(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [location.state])

  // Load completion states from localStorage on component mount
  useEffect(() => {
    const savedIkigaiState = localStorage.getItem('ikigaiCompleted')
    const savedProfileState = localStorage.getItem('profileCompleted')
    
    if (savedIkigaiState === 'true') {
      setIkigaiCompleted(true)
    }
    if (savedProfileState === 'true') {
      setProfileCompleted(true)
    }
  }, [])
  
  const [projects, setProjects] = useState([
    { id: 1, title: 'Personal Portfolio Website', status: 'in_progress', priority: 'high' },
    { id: 2, title: 'React Learning Project', status: 'todo', priority: 'medium' },
    { id: 3, title: 'Data Analysis Certification', status: 'completed', priority: 'high' }
  ])

  const handleAddProject = () => {
    if (newProject.title.trim()) {
      const project = {
        id: projects.length + 1,
        ...newProject,
        title: newProject.title.trim()
      }
      setProjects([...projects, project])
      setNewProject({ title: '', status: 'todo', priority: 'medium' })
      setShowAddProject(false)
    }
  }

  const handleProjectStatusChange = (projectId, newStatus) => {
    setProjects(projects.map(project => 
      project.id === projectId ? { ...project, status: newStatus } : project
    ))
  }

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter(project => project.id !== projectId))
  }

  const handleSaveStudy = async () => {
    if (!todayStudied.trim()) return
    
    setIsSavingStudy(true)
    try {
      // TODO: Save to database
      console.log('Saving study entry:', todayStudied)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Clear the input and show success
      setTodayStudied('')
      alert('Study entry saved successfully!')
    } catch (error) {
      console.error('Error saving study entry:', error)
      alert('Error saving study entry')
    } finally {
      setIsSavingStudy(false)
    }
  }

  const handleSaveJournal = async () => {
    if (!journalEntry.trim()) return
    
    setIsSavingJournal(true)
    try {
      // TODO: Save to database
      console.log('Saving journal entry:', journalEntry)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Clear the input and show success
      setJournalEntry('')
      alert('Journal entry saved successfully!')
    } catch (error) {
      console.error('Error saving journal entry:', error)
      alert('Error saving journal entry')
    } finally {
      setIsSavingJournal(false)
    }
  }

  const handleGenerateAIPost = async () => {
    setIsGeneratingPost(true)
    try {
      // TODO: Connect to AI service
      const aiGeneratedPosts = {
        linkedin: `🚀 Excited to share my latest learning journey! Just completed a deep dive into React hooks and modern JavaScript patterns. 

The transformation in my coding approach has been incredible - from class components to functional components with hooks, the code is now cleaner and more maintainable.

Key takeaways:
✅ useState for state management
✅ useEffect for side effects
✅ Custom hooks for reusable logic

What's your favorite React pattern? Would love to hear your thoughts! 

#ReactJS #JavaScript #WebDevelopment #Learning #TechJourney`,
        
        twitter: `🚀 Just leveled up my React skills! 

useState ✅
useEffect ✅ 
Custom hooks ✅

The journey from class to functional components has been amazing. Code is cleaner, more readable, and easier to test.

What's your favorite React pattern?

#ReactJS #JavaScript #WebDev #100DaysOfCode`
      }
      
      await new Promise(resolve => setTimeout(resolve, 1500))
      setPostContent(aiGeneratedPosts[postPlatform])
    } catch (error) {
      console.error('Error generating AI post:', error)
      alert('Error generating post. Please try again.')
    } finally {
      setIsGeneratingPost(false)
    }
  }

  const [todayStudied, setTodayStudied] = useState('')
  const [journalEntry, setJournalEntry] = useState('')
  const [postContent, setPostContent] = useState('')
  const [postPlatform, setPostPlatform] = useState('linkedin')
  const [showAddProject, setShowAddProject] = useState(false)
  const [newProject, setNewProject] = useState({ title: '', status: 'todo', priority: 'medium' })
  const [isGeneratingPost, setIsGeneratingPost] = useState(false)
  const [isSavingStudy, setIsSavingStudy] = useState(false)
  const [isSavingJournal, setIsSavingJournal] = useState(false)

  const motivationalQuotes = [
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs"
  ]

  const [currentQuote] = useState(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)])

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'review': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500'
      case 'medium': return 'border-l-yellow-500'
      default: return 'border-l-green-500'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <span className="text-gray-500">
                Welcome back, {user?.user_metadata?.first_name || 'User'}!
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/profile" 
                className="flex items-center text-gray-600 hover:text-primary-600"
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </Link>
              <button
                onClick={signOut}
                className="flex items-center text-gray-600 hover:text-red-600"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Success Message */}
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4"
          >
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <p className="text-green-800 font-medium">{location.state?.message}</p>
            </div>
          </motion.div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Motivational Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-6 rounded-lg"
            >
              <Quote className="w-8 h-8 mb-4 opacity-75" />
              <p className="text-lg italic mb-2">{currentQuote}</p>
            </motion.div>

            {/* Projects Tracker - Kanban Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Project Tracker</h2>
                <button 
                  onClick={() => setShowAddProject(true)}
                  className="flex items-center text-primary-600 hover:text-primary-700"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Project
                </button>
              </div>
              
              {/* Add Project Form */}
              {showAddProject && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Project title..."
                      value={newProject.title}
                      onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <div className="flex space-x-3">
                      <select
                        value={newProject.priority}
                        onChange={(e) => setNewProject({...newProject, priority: e.target.value})}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                      </select>
                      <select
                        value={newProject.status}
                        onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="todo">To Do</option>
                        <option value="in_progress">In Progress</option>
                        <option value="review">Review</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleAddProject}
                        className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                      >
                        Add Project
                      </button>
                      <button
                        onClick={() => setShowAddProject(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                {projects.map((project) => (
                  <div 
                    key={project.id}
                    className={`border-l-4 ${getPriorityColor(project.priority)} bg-gray-50 p-4 rounded-r-lg`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{project.title}</h3>
                        <div className="flex items-center space-x-2 mt-2">
                          <select
                            value={project.status}
                            onChange={(e) => handleProjectStatusChange(project.id, e.target.value)}
                            className={`text-xs rounded-full px-2 py-1 border-0 ${getStatusColor(project.status)}`}
                          >
                            <option value="todo">To Do</option>
                            <option value="in_progress">In Progress</option>
                            <option value="review">Review</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          project.priority === 'high' ? 'bg-red-100 text-red-700' :
                          project.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {project.priority}
                        </span>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Study Input & Journal */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  What did you study today?
                </h3>
                <textarea
                  value={todayStudied}
                  onChange={(e) => setTodayStudied(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={4}
                  placeholder="Share what you learned today..."
                />
                <button 
                  onClick={handleSaveStudy}
                  disabled={!todayStudied.trim() || isSavingStudy}
                  className="mt-3 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSavingStudy ? 'Saving...' : 'Save Entry'}
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Journal Your Thoughts
                </h3>
                <textarea
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={4}
                  placeholder="Reflect on your progress, challenges, or insights..."
                />
                <button 
                  onClick={handleSaveJournal}
                  disabled={!journalEntry.trim() || isSavingJournal}
                  className="mt-3 px-4 py-2 bg-secondary-600 text-white rounded-md hover:bg-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSavingJournal ? 'Saving...' : 'Save Journal'}
                </button>
              </motion.div>
            </div>

            {/* Post Generator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Social Media Post Generator
              </h3>
              <div className="mb-4">
                <div className="flex space-x-4 mb-3">
                  <button
                    onClick={() => setPostPlatform('linkedin')}
                    className={`px-4 py-2 rounded-md ${
                      postPlatform === 'linkedin' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    LinkedIn
                  </button>
                  <button
                    onClick={() => setPostPlatform('twitter')}
                    className={`px-4 py-2 rounded-md ${
                      postPlatform === 'twitter' 
                        ? 'bg-blue-400 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Twitter/X
                  </button>
                </div>
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={3}
                  placeholder={`Write your ${postPlatform} post...`}
                />
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={handleGenerateAIPost}
                  disabled={isGeneratingPost}
                  className="px-4 py-2 bg-accent-600 text-white rounded-md hover:bg-accent-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingPost ? 'Generating...' : 'Generate AI Post'}
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                  Save Draft
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            
            {/* Phase Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
                Your Journey Progress
              </h3>
              <div className="flex justify-center mb-6">
                <div className="w-32 h-32">
                  <CircularProgressbar
                    value={phaseProgress}
                    text={`${phaseProgress}%`}
                    styles={buildStyles({
                      textColor: '#374151',
                      pathColor: '#3B82F6',
                      trailColor: '#E5E7EB'
                    })}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                {Object.values(PHASES).map((phase) => (
                  <div
                    key={phase.number}
                    className={`flex items-center p-3 rounded-lg ${
                      phase.number === currentPhase 
                        ? 'bg-primary-50 border border-primary-200' 
                        : phase.number < currentPhase 
                        ? 'bg-green-50' 
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      phase.number === currentPhase 
                        ? 'bg-primary-600 text-white' 
                        : phase.number < currentPhase 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {phase.number}
                    </div>
                    <span className={`ml-3 font-medium ${
                      phase.number === currentPhase 
                        ? 'text-primary-900' 
                        : phase.number < currentPhase 
                        ? 'text-green-900' 
                        : 'text-gray-600'
                    }`}>
                      {phase.name}
                    </span>
                  </div>
                ))}
              </div>
              
              <Link
                to={ikigaiCompleted ? "/explore" : "/ikigai"}
                className="block w-full mt-6 bg-primary-600 text-white text-center py-2 rounded-md hover:bg-primary-700"
              >
                {ikigaiCompleted ? 'Continue to Explore' : 'Start Your Journey'}
              </Link>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/ikigai"
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    ikigaiCompleted 
                      ? 'text-green-700 bg-green-50 hover:bg-green-100' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Target className={`w-5 h-5 mr-3 ${ikigaiCompleted ? 'text-green-500' : 'text-red-500'}`} />
                  <div className="flex-1">
                    <span className="font-medium">
                      {ikigaiCompleted ? 'Review Ikigai' : 'Discover Ikigai'}
                    </span>
                    {ikigaiCompleted && (
                      <div className="text-xs text-green-600 mt-1">✓ Completed</div>
                    )}
                  </div>
                </Link>
                <Link
                  to="/profile"
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    profileCompleted 
                      ? 'text-green-700 bg-green-50 hover:bg-green-100' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <User className={`w-5 h-5 mr-3 ${profileCompleted ? 'text-green-500' : 'text-blue-500'}`} />
                  <div className="flex-1">
                    <span className="font-medium">
                      {profileCompleted ? 'Update Profile' : 'Complete Profile'}
                    </span>
                    {profileCompleted && (
                      <div className="text-xs text-green-600 mt-1">✓ Completed</div>
                    )}
                  </div>
                </Link>
                <Link
                  to="/explore"
                  className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <BookOpen className="w-5 h-5 mr-3 text-green-500" />
                  Explore Resources
                </Link>
                <Link
                  to="/reflect"
                  className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <BarChart3 className="w-5 h-5 mr-3 text-purple-500" />
                  Track Progress
                </Link>
                <Link
                  to="/act"
                  className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <Building2 className="w-5 h-5 mr-3 text-orange-500" />
                  Target Companies
                </Link>
              </div>
            </motion.div>

            {/* Target Companies Alert */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-orange-50 border border-orange-200 rounded-lg p-4"
            >
              <div className="flex items-center">
                <Building2 className="w-5 h-5 text-orange-600 mr-2" />
                <h4 className="font-medium text-orange-900">Company Alerts</h4>
              </div>
              <p className="text-orange-700 text-sm mt-1">
                2 new job openings at your target companies
              </p>
              <button className="text-orange-600 hover:text-orange-700 text-sm mt-2 font-medium">
                View Details →
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard