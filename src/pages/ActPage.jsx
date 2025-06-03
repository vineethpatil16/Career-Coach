import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
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
  ArrowLeft
} from 'lucide-react'

const ActPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('target-companies')
  const [showAddCompany, setShowAddCompany] = useState(false)
  const [showMessageGenerator, setShowMessageGenerator] = useState(false)

  const tabs = [
    { id: 'target-companies', label: 'Target Companies', icon: Building2 },
    { id: 'applications', label: 'Job Applications', icon: FileText },
    { id: 'outreach', label: 'Outreach Messages', icon: MessageSquare },
    { id: 'interviews', label: 'Mock Interviews', icon: Calendar }
  ]

  const targetCompanies = [
    {
      id: 1,
      name: 'Google',
      industry: 'Technology',
      size: 'Large (10,000+)',
      priority: 'high',
      status: 'actively_applying',
      openPositions: 12,
      matchScore: 85,
      lastUpdate: '2024-06-01',
      notes: 'Great culture fit, strong AI/ML teams',
      contacts: [
        { name: 'Sarah Chen', role: 'Engineering Manager', status: 'contacted' },
        { name: 'Mike Johnson', role: 'Recruiter', status: 'responded' }
      ],
      recentActivity: [
        { type: 'application', position: 'Software Engineer II', date: '2024-05-28' },
        { type: 'outreach', contact: 'Sarah Chen', date: '2024-05-25' }
      ]
    },
    {
      id: 2,
      name: 'Microsoft',
      industry: 'Technology',
      size: 'Large (10,000+)',
      priority: 'high',
      status: 'researching',
      openPositions: 8,
      matchScore: 78,
      lastUpdate: '2024-05-30',
      notes: 'Azure team looks interesting, good work-life balance',
      contacts: [
        { name: 'Alex Rodriguez', role: 'Senior Engineer', status: 'pending' }
      ],
      recentActivity: [
        { type: 'research', activity: 'Completed company analysis', date: '2024-05-30' }
      ]
    },
    {
      id: 3,
      name: 'Stripe',
      industry: 'Fintech',
      size: 'Medium (1,000-10,000)',
      priority: 'medium',
      status: 'interested',
      openPositions: 5,
      matchScore: 92,
      lastUpdate: '2024-05-28',
      notes: 'Perfect tech stack match, remote-friendly',
      contacts: [],
      recentActivity: []
    }
  ]

  const jobApplications = [
    {
      id: 1,
      company: 'Google',
      position: 'Software Engineer II',
      location: 'Mountain View, CA',
      appliedDate: '2024-05-28',
      status: 'phone_screen',
      salary: '$140,000 - $180,000',
      nextStep: 'Technical Interview',
      nextStepDate: '2024-06-05',
      recruiter: 'Sarah Chen',
      notes: 'Phone screen went well, focus on system design',
      timeline: [
        { stage: 'Applied', date: '2024-05-28', completed: true },
        { stage: 'Phone Screen', date: '2024-06-01', completed: true },
        { stage: 'Technical Interview', date: '2024-06-05', completed: false },
        { stage: 'Final Interview', date: 'TBD', completed: false }
      ]
    },
    {
      id: 2,
      company: 'Microsoft',
      position: 'Senior Software Engineer',
      location: 'Seattle, WA',
      appliedDate: '2024-05-25',
      status: 'technical_interview',
      salary: '$150,000 - $190,000',
      nextStep: 'Final Round',
      nextStepDate: '2024-06-08',
      recruiter: 'Mike Johnson',
      notes: 'Strong technical round, team fit interview next',
      timeline: [
        { stage: 'Applied', date: '2024-05-25', completed: true },
        { stage: 'Phone Screen', date: '2024-05-28', completed: true },
        { stage: 'Technical Interview', date: '2024-06-02', completed: true },
        { stage: 'Final Interview', date: '2024-06-08', completed: false }
      ]
    },
    {
      id: 3,
      company: 'Stripe',
      position: 'Full Stack Engineer',
      location: 'Remote',
      appliedDate: '2024-05-20',
      status: 'rejected',
      salary: '$130,000 - $170,000',
      nextStep: null,
      nextStepDate: null,
      recruiter: 'Alex Kim',
      notes: 'Not selected for next round, feedback: need more backend experience',
      timeline: [
        { stage: 'Applied', date: '2024-05-20', completed: true },
        { stage: 'Phone Screen', date: '2024-05-23', completed: true },
        { stage: 'Rejected', date: '2024-05-26', completed: true }
      ]
    }
  ]

  const messageTemplates = [
    {
      id: 1,
      type: 'recruiter',
      title: 'Initial Recruiter Outreach',
      subject: 'Interested in {position} at {company}',
      content: `Hi {recruiter_name},

I hope this message finds you well. I'm reaching out regarding the {position} role at {company}. With my background in {your_skills}, I believe I'd be a strong fit for this position.

I'm particularly excited about {company}'s work in {specific_area} and would love to discuss how my experience in {relevant_experience} could contribute to your team.

Would you be available for a brief call this week to discuss the opportunity?

Best regards,
{your_name}`,
      variables: ['recruiter_name', 'position', 'company', 'your_skills', 'specific_area', 'relevant_experience', 'your_name']
    },
    {
      id: 2,
      type: 'networking',
      title: 'Networking Connection',
      subject: 'Fellow {mutual_connection} - Would love to connect',
      content: `Hi {contact_name},

I came across your profile through {mutual_connection} and was impressed by your work at {company}. I'm currently exploring opportunities in {industry} and would love to learn more about your experience.

Would you be open to a brief coffee chat or virtual call? I'd be happy to share my background and learn about your journey at {company}.

Looking forward to connecting!

Best,
{your_name}`,
      variables: ['contact_name', 'mutual_connection', 'company', 'industry', 'your_name']
    }
  ]

  const upcomingInterviews = [
    {
      id: 1,
      company: 'Google',
      position: 'Software Engineer II',
      type: 'Technical Interview',
      date: '2024-06-05',
      time: '2:00 PM PST',
      interviewer: 'David Park',
      duration: '60 minutes',
      platform: 'Google Meet',
      preparationNotes: [
        'Review system design fundamentals',
        'Practice coding problems on LeetCode',
        'Research Google\'s engineering culture'
      ],
      status: 'scheduled'
    },
    {
      id: 2,
      company: 'Microsoft',
      position: 'Senior Software Engineer',
      type: 'Final Round',
      date: '2024-06-08',
      time: '10:00 AM PST',
      interviewer: 'Lisa Zhang',
      duration: '90 minutes',
      platform: 'Microsoft Teams',
      preparationNotes: [
        'Prepare behavioral examples using STAR method',
        'Review Azure services and architecture',
        'Prepare questions about team dynamics'
      ],
      status: 'scheduled'
    }
  ]

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
      case 'actively_applying': return 'bg-blue-100 text-blue-800'
      case 'researching': return 'bg-yellow-100 text-yellow-800'
      case 'interested': return 'bg-purple-100 text-purple-800'
      case 'phone_screen': return 'bg-blue-100 text-blue-800'
      case 'technical_interview': return 'bg-orange-100 text-orange-800'
      case 'final_interview': return 'bg-purple-100 text-purple-800'
      case 'offered': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'accepted': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
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

        {/* Target Companies Tab */}
        {activeTab === 'target-companies' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {targetCompanies.map((company) => (
              <div key={company.id} className={`border-l-4 ${getPriorityColor(company.priority)} bg-white rounded-r-lg shadow p-6`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{company.name}</h3>
                      <p className="text-gray-600">{company.industry} • {company.size}</p>
                      <div className="flex items-center mt-2 space-x-3">
                        <span className={`px-2 py-1 text-xs rounded ${getStatusColor(company.status)}`}>
                          {company.status.replace('_', ' ')}
                        </span>
                        <span className="text-sm text-gray-600">Match: {company.matchScore}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Open Positions</h4>
                    <p className="text-2xl font-bold text-primary-600">{company.openPositions}</p>
                    <button className="text-sm text-primary-600 hover:text-primary-700 flex items-center mt-1">
                      View Jobs <ExternalLink className="w-3 h-3 ml-1" />
                    </button>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Contacts</h4>
                    <div className="space-y-1">
                      {company.contacts.map((contact, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{contact.name}</span>
                          <span className={`px-2 py-0.5 text-xs rounded ${
                            contact.status === 'responded' ? 'bg-green-100 text-green-800' :
                            contact.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {contact.status}
                          </span>
                        </div>
                      ))}
                      {company.contacts.length === 0 && (
                        <p className="text-sm text-gray-500">No contacts yet</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Recent Activity</h4>
                    <div className="space-y-1">
                      {company.recentActivity.slice(0, 2).map((activity, index) => (
                        <div key={index} className="text-sm text-gray-600">
                          <span className="capitalize">{activity.type}</span> • {activity.date}
                        </div>
                      ))}
                      {company.recentActivity.length === 0 && (
                        <p className="text-sm text-gray-500">No recent activity</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                  <p className="text-sm text-gray-700">{company.notes}</p>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      Apply Now
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">Last updated: {company.lastUpdate}</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Job Applications Tab */}
        {activeTab === 'applications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {jobApplications.map((application) => (
              <div key={application.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{application.position}</h3>
                    <p className="text-gray-600">{application.company} • {application.location}</p>
                    <div className="flex items-center mt-2 space-x-3">
                      <span className={`px-2 py-1 text-xs rounded ${getStatusColor(application.status)}`}>
                        {application.status.replace('_', ' ')}
                      </span>
                      <span className="text-sm text-gray-600">Applied: {application.appliedDate}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">{application.salary}</p>
                    {application.nextStep && (
                      <p className="text-sm text-gray-600">
                        Next: {application.nextStep} on {application.nextStepDate}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Application Timeline */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-3">Application Timeline</h4>
                  <div className="flex items-center space-x-4 overflow-x-auto">
                    {application.timeline.map((stage, index) => (
                      <div key={index} className="flex items-center space-x-2 min-w-max">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          stage.completed ? 'bg-green-600' : 'bg-gray-300'
                        }`}>
                          {stage.completed && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-900">{stage.stage}</p>
                          <p className="text-xs text-gray-600">{stage.date}</p>
                        </div>
                        {index < application.timeline.length - 1 && (
                          <div className="w-8 h-0.5 bg-gray-300" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Recruiter Contact</h4>
                    <p className="text-sm text-gray-700">{application.recruiter}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                    <p className="text-sm text-gray-700">{application.notes}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                      Update Status
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      Add Notes
                    </button>
                  </div>
                  {application.nextStep && (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Prepare for {application.nextStep}
                    </button>
                  )}
                </div>
              </div>
            ))}
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
                  Generate Message
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {messageTemplates.map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{template.title}</h3>
                        <span className="text-sm text-gray-600 capitalize">{template.type}</span>
                      </div>
                      <button className="text-primary-600 hover:text-primary-700">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-1">Subject:</p>
                      <p className="text-sm text-gray-600 italic">{template.subject}</p>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                      <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 max-h-32 overflow-y-auto">
                        {template.content.substring(0, 200)}...
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Variables:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.variables.map((variable, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {variable}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700">
                      Use Template
                    </button>
                  </div>
                ))}
              </div>
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
            {/* Upcoming Interviews */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Interviews</h2>
              
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900">{interview.type}</h3>
                        <p className="text-gray-600">{interview.company} • {interview.position}</p>
                        <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {interview.date} at {interview.time}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {interview.duration}
                          </span>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {interview.status}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Interviewer</h4>
                      <p className="text-sm text-gray-700">{interview.interviewer}</p>
                      <p className="text-sm text-gray-600">Platform: {interview.platform}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Preparation Notes</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {interview.preparationNotes.map((note, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-primary-600 mr-2">•</span>
                            {note}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                        Start Mock Interview
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                        Add to Calendar
                      </button>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Preparation Guide
                      </button>
                    </div>
                  </div>
                ))}
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