import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Search, 
  Building2, 
  Briefcase, 
  Brain, 
  BookOpen, 
  Filter,
  ExternalLink,
  Star,
  Clock,
  Users,
  ArrowRight,
  ArrowLeft,
  Loader
} from 'lucide-react'
import { useSupabaseQuery } from '../hooks/useSupabaseQuery'
import { supabase } from '../services/supabase'
import { useAuth } from '../context/AuthContext'

const ExplorePage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('companies')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilters, setSelectedFilters] = useState({
    companies: 'all',
    roles: 'all',
    resources: 'all',
    studies: 'all'
  })

  // Fetch functions
  const fetchCompanies = async () => {
    return await supabase
      .from('explore_companies')
      .select('*')
      .order('name')
  }

  const fetchJobRoles = async () => {
    return await supabase
      .from('explore_job_roles')
      .select('*')
      .order('title')
  }

  const fetchAIResources = async () => {
    return await supabase
      .from('explore_ai_resources')
      .select('*')
      .order('created_at', { ascending: false })
  }

  const fetchCaseStudies = async () => {
    return await supabase
      .from('explore_case_studies')
      .select('*')
      .order('created_at', { ascending: false })
  }

  // useSupabaseQuery hooks
  const { 
    data: companies, 
    loading: loadingCompanies,
    error: errorCompanies,
    refetch: refetchCompanies
  } = useSupabaseQuery(fetchCompanies, [])

  const { 
    data: jobRoles, 
    loading: loadingJobRoles,
    error: errorJobRoles,
    refetch: refetchJobRoles
  } = useSupabaseQuery(fetchJobRoles, [])

  const { 
    data: aiResources, 
    loading: loadingAIResources,
    error: errorAIResources,
    refetch: refetchAIResources
  } = useSupabaseQuery(fetchAIResources, [])

  const { 
    data: caseStudies, 
    loading: loadingCaseStudies,
    error: errorCaseStudies,
    refetch: refetchCaseStudies
  } = useSupabaseQuery(fetchCaseStudies, [])

  // Filtered data state
  const [filteredData, setFilteredData] = useState({
    companies: [],
    roles: [],
    resources: [],
    studies: []
  })

  // Update filteredData when searchQuery or source data changes
  useEffect(() => {
    const filterBySearch = (items = [], searchFields = []) => {
      if (!items || !searchQuery.trim()) return items || []
      return items.filter(item => 
        searchFields.some(field => 
          item[field]?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }

    setFilteredData({
      companies: filterBySearch(companies, ['name', 'industry', 'description']),
      roles: filterBySearch(jobRoles, ['title', 'category', 'description']),
      resources: filterBySearch(aiResources, ['title', 'description', 'source']),
      studies: filterBySearch(caseStudies, ['title', 'category', 'key_learnings'])
    })
  }, [searchQuery, companies, jobRoles, aiResources, caseStudies])

  // Initialize filteredData once data is loaded
  useEffect(() => {
    setFilteredData({
      companies: companies || [],
      roles: jobRoles || [],
      resources: aiResources || [],
      studies: caseStudies || []
    })
  }, [companies, jobRoles, aiResources, caseStudies])

  // Save item to favorites
  const saveToFavorites = async (itemType, itemId) => {
    if (!user) {
      alert('Please sign in to save items')
      return
    }

    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .insert({
          user_id: user.id,
          item_type: itemType,
          item_id: itemId,
          created_at: new Date().toISOString()
        })

      if (error) throw error
      alert(`Item saved to your favorites!`)
    } catch (error) {
      console.error('Error saving to favorites:', error)
      alert('Failed to save to favorites. Please try again.')
    }
  }

  const tabs = [
    { id: 'companies', label: 'Company Research', icon: Building2, color: 'text-blue-600' },
    { id: 'roles', label: 'Job Roles', icon: Briefcase, color: 'text-green-600' },
    { id: 'resources', label: 'AI Research', icon: Brain, color: 'text-purple-600' },
    { id: 'studies', label: 'Case Studies', icon: BookOpen, color: 'text-orange-600' }
  ]

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-orange-100 text-orange-800'
      case 'expert': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDemandColor = (demand) => {
    switch (demand?.toLowerCase()) {
      case 'very high': return 'text-green-600 bg-green-100'
      case 'high': return 'text-blue-600 bg-blue-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  // Loading / error for active tab
  const getActiveTabStatus = () => {
    switch (activeTab) {
      case 'companies':
        return { loading: loadingCompanies, error: errorCompanies }
      case 'roles':
        return { loading: loadingJobRoles, error: errorJobRoles }
      case 'resources':
        return { loading: loadingAIResources, error: errorAIResources }
      case 'studies':
        return { loading: loadingCaseStudies, error: errorCaseStudies }
      default:
        return { loading: false, error: null }
    }
  }
  const { loading, error } = getActiveTabStatus()

  // Helper to parse array-like fields (JSON or comma-separated)
  const parseArrayField = (arrayString) => {
    if (!arrayString) return []
    if (Array.isArray(arrayString)) return arrayString

    try {
      return JSON.parse(arrayString)
    } catch {
      return arrayString.split(',').map(item => item.trim())
    }
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
                <h1 className="text-3xl font-bold text-gray-900">Explore</h1>
                <p className="text-gray-600 mt-1">Research companies, roles, and industry insights</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <Icon className={`w-5 h-5 mr-2 ${tab.color}`} />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
        
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader className="w-10 h-10 text-primary-600 animate-spin mb-4" />
            <p className="text-gray-600">Loading data...</p>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-700 mb-4">Error loading data. Please try again later.</p>
            <button 
              onClick={() => {
                if (activeTab === 'companies') refetchCompanies()
                if (activeTab === 'roles') refetchJobRoles()
                if (activeTab === 'resources') refetchAIResources()
                if (activeTab === 'studies') refetchCaseStudies()
              }}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* No Results State */}
        {!loading && !error && filteredData[activeTab]?.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">
              {searchQuery 
                ? 'Try adjusting your search terms or filters' 
                : "We couldn't find any data in this category yet"}
            </p>
          </div>
        )}

        {/* Company Research Tab */}
        {activeTab === 'companies' && !loading && !error && filteredData.companies?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {filteredData.companies.map((company) => (
              <div 
                key={company.id} 
                className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{company.name}</h3>
                      <p className="text-gray-600">
                        {company.industry} • {company.size} employees
                      </p>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">
                          {company.rating}/5.0
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary-600">
                      {company.open_roles}
                    </span>
                    <p className="text-sm text-gray-600">Open Roles</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{company.description}</p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Culture</h4>
                    <div className="flex flex-wrap gap-1">
                      {parseArrayField(company.culture).map((item, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Benefits</h4>
                    <div className="flex flex-wrap gap-1">
                      {parseArrayField(company.benefits).map((item, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Recent News</h4>
                    <p className="text-sm text-gray-600">{company.recent_news}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t">
                  <button 
                    onClick={() => saveToFavorites('company', company.id)}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Save to Favorites
                  </button>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => navigate(`/companies/${company.id}`)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      View Detailed Research
                    </button>
                    <a
                      href={
                        company.website || 
                        `https://careers.${company.name
                          .toLowerCase()
                          .replace(/\s+/g, '')}.com`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center"
                    >
                      View Jobs
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Job Roles Tab */}
        {activeTab === 'roles' && !loading && !error && filteredData.roles?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredData.roles.map((role) => (
              <div 
                key={role.id} 
                className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{role.title}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      {role.category} • {role.level}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded ${getDemandColor(role.demand)}`}>
                      {role.demand} Demand
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{role.description}</p>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg. Salary</span>
                    <span className="font-semibold text-green-600">{role.avg_salary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Growth Rate</span>
                    <span className="font-semibold text-blue-600">{role.growth}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Key Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {parseArrayField(role.skills).map((skill, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Top Companies</h4>
                  <p className="text-sm text-gray-600">
                    {parseArrayField(role.companies).join(', ')}
                  </p>
                </div>
                
                <button 
                  onClick={() => navigate(`/roles/${role.id}`)}
                  className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 flex items-center justify-center"
                >
                  Explore Career Path
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            ))}
          </motion.div>
        )}

        {/* AI Research Tab */}
        {activeTab === 'resources' && !loading && !error && filteredData.resources?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {filteredData.resources.map((resource) => (
              <div 
                key={resource.id} 
                className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{resource.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded ${getDifficultyColor(resource.difficulty)}`}>
                        {resource.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {resource.type}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {resource.read_time}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {resource.source}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{resource.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {parseArrayField(resource.tags).map((tag, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t">
                  <button 
                    onClick={() => saveToFavorites('resource', resource.id)}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Save for Later
                  </button>
                  <a
                    href={resource.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center"
                  >
                    Read Article
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Case Studies Tab */}
        {activeTab === 'studies' && !loading && !error && filteredData.studies?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {filteredData.studies.map((study) => (
              <div 
                key={study.id} 
                className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{study.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded ${getDifficultyColor(study.difficulty)}`}>
                      {study.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span>{study.category}</span>
                    <span>•</span>
                    <span>{study.duration}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Outcome</h4>
                  <p className="text-sm text-green-700 bg-green-50 p-2 rounded">
                    {study.outcome}
                  </p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Key Learnings</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {parseArrayField(study.key_learnings).map((learning, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        {learning}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {user && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Your Progress</span>
                      <span className="text-sm text-gray-600">
                        {study.user_progress || '0%'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all"
                        style={{ width: study.user_progress || '0%' }}
                      />
                    </div>
                  </div>
                )}
                
                <button 
                  onClick={() => navigate(`/case-studies/${study.id}`)}
                  className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 flex items-center justify-center"
                >
                  {study.user_progress && study.user_progress !== '0%' 
                    ? 'Continue Study' 
                    : 'Start Case Study'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ExplorePage
