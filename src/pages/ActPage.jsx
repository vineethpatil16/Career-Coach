// src/pages/ActPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { 
  Building2, 
  Send, 
  Calendar, 
  Bell, 
  Target,
  MessageSquare,
  FileText,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Filter,
  ArrowLeft,
  Eye
} from 'lucide-react'
import {
  companyService,
  jobApplicationService,
  messageTemplateService
} from '../services/supabaseServices'

const ActPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('target-companies')
  const [showAddCompany, setShowAddCompany] = useState(false)
  const [showMessageGenerator, setShowMessageGenerator] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // State for different sections
  const [companies, setCompanies] = useState([])
  const [jobApplications, setJobApplications] = useState([])
  const [messageTemplates, setMessageTemplates] = useState([])
  const [newCompany, setNewCompany] = useState({
    company_name: '',
    industry: '',
    location: '',
    company_size: '',
    priority_level: 'medium',
    status: 'interested',
    notes: '',
    website_url: ''
  })

  const tabs = [
    { id: 'target-companies', label: 'Target Companies', icon: Building2 },
    { id: 'applications', label: 'Job Applications', icon: FileText },
    { id: 'outreach', label: 'Outreach Messages', icon: MessageSquare },
    { id: 'interviews', label: 'Mock Interviews', icon: Calendar }
  ]

  // Load data on component mount
  useEffect(() => {
    if (user) {
      loadData()
    }
  }, [user])

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')

      // Load all data concurrently
      const [companiesResult, applicationsResult, templatesResult] = await Promise.all([
        companyService.getAll(user.id),
        jobApplicationService.getAll(user.id),
        messageTemplateService.getAll(user.id)
      ])

      if (companiesResult.error) {
        console.error('Error loading companies:', companiesResult.error)
      } else {
        setCompanies(companiesResult.data || [])
      }

      if (applicationsResult.error) {
        console.error('Error loading applications:', applicationsResult.error)
      } else {
        setJobApplications(applicationsResult.data || [])
      }

      if (templatesResult.error) {
        console.error('Error loading templates:', templatesResult.error)
      } else {
        setMessageTemplates(templatesResult.data || [])
      }

    } catch (err) {
      console.error('Error loading data:', err)
      setError('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleAddCompany = async () => {
    if (!newCompany.company_name.trim()) {
      setError('Company name is required')
      return
    }

    try {
      setError('')
      const companyData = {
        user_id: user.id,
        ...newCompany,
        created_at: new Date().toISOString()
      }

      const { data, error: createError } = await companyService.create(companyData)
      
      if (createError) {
        throw createError
      }

      setCompanies(prev => [data, ...prev])
      setNewCompany({
        company_name: '',
        industry: '',
        location: '',
        company_size: '',
        priority_level: 'medium',
        status: 'interested',
        notes: '',
        website_url: ''
      })
      setShowAddCompany(false)
      setSuccess('Company added successfully!')
      
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      console.error('Error adding company:', error)
      setError('Failed to add company')
    }
  }

  const handleDeleteCompany = async (companyId) => {
    if (!confirm('Are you sure you want to delete this company?')) return

    try {
      const { error: deleteError } = await companyService.delete(companyId)
      
      if (deleteError) {
        throw deleteError
      }

      setCompanies(prev => prev.filter(company => company.id !== companyId))
      setSuccess('Company deleted successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      console.error('Error deleting company:', error)
      setError('Failed to delete company')
    }
  }

  const handleUpdateCompanyStatus = async (companyId, newStatus) => {
    try {
      const { data, error: updateError } = await companyService.update(companyId, {
        status: newStatus
      })
      
      if (updateError) {
        throw updateError
      }

      setCompanies(prev => prev.map(company => 
        company.id === companyId ? { ...company, status: newStatus } : company
      ))
    } catch (error) {
      console.error('Error updating company status:', error)
      setError('Failed to update company status')
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50'
      case 'medium': return 'border-l-yellow-500 bg-yellow-50'
      case 'low': return 'border-l-green-500 bg-green-50'
      default: return 'border-l-gray-500 bg-gray-50'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'actively_tracking': return 'bg-blue-100 text-blue-800'
      case 'applied': return 'bg-green-100 text-green-800'
      case 'researching': return 'bg-yellow-100 text-yellow-800'
      case 'interested': return 'bg-purple-100 text-purple-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'phone_screen': return 'bg-blue-100 text-blue-800'
      case 'technical_interview': return 'bg-orange-100 text-orange-800'
      case 'final_interview': return 'bg-purple-100 text-purple-800'
      case 'offered': return 'bg-green-100 text-green-800'
      case 'accepted': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
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
                <h1 className="text-3xl font-bold text-gray-900">Act</h1>
                <p className="text-gray-600 mt-1">Take action on your career goals</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <button 
                onClick={() => setShowAddCompany(true)}
                className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Company
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Alert Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4"
          >
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <p className="text-red-800">{error}</p>
            </div>
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4"
          >
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <p className="text-green-800">{success}</p>
            </div>
          </motion.div>
        )}

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
                  <Icon className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Add Company Form */}
        {showAddCompany && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Target Company</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Company name *"
                value={newCompany.company_name}
                onChange={(e) => setNewCompany({...newCompany, company_name: e.target.value})}
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
                value={newCompany.priority_level}
                onChange={(e) => setNewCompany({...newCompany, priority_level: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <input
                type="text"
                placeholder="Company size"
                value={newCompany.company_size}
                onChange={(e) => setNewCompany({...newCompany, company_size: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="url"
                placeholder="Website URL"
                value={newCompany.website_url}
                onChange={(e) => setNewCompany({...newCompany, website_url: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
              />
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
                onClick={() => setShowAddCompany(false)}
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

        {/* Target Companies Tab */}
        {activeTab === 'target-companies' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {companies.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No companies added yet</h3>
                <p className="text-gray-600 mb-4">Start by adding your first target company</p>
                <button
                  onClick={() => setShowAddCompany(true)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Add Company
                </button>
              </div>
            ) : (
              companies.map((company) => (
                <div key={company.id} className={`border-l-4 ${getPriorityColor(company.priority_level)} bg-white rounded-r-lg shadow p-6`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{company.company_name}</h3>
                        <p className="text-gray-600">{company.industry} • {company.location}</p>
                        {company.company_size && (
                          <p className="text-gray-600">{company.company_size} employees</p>
                        )}
                        <div className="flex items-center space-x-3 mt-2">
                          <select
                            value={company.status}
                            onChange={(e) => handleUpdateCompanyStatus(company.id, e.target.value)}
                            className={`px-2 py-1 text-xs rounded border-0 ${getStatusColor(company.status)}`}
                          >
                            <option value="interested">Interested</option>
                            <option value="researching">Researching</option>
                            <option value="actively_tracking">Actively Tracking</option>
                            <option value="applied">Applied</option>
                            <option value="rejected">Rejected</option>
                          </select>
                          <span className="text-sm text-gray-600 capitalize">
                            {company.priority_level} Priority
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
                  
                  {company.notes && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{company.notes}</p>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-sm text-gray-500">
                      Added: {new Date(company.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-3">
                      {company.website_url && (
                        <a
                          href={company.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center"
                        >
                          Visit Website
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      )}
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        View Jobs
                      </button>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}

        {/* Job Applications Tab */}
        {activeTab === 'applications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {jobApplications.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No job applications yet</h3>
                <p className="text-gray-600 mb-4">Track your job applications here</p>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  Add Application
                </button>
              </div>
            ) : (
              jobApplications.map((application) => (
                <div key={application.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{application.position_title}</h3>
                      <p className="text-gray-600">
                        {application.target_companies?.company_name} • {application.target_companies?.location}
                      </p>
                      <div className="flex items-center mt-2 space-x-3">
                        <span className={`px-2 py-1 text-xs rounded ${getStatusColor(application.status)}`}>
                          {application.status.replace('_', ' ')}
                        </span>
                        <span className="text-sm text-gray-600">
                          Applied: {new Date(application.applied_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      {application.salary_range && (
                        <p className="font-semibold text-green-600">{application.salary_range}</p>
                      )}
                    </div>
                  </div>
                  
                  {application.notes && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                      <p className="text-sm text-gray-700">{application.notes}</p>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                        Update Status
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                        Add Notes
                      </button>
                    </div>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Interview
                    </button>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}

        {/* Outreach Messages Tab */}
        {activeTab === 'outreach' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Message Templates</h2>
                <button 
                  onClick={() => setShowMessageGenerator(true)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Template
                </button>
              </div>
              
              {messageTemplates.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No message templates yet</h3>
                  <p className="text-gray-600 mb-4">Create templates for reaching out to recruiters and contacts</p>
                  <button 
                    onClick={() => setShowMessageGenerator(true)}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    Create First Template
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {messageTemplates.map((template) => (
                    <div key={template.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{template.template_name}</h3>
                          <span className="text-sm text-gray-600 capitalize">{template.template_type}</span>
                        </div>
                        <button className="text-primary-600 hover:text-primary-700">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-1">Subject:</p>
                        <p className="text-sm text-gray-600 italic">{template.subject_line}</p>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                        <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 max-h-32 overflow-y-auto">
                          {template.message_content.substring(0, 200)}...
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm text-gray-600">
                          Used {template.usage_count || 0} times
                        </p>
                      </div>
                      
                      <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700">
                        Use Template
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Mock Interviews Tab */}
        {activeTab === 'interviews' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Upcoming Interviews Placeholder */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Interviews</h2>
              
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming interviews</h3>
                <p className="text-gray-600 mb-4">Schedule mock interviews to practice</p>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  Schedule Mock Interview
                </button>
              </div>
            </div>

            {/* Mock Interview Options */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Practice Interviews</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">Behavioral Interview</h3>
                  <p className="text-sm text-gray-600 mb-4">Practice common behavioral questions using the STAR method</p>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Start Practice
                  </button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">Technical Interview</h3>
                  <p className="text-sm text-gray-600 mb-4">Coding challenges and system design questions</p>
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                    Start Practice
                  </button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">Case Study</h3>
                  <p className="text-sm text-gray-600 mb-4">Business cases and problem-solving scenarios</p>
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                    Start Practice
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ActPage