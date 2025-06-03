import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useIkigai } from '../hooks/useIkigai'
import { useUserData } from '../hooks/useUserData'
import { useQuizzes } from '../hooks/useQuizzes'
import { useLinkedinStats } from '../hooks/useLinkedinStats'
import { useCaseStudies } from '../hooks/useCaseStudies'
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Award, 
  Target,
  Brain,
  MessageSquare,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowLeft
} from 'lucide-react'

const ReflectPage = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week')
  const [activeMetric, setActiveMetric] = useState('overall')
  const navigate = useNavigate()

  // Get data from hooks
  const { userData, loading: userLoading } = useUserData()
  const { quizzes, loading: quizzesLoading } = useQuizzes()
  const { linkedin, loading: linkedinLoading } = useLinkedinStats()
  const { caseStudies, loading: caseStudiesLoading } = useCaseStudies()
  const { ikigai, loading: ikigaiLoading } = useIkigai()

  // Button handlers
  const handleRefreshData = () => {
    // Refresh data from hooks
    useUserData.refetch()
    useQuizzes.refetch()
    useLinkedinStats.refetch()
    useCaseStudies.refetch()
    useIkigai.refetch()
    alert('Data refreshed!')
  }

  const handleTakeNewAssessment = () => {
    navigate('/quiz')
  }

  const handleUpdateIkigai = () => {
    navigate('/ikigai')
  }

  const handleQuizClick = (quizId) => {
    navigate(`/quiz/${quizId}`)
  }

  const handleCaseStudyClick = (studyId) => {
    navigate(`/case-study/${studyId}`)
  }

  const handleActionClick = (action) => {
    switch(action) {
      case 'promises-quiz':
        navigate('/quiz/promises')
        break
      case 'ai-ethics-study':
        navigate('/case-study/ai-ethics')
        break
      case 'linkedin-posting':
        navigate('/social/linkedin')
        break
      default:
        alert('Action taken!')
    }
  }

  // Calculate performance data based on user data
  const performanceData = useMemo(() => {
    if (userLoading || !userData) {
      return {
        overall: { score: 0, change: '0%', trend: 'up' },
        skills: { score: 0, change: '0%', trend: 'up' },
        consistency: { score: 0, change: '0%', trend: 'up' },
        networking: { score: 0, change: '0%', trend: 'up' }
      }
    }

    return {
      overall: {
        score: userData.overall_score || 78,
        change: userData.overall_change || '+12%',
        trend: userData.overall_trend || 'up'
      },
      skills: {
        score: userData.skills_score || 85,
        change: userData.skills_change || '+8%',
        trend: userData.skills_trend || 'up'
      },
      consistency: {
        score: userData.consistency_score || 72,
        change: userData.consistency_change || '+15%',
        trend: userData.consistency_trend || 'up'
      },
      networking: {
        score: userData.networking_score || 65,
        change: userData.networking_change || '+5%',
        trend: userData.networking_trend || 'up'
      }
    }
  }, [userData, userLoading])

  // Process quiz data
  const quizResults = useMemo(() => {
    if (quizzesLoading || !quizzes) {
      return []
    }
    
    return quizzes.map(quiz => ({
      id: quiz.id,
      title: quiz.title,
      category: quiz.category,
      score: quiz.score,
      totalQuestions: quiz.total_questions,
      correctAnswers: quiz.correct_answers,
      date: new Date(quiz.completed_at).toLocaleDateString(),
      timeSpent: `${quiz.time_spent_minutes} min`,
      strengths: quiz.strengths ? JSON.parse(quiz.strengths) : [],
      weaknesses: quiz.weaknesses ? JSON.parse(quiz.weaknesses) : [],
      improvement: quiz.improvement || '+0%'
    }))
  }, [quizzes, quizzesLoading])

  // Process case study data
  const caseStudyProgress = useMemo(() => {
    if (caseStudiesLoading || !caseStudies) {
      return []
    }
    
    return caseStudies.map(study => ({
      id: study.id,
      title: study.title,
      category: study.category,
      progress: study.progress_percentage,
      status: study.status,
      score: study.score,
      timeSpent: `${study.time_spent_hours} hours`,
      insights: study.insights ? JSON.parse(study.insights) : [],
      dateCompleted: study.completed_at ? new Date(study.completed_at).toLocaleDateString() : null,
      dateStarted: study.started_at ? new Date(study.started_at).toLocaleDateString() : null
    }))
  }, [caseStudies, caseStudiesLoading])

  // Process LinkedIn data
  const linkedinConsistency = useMemo(() => {
    if (linkedinLoading || !linkedin) {
      return {
        totalPosts: 0,
        targetPosts: 30,
        engagement: 0,
        followers: 0,
        consistency: 0,
        bestPerformingPost: {
          content: 'No posts yet',
          likes: 0,
          comments: 0,
          shares: 0
        },
        weeklyData: []
      }
    }
    
    return {
      totalPosts: linkedin.total_posts || 0,
      targetPosts: linkedin.target_posts || 30,
      engagement: linkedin.engagement || 0,
      followers: linkedin.followers || 0,
      consistency: linkedin.consistency_percentage || 0,
      bestPerformingPost: linkedin.best_post ? {
        content: linkedin.best_post.content || '',
        likes: linkedin.best_post.likes || 0,
        comments: linkedin.best_post.comments || 0,
        shares: linkedin.best_post.shares || 0
      } : {
        content: 'No posts yet',
        likes: 0,
        comments: 0,
        shares: 0
      },
      weeklyData: linkedin.weekly_data ? JSON.parse(linkedin.weekly_data) : []
    }
  }, [linkedin, linkedinLoading])

  // Process Ikigai data
  const ikigaiReflection = useMemo(() => {
    if (ikigaiLoading || !ikigai) {
      return {
        lastUpdated: 'Not completed',
        confidence: 0,
        alignment: { passion: 0, mission: 0, vocation: 0, profession: 0 },
        needsReview: false,
        keyInsights: ['Complete your Ikigai assessment to see insights']
      }
    }
    
    // Parse the generated_ikigai JSON if it's stored as a string
    const generatedIkigai = typeof ikigai.generated_ikigai === 'string' 
      ? JSON.parse(ikigai.generated_ikigai) 
      : ikigai.generated_ikigai || {};
      
    // Calculate how long since last update
    const daysSinceUpdate = ikigai.updated_at 
      ? Math.floor((new Date() - new Date(ikigai.updated_at)) / (1000 * 60 * 60 * 24))
      : 0;
    
    return {
      lastUpdated: ikigai.updated_at ? new Date(ikigai.updated_at).toLocaleDateString() : 'Not updated',
      confidence: 85, // Could calculate this based on completeness
      alignment: {
        passion: generatedIkigai?.passion ? 90 : 50,
        mission: generatedIkigai?.mission ? 80 : 50,
        vocation: generatedIkigai?.vocation ? 85 : 50,
        profession: generatedIkigai?.profession ? 85 : 50,
      },
      needsReview: daysSinceUpdate > 90, // Suggest review after 90 days
      keyInsights: [
        generatedIkigai?.ikigai || 'Complete your Ikigai assessment',
        daysSinceUpdate > 90 ? 'Consider reviewing your Ikigai' : 'Your Ikigai is up to date',
        'Explore opportunities in ' + (generatedIkigai?.profession || 'your field')
      ]
    };
  }, [ikigai, ikigaiLoading]);

  const getScoreColor = (score) => {
    if (score >= 80) return '#10B981' // green
    if (score >= 60) return '#F59E0B' // yellow
    return '#EF4444' // red
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-600" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  // Simple circular progress component
  const CircularProgress = ({ value, size = 80, strokeWidth = 8, className = "" }) => {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDasharray = `${circumference} ${circumference}`
    const strokeDashoffset = circumference - (value / 100) * circumference

    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#3B82F6"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>
        <span className="absolute text-sm font-semibold text-gray-700">
          {value}%
        </span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center text-gray-600 hover:text-gray-800 mr-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Reflect</h1>
                <p className="text-gray-600 mt-1">Track your progress and analyze your growth</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <button 
                onClick={handleRefreshData}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(performanceData).map(([key, data]) => (
            <div 
              key={key}
              onClick={() => setActiveMetric(key)}
              className={`bg-white rounded-lg shadow p-6 cursor-pointer transition-all hover:shadow-md ${
                activeMetric === key ? 'ring-2 ring-blue-500 shadow-lg' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 capitalize">
                  {key === 'overall' ? 'Overall Score' : key}
                </h3>
                <TrendingUp className={`w-5 h-5 ${data.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900">{data.score}%</span>
                <span className={`text-sm font-medium ${data.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {data.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quiz Results & Analysis */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Brain className="w-6 h-6 mr-2 text-purple-600" />
                Quiz Performance Summary
              </h2>
              
              {quizzesLoading ? (
                <div className="text-center py-8">Loading quiz results...</div>
              ) : quizResults.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">You haven't taken any quizzes yet.</p>
                  <button 
                    onClick={handleTakeNewAssessment}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg"
                  >
                    Take Your First Quiz
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {quizResults.map((quiz) => (
                    <div 
                      key={quiz.id} 
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleQuizClick(quiz.id)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{quiz.title}</h3>
                          <p className="text-sm text-gray-600">{quiz.category} • {quiz.date}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold" style={{ color: getScoreColor(quiz.score) }}>
                            {quiz.score}%
                          </div>
                          <div className="text-sm text-green-600">{quiz.improvement}</div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Correct Answers</p>
                          <p className="font-medium">{quiz.correctAnswers}/{quiz.totalQuestions}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Time Spent</p>
                          <p className="font-medium">{quiz.timeSpent}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Improvement</p>
                          <p className="font-medium text-green-600">{quiz.improvement}</p>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-2">Strengths</p>
                          <div className="flex flex-wrap gap-1">
                            {quiz.strengths.map((strength, index) => (
                              <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                                {strength}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-2">Areas to Improve</p>
                          <div className="flex flex-wrap gap-1">
                            {quiz.weaknesses.map((weakness, index) => (
                              <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                                {weakness}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <button 
                onClick={handleTakeNewAssessment}
                className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Take New Assessment
              </button>
            </div>

            {/* Case Studies Progress */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Award className="w-6 h-6 mr-2 text-orange-600" />
                Case Studies Analysis
              </h2>
              
              {caseStudiesLoading ? (
                <div className="text-center py-8">Loading case studies...</div>
              ) : caseStudyProgress.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">You haven't started any case studies yet.</p>
                  <button 
                    onClick={() => navigate('/explore/case-studies')}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg"
                  >
                    Browse Case Studies
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {caseStudyProgress.map((study) => (
                    <div 
                      key={study.id} 
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleCaseStudyClick(study.id)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-start space-x-3">
                          {getStatusIcon(study.status)}
                          <div>
                            <h3 className="font-medium text-gray-900">{study.title}</h3>
                            <p className="text-sm text-gray-600">{study.category}</p>
                          </div>
                        </div>
                        {study.score && (
                          <div className="text-right">
                            <div className="text-lg font-bold" style={{ color: getScoreColor(study.score) }}>
                              {study.score}%
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Progress</span>
                          <span className="text-sm text-gray-600">{study.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-600 h-2 rounded-full transition-all"
                            style={{ width: `${study.progress}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Time Spent: <span className="font-medium">{study.timeSpent}</span></p>
                          <p className="text-sm text-gray-600">
                            {study.status === 'completed' ? 'Completed: ' : 'Started: '}
                            <span className="font-medium">
                              {study.status === 'completed' ? study.dateCompleted : study.dateStarted}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-1">Key Insights</p>
                          <div className="flex flex-wrap gap-1">
                            {study.insights.map((insight, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                {insight}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            
            {/* LinkedIn Consistency */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
                LinkedIn Consistency
              </h3>
              
              {linkedinLoading ? (
                <div className="text-center py-6">Loading LinkedIn data...</div>
              ) : !linkedin ? (
                <div className="text-center py-6">
                  <p className="mb-4">Connect your LinkedIn account to track your consistency</p>
                  <button 
                    onClick={() => navigate('/settings/social')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Connect LinkedIn
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <div className="flex justify-center">
                      <CircularProgress value={linkedinConsistency.consistency} size={96} />
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Monthly Consistency</p>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Posts This Month</span>
                      <span className="font-medium">{linkedinConsistency.totalPosts}/{linkedinConsistency.targetPosts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Engagement</span>
                      <span className="font-medium">{linkedinConsistency.engagement}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Followers</span>
                      <span className="font-medium">{linkedinConsistency.followers}</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Best Performing Post</h4>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm text-gray-700 mb-2">{linkedinConsistency.bestPerformingPost.content}</p>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>{linkedinConsistency.bestPerformingPost.likes} likes</span>
                        <span>{linkedinConsistency.bestPerformingPost.comments} comments</span>
                        <span>{linkedinConsistency.bestPerformingPost.shares} shares</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Ikigai Reflection */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-pink-600" />
                Ikigai Reflection
              </h3>
              
              {ikigaiLoading ? (
                <div className="text-center py-6">Loading Ikigai data...</div>
              ) : !ikigai ? (
                <div className="text-center py-6">
                  <p className="mb-4">You haven't completed your Ikigai assessment yet</p>
                  <button 
                    onClick={() => navigate('/ikigai')}
                    className="px-4 py-2 bg-pink-600 text-white rounded-lg"
                  >
                    Discover Your Ikigai
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-4">
                    <div className="flex justify-center">
                      <CircularProgress value={ikigaiReflection.confidence} size={80} />
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Confidence Level</p>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Passion Alignment</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full transition-all" style={{ width: `${ikigaiReflection.alignment.passion}%` }} />
                        </div>
                        <span className="text-sm font-medium">{ikigaiReflection.alignment.passion}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Mission Clarity</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${ikigaiReflection.alignment.mission}%` }} />
                        </div>
                        <span className="text-sm font-medium">{ikigaiReflection.alignment.mission}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Vocation Match</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${ikigaiReflection.alignment.vocation}%` }} />
                        </div>
                        <span className="text-sm font-medium">{ikigaiReflection.alignment.vocation}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Profession Fit</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full transition-all" style={{ width: `${ikigaiReflection.alignment.profession}%` }} />
                        </div>
                        <span className="text-sm font-medium">{ikigaiReflection.alignment.profession}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Key Insights</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {ikigaiReflection.keyInsights.map((insight, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-pink-600 mr-2">•</span>
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button 
                    onClick={handleUpdateIkigai}
                    className="w-full mt-4 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors"
                  >
                    Update Ikigai
                  </button>
                </>
              )}
            </div>

            {/* Action Recommendations */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 Recommended Actions</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div 
                    className="flex-1 cursor-pointer hover:bg-white hover:bg-opacity-50 p-2 rounded transition-colors"
                    onClick={() => handleActionClick('promises-quiz')}
                  >
                    <p className="font-medium text-gray-900">Complete JavaScript Promises Quiz</p>
                    <p className="text-sm text-gray-600">Address your weakest area from recent assessments</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div 
                    className="flex-1 cursor-pointer hover:bg-white hover:bg-opacity-50 p-2 rounded transition-colors"
                    onClick={() => handleActionClick('ai-ethics-study')}
                  >
                    <p className="font-medium text-gray-900">Finish AI Ethics Case Study</p>
                    <p className="text-sm text-gray-600">You're 75% complete - push through to finish</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div 
                    className="flex-1 cursor-pointer hover:bg-white hover:bg-opacity-50 p-2 rounded transition-colors"
                    onClick={() => handleActionClick('linkedin-posting')}
                  >
                    <p className="font-medium text-gray-900">Increase LinkedIn Posting</p>
                    <p className="text-sm text-gray-600">6 more posts needed to hit monthly target</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReflectPage