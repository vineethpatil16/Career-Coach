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
  TrendingUp,
  ArrowRight,
  ArrowLeft
} from 'lucide-react'

const ExplorePage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('companies')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilters, setSelectedFilters] = useState([])
  const [filteredData, setFilteredData] = useState({
    companies: [],
    roles: [],
    resources: [],
    studies: []
  })

  // Filter data based on search query
  useEffect(() => {
    const filterBySearch = (items, searchFields) => {
      if (!searchQuery.trim()) return items
      
      return items.filter(item => 
        searchFields.some(field => 
          item[field]?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }

    setFilteredData({
      companies: filterBySearch(companyData, ['name', 'industry', 'description']),
      roles: filterBySearch(jobRoles, ['title', 'category', 'description']),
      resources: filterBySearch(aiResources, ['title', 'description', 'source']),
      studies: filterBySearch(caseStudies, ['title', 'category', 'keyLearnings'])
    })
  }, [searchQuery])

  // Initialize filtered data
  useEffect(() => {
    setFilteredData({
      companies: companyData,
      roles: jobRoles,
      resources: aiResources,
      studies: caseStudies
    })
  }, [])

  const tabs = [
    { id: 'companies', label: 'Company Research', icon: Building2, color: 'text-blue-600' },
    { id: 'roles', label: 'Job Roles', icon: Briefcase, color: 'text-green-600' },
    { id: 'ai-research', label: 'AI Research', icon: Brain, color: 'text-purple-600' },
    { id: 'case-studies', label: 'Case Studies', icon: BookOpen, color: 'text-orange-600' }
  ]

  const companyData = [
    {
      id: 1,
      name: 'Google',
      industry: 'Technology',
      size: '100,000+',
      rating: 4.4,
      description: 'Leading technology company focusing on search, cloud computing, and AI.',
      openRoles: 245,
      culture: ['Innovation', 'Collaboration', 'Growth'],
      benefits: ['Health Insurance', 'Stock Options', 'Learning Budget'],
      recentNews: 'Google announces new AI initiatives for 2024'
    },
    {
      id: 2,
      name: 'Microsoft',
      industry: 'Technology',
      size: '50,000+',
      rating: 4.5,
      description: 'Global technology company known for software, cloud services, and productivity tools.',
      openRoles: 189,
      culture: ['Diversity', 'Innovation', 'Empowerment'],
      benefits: ['Healthcare', 'Retirement Plans', 'Flexible Work'],
      recentNews: 'Microsoft expands Azure AI capabilities'
    },
    {
      id: 3,
      name: 'Tesla',
      industry: 'Automotive/Energy',
      size: '10,000+',
      rating: 3.9,
      description: 'Electric vehicle and clean energy company revolutionizing transportation.',
      openRoles: 156,
      culture: ['Innovation', 'Sustainability', 'Fast-paced'],
      benefits: ['Stock Options', 'Health Insurance', 'Employee Discounts'],
      recentNews: 'Tesla announces new Gigafactory location'
    }
  ]

  const jobRoles = [
    {
      id: 1,
      title: 'Software Engineer',
      category: 'Technology',
      level: 'Mid-Level',
      avgSalary: '$95,000',
      growth: '+22%',
      skills: ['Python', 'React', 'Node.js', 'SQL'],
      description: 'Design and develop software applications and systems.',
      demand: 'High',
      companies: ['Google', 'Microsoft', 'Meta']
    },
    {
      id: 2,
      title: 'Data Scientist',
      category: 'Analytics',
      level: 'Senior',
      avgSalary: '$115,000',
      growth: '+35%',
      skills: ['Python', 'R', 'SQL', 'Machine Learning'],
      description: 'Analyze complex data to drive business decisions.',
      demand: 'Very High',
      companies: ['Netflix', 'Uber', 'Airbnb']
    },
    {
      id: 3,
      title: 'Product Manager',
      category: 'Product',
      level: 'Mid-Level',
      avgSalary: '$125,000',
      growth: '+18%',
      skills: ['Strategy', 'Analytics', 'Communication', 'Agile'],
      description: 'Lead product development from conception to launch.',
      demand: 'High',
      companies: ['Apple', 'Amazon', 'Spotify']
    }
  ]

  const aiResources = [
    {
      id: 1,
      title: 'The Future of AI in Workplace',
      type: 'Article',
      readTime: '8 min',
      difficulty: 'Beginner',
      source: 'Harvard Business Review',
      description: 'How artificial intelligence is reshaping modern workplaces and job roles.',
      tags: ['Future of Work', 'AI Trends', 'Career Planning']
    },
    {
      id: 2,
      title: 'Machine Learning Career Path Guide',
      type: 'Guide',
      readTime: '15 min',
      difficulty: 'Intermediate',
      source: 'Coursera',
      description: 'Complete roadmap for transitioning into machine learning careers.',
      tags: ['Machine Learning', 'Career Transition', 'Skills Development']
    },
    {
      id: 3,
      title: 'AI Tools for Productivity',
      type: 'Tutorial',
      readTime: '12 min',
      difficulty: 'Beginner',
      source: 'TechCrunch',
      description: 'Top AI tools that can boost your productivity and efficiency.',
      tags: ['Productivity', 'AI Tools', 'Automation']
    }
  ]

  const caseStudies = [
    {
      id: 1,
      title: 'How Sarah Transitioned from Marketing to Data Science',
      category: 'Career Transition',
      duration: '18 months',
      outcome: 'Senior Data Scientist at Spotify',
      keyLearnings: ['Self-taught Python', 'Built portfolio projects', 'Networked strategically'],
      difficulty: 'Advanced',
      completionRate: '0%'
    },
    {
      id: 2,
      title: 'Building a Tech Startup: From Idea to IPO',
      category: 'Entrepreneurship',
      duration: '5 years',
      outcome: 'Successful IPO at $2B valuation',
      keyLearnings: ['Market validation', 'Team building', 'Investor relations'],
      difficulty: 'Expert',
      completionRate: '0%'
    },
    {
      id: 3,
      title: 'Remote Work Success Strategies',
      category: 'Work-Life Balance',
      duration: '6 months',
      outcome: '40% productivity increase',
      keyLearnings: ['Time management', 'Communication tools', 'Boundary setting'],
      difficulty: 'Intermediate',
      completionRate: '75%'
    }
  ]

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-orange-100 text-orange-800'
      case 'Expert': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDemandColor = (demand) => {
    switch (demand) {
      case 'Very High': return 'text-green-600 bg-green-100'
      case 'High': return 'text-blue-600 bg-blue-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
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

        {/* Company Research Tab */}
        {activeTab === 'companies' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="space-y-6">
              {(searchQuery ? filteredData.companies : companyData).map((company) => (
                <div key={company.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{company.name}</h3>
                        <p className="text-gray-600">{company.industry} • {company.size} employees</p>
                        <div className="flex items-center mt-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{company.rating}/5.0</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary-600">{company.openRoles}</span>
                      <p className="text-sm text-gray-600">Open Roles</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{company.description}</p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Culture</h4>
                      <div className="flex flex-wrap gap-1">
                        {company.culture.map((item, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Benefits</h4>
                      <div className="flex flex-wrap gap-1">
                        {company.benefits.map((item, index) => (
                          <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Recent News</h4>
                      <p className="text-sm text-gray-600">{company.recentNews}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t">
                    <button className="text-primary-600 hover:text-primary-700 font-medium">
                      View Detailed Research
                    </button>
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                        Add to Watchlist
                      </button>
                      <a
                        href={`https://careers.${company.name.toLowerCase()}.com`}
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
            </div>
          </motion.div>
        )}

        {/* Job Roles Tab */}
        {activeTab === 'roles' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {(searchQuery ? filteredData.roles : jobRoles).map((role) => (
              <div key={role.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{role.title}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">{role.category} • {role.level}</span>
                    <span className={`px-2 py-1 text-xs rounded ${getDemandColor(role.demand)}`}>
                      {role.demand} Demand
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{role.description}</p>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg. Salary</span>
                    <span className="font-semibold text-green-600">{role.avgSalary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Growth Rate</span>
                    <span className="font-semibold text-blue-600">{role.growth}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Key Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {role.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Top Companies</h4>
                  <p className="text-sm text-gray-600">{role.companies.join(', ')}</p>
                </div>
                
                <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 flex items-center justify-center">
                  Explore Career Path
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            ))}
          </motion.div>
        )}

        {/* AI Research Tab */}
        {activeTab === 'ai-research' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {(searchQuery ? filteredData.resources : aiResources).map((resource) => (
              <div key={resource.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
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
                        {resource.readTime}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {resource.source}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{resource.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t">
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
                    Save for Later
                  </button>
                  <a
                    href={`https://example.com/${resource.type}/${resource.id}`}
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
        {activeTab === 'case-studies' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {(searchQuery ? filteredData.studies : caseStudies).map((study) => (
              <div key={study.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
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
                  <p className="text-sm text-green-700 bg-green-50 p-2 rounded">{study.outcome}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Key Learnings</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {study.keyLearnings.map((learning, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        {learning}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-600">{study.completionRate}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all"
                      style={{ width: study.completionRate }}
                    />
                  </div>
                </div>
                
                <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 flex items-center justify-center">
                  {study.completionRate === '0%' ? 'Start Case Study' : 'Continue Study'}
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