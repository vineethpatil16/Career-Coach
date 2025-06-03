import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Building2, 
  Plus, 
  Search, 
  Filter,
  Star,
  MapPin,
  Users,
  TrendingUp,
  ExternalLink,
  Edit,
  Trash2,
  ArrowLeft,
  Bell,
  Eye
} from 'lucide-react'

const CompaniesPage = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: 'Tata Consultancy Services',
      industry: 'Technology',
      location: 'Mumbai, India',
      size: '500,000+',
      status: 'actively_tracking',
      priority: 'high',
      matchScore: 92,
      openPositions: 156,
      notes: 'Great AI/ML opportunities, strong work culture',
      website: 'https://tcs.com',
      founded: 1968,
      revenue: '$25.7B',
      glassdoorRating: 4.1,
      keyPeople: ['Rajesh Gopinathan - CEO'],
      recentNews: 'TCS announces major AI transformation initiative',
      lastUpdated: '2024-06-01'
    },
    {
      id: 2,
      name: 'Infosys',
      industry: 'Technology',
      location: 'Bangalore, India',
      size: '300,000+',
      status: 'researching',
      priority: 'high',
      matchScore: 88,
      openPositions: 203,
      notes: 'Leading digital transformation company',
      website: 'https://infosys.com',
      founded: 1981,
      revenue: '$16.3B',
      glassdoorRating: 4.0,
      keyPeople: ['Salil Parekh - CEO'],
      recentNews: 'Infosys partners with Microsoft for cloud solutions',
      lastUpdated: '2024-05-30'
    },
    {
      id: 3,
      name: 'Flipkart',
      industry: 'E-commerce',
      location: 'Bangalore, India',
      size: '50,000+',
      status: 'interested',
      priority: 'medium',
      matchScore: 85,
      openPositions: 67,
      notes: 'Innovative e-commerce platform, data-driven culture',
      website: 'https://flipkart.com',
      founded: 2007,
      revenue: '$11.9B',
      glassdoorRating: 4.2,
      keyPeople: ['Kalyan Krishnamurthy - CEO'],
      recentNews: 'Flipkart expands AI-powered recommendation engine',
      lastUpdated: '2024-05-28'
    },
    {
      id: 4,
      name: 'BYJU\'S',
      industry: 'EdTech',
      location: 'Bangalore, India',
      size: '50,000+',
      status: 'applied',
      priority: 'medium',
      matchScore: 78,
      openPositions: 89,
      notes: 'Leading EdTech company, personalized learning focus',
      website: 'https://byjus.com',
      founded: 2011,
      revenue: '$2.8B',
      glassdoorRating: 3.8,
      keyPeople: ['Byju Raveendran - Founder & CEO'],
      recentNews: 'BYJU\'S launches new AI tutoring platform',
      lastUpdated: '2024-05-25'
    }
  ])

  const [newCompany, setNewCompany] = useState({
    name: '',
    industry: '',
    location: '',
    notes: '',
    priority: 'medium',
    status: 'interested'
  })

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = selectedFilter === 'all' || company.status === selectedFilter
    
    return matchesSearch && matchesFilter
  })

  const handleAddCompany = () => {
    if (newCompany.name.trim()) {
      const company = {
        id: companies.length + 1,
        ...newCompany,
        matchScore: Math.floor(Math.random() * 30) + 70,
        openPositions: Math.floor(Math.random() * 100) + 10,
        glassdoorRating: (Math.random() * 2 + 3).toFixed(1),
        lastUpdated: new Date().toISOString().split('T')[0]
      }
      setCompanies([...companies, company])
      setNewCompany({
        name: '',
        industry: '',
        location: '',
        notes: '',
        priority: 'medium',
        status: 'interested'
      })
      setShowAddForm(false)
    }
  }

  const handleDeleteCompany = (id) => {
    setCompanies(companies.filter(company => company.id !== id))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'actively_tracking': return 'bg-blue-100 text-blue-800'
      case 'applied': return 'bg-green-100 text-green-800'
      case 'researching': return 'bg-yellow-100 text-yellow-800'
      case 'interested': return 'bg-purple-100 text-purple-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500'
      case 'medium': return 'border-l-yellow-500'
      case 'low': return 'border-l-green-500'
      default: return 'border-l-gray-500'
    }
  }

  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 75) return 'text-blue-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
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
                <h1 className="text-3xl font-bold text-gray-900">Target Companies</h1>
                <p className="text-gray-600 mt-1">Track and manage your target companies</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Company
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="actively_tracking">Actively Tracking</option>
              <option value="applied">Applied</option>
              <option value="researching">Researching</option>
              <option value="interested">Interested</option>
            </select>
          </div>
        </div>

        {/* Add Company Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Company</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Company name"
                value={newCompany.name}
                onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="text"
                placeholder="Industry"
                value={newCompany.industry}
                onChange={(e) => setNewCompany({...newCompany, industry: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="text"
                placeholder="Location"
                value={newCompany.location}
                onChange={(e) => setNewCompany({...newCompany, location: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
              />
              <select
                value={newCompany.priority}
                onChange={(e) => setNewCompany({...newCompany, priority: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            <textarea
              placeholder="Notes about this company..."
              value={newCompany.notes}
              onChange={(e) => setNewCompany({...newCompany, notes: e.target.value})}
              className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
              rows={3}
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCompany}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Add Company
              </button>
            </div>
          </motion.div>
        )}

        {/* Companies List */}
        <div className="space-y-6">
          {filteredCompanies.map((company) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-lg shadow border-l-4 ${getPriorityColor(company.priority)} p-6`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{company.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center">
                        <Building2 className="w-4 h-4 mr-1" />
                        {company.industry}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {company.location}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {company.size}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className={`px-2 py-1 text-xs rounded ${getStatusColor(company.status)}`}>
                        {company.status.replace('_', ' ')}
                      </span>
                      <span className={`font-semibold ${getMatchScoreColor(company.matchScore)}`}>
                        {company.matchScore}% Match
                      </span>
                      <span className="flex items-center text-yellow-600">
                        <Star className="w-4 h-4 mr-1" />
                        {company.glassdoorRating}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600">
                    <Bell className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteCompany(company.id)}
                    className="p-2 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Company Info</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Founded: {company.founded}</p>
                    <p>Revenue: {company.revenue}</p>
                    <p>Open Positions: {company.openPositions}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Key People</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    {company.keyPeople?.map((person, index) => (
                      <p key={index}>{person}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Recent News</h4>
                  <p className="text-sm text-gray-600">{company.recentNews}</p>
                </div>
              </div>

              {company.notes && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{company.notes}</p>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-sm text-gray-500">Last updated: {company.lastUpdated}</span>
                <div className="flex space-x-3">
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center"
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    View Jobs
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Apply Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery ? 'Try adjusting your search terms' : 'Start by adding your first target company'}
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Add Company
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CompaniesPage