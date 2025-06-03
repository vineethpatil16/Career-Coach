// src/pages/UserProfile.jsx
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { User, BookOpen, Briefcase, Code, Globe, LogOut, Save, ArrowLeft, AlertCircle } from 'lucide-react'
import { userProfileService } from '../services/supabaseServices'

const UserProfile = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('personal')
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const [formData, setFormData] = useState({
    // Personal Info
    first_name: '',
    last_name: '',
    phone: '',
    location: '',
    
    // Education
    highest_degree: '',
    institution: '',
    field_of_study: '',
    education_start_year: '',
    education_end_year: '',
    
    // Experience
    current_job_title: '',
    current_company: '',
    years_of_experience: '',
    job_description: '',
    
    // Skills
    technical_skills: [],
    soft_skills: [],
    key_projects: '',
    
    // Social & Portfolio
    linkedin_url: '',
    github_url: '',
    portfolio_url: '',
    twitter_url: '',
    other_links: '',
  })

  // Load existing profile data
  useEffect(() => {
    const loadProfileData = async () => {
      if (!user) return
      
      try {
        setIsLoading(true)
        setError('')
        
        const { data: profile, error: profileError } = await userProfileService.get(user.id)
        
        if (profileError && profileError.code !== 'PGRST116') {
          throw profileError
        }
        
        if (profile) {
          setFormData({
            first_name: profile.first_name || user.user_metadata?.first_name || '',
            last_name: profile.last_name || user.user_metadata?.last_name || '',
            phone: profile.phone || '',
            location: profile.location || '',
            highest_degree: profile.highest_degree || '',
            institution: profile.institution || '',
            field_of_study: profile.field_of_study || '',
            education_start_year: profile.education_start_year || '',
            education_end_year: profile.education_end_year || '',
            current_job_title: profile.current_job_title || '',
            current_company: profile.current_company || '',
            years_of_experience: profile.years_of_experience || '',
            job_description: profile.job_description || '',
            technical_skills: profile.technical_skills || [],
            soft_skills: profile.soft_skills || [],
            key_projects: profile.key_projects || '',
            linkedin_url: profile.linkedin_url || '',
            github_url: profile.github_url || '',
            portfolio_url: profile.portfolio_url || '',
            twitter_url: profile.twitter_url || '',
            other_links: profile.other_links || '',
          })
        } else {
          // Set defaults from auth user metadata if no profile exists
          setFormData(prev => ({
            ...prev,
            first_name: user.user_metadata?.first_name || '',
            last_name: user.user_metadata?.last_name || '',
          }))
        }
      } catch (err) {
        console.error('Error loading profile:', err)
        setError('Failed to load profile data')
      } finally {
        setIsLoading(false)
      }
    }

    loadProfileData()
  }, [user])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSkillsChange = (field, value) => {
    // Convert comma-separated string to array
    const skillsArray = value.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0)
    setFormData(prev => ({
      ...prev,
      [field]: skillsArray
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    setError('')
    setSuccess('')
    
    try {
      const profileData = {
        user_id: user.id,
        ...formData,
        updated_at: new Date().toISOString()
      }
      
      const { data, error: saveError } = await userProfileService.update(user.id, profileData)
      
      if (saveError) {
        throw saveError
      }
      
      setSuccess('Profile saved successfully!')
      
      // Navigate back to dashboard after successful save
      setTimeout(() => {
        navigate('/dashboard', { 
          state: { 
            message: 'Profile updated successfully!',
            profileComplete: true 
          }
        })
      }, 1500)
    } catch (error) {
      console.error('Error saving profile:', error)
      setError('Failed to save profile. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'education', label: 'Education', icon: BookOpen },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills & Projects', icon: Code },
    { id: 'social', label: 'Social & Portfolio', icon: Globe },
  ]

  if (isLoading) {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center text-gray-600 hover:text-gray-800 mr-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
            </div>
            <button
              onClick={signOut}
              className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
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
              <div className="w-5 h-5 text-green-600 mr-2">✓</div>
              <p className="text-green-800">{success}</p>
            </div>
          </motion.div>
        )}

        <div className="bg-white rounded-lg shadow">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
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
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <form onSubmit={onSubmit} className="p-6">
            {activeTab === 'personal' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.first_name}
                      onChange={(e) => handleInputChange('first_name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.last_name}
                      onChange={(e) => handleInputChange('last_name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="City, Country"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'education' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-medium text-gray-900">Education</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Highest Degree
                    </label>
                    <select
                      value={formData.highest_degree}
                      onChange={(e) => handleInputChange('highest_degree', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select degree</option>
                      <option value="high_school">High School</option>
                      <option value="bachelors">Bachelor's Degree</option>
                      <option value="masters">Master's Degree</option>
                      <option value="phd">PhD</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institution
                    </label>
                    <input
                      type="text"
                      value={formData.institution}
                      onChange={(e) => handleInputChange('institution', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter your institution name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Field of Study
                    </label>
                    <input
                      type="text"
                      value={formData.field_of_study}
                      onChange={(e) => handleInputChange('field_of_study', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., Computer Science, Business, etc."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Year
                      </label>
                      <input
                        type="number"
                        value={formData.education_start_year}
                        onChange={(e) => handleInputChange('education_start_year', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="2020"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Year
                      </label>
                      <input
                        type="number"
                        value={formData.education_end_year}
                        onChange={(e) => handleInputChange('education_end_year', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="2024"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'experience' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current/Recent Job Title
                    </label>
                    <input
                      type="text"
                      value={formData.current_job_title}
                      onChange={(e) => handleInputChange('current_job_title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., Software Engineer, Marketing Manager"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.current_company}
                      onChange={(e) => handleInputChange('current_company', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Experience
                    </label>
                    <select
                      value={formData.years_of_experience}
                      onChange={(e) => handleInputChange('years_of_experience', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select experience level</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Description
                    </label>
                    <textarea
                      value={formData.job_description}
                      onChange={(e) => handleInputChange('job_description', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Describe your key responsibilities and achievements..."
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'skills' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-medium text-gray-900">Skills & Projects</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Technical Skills
                    </label>
                    <textarea
                      value={Array.isArray(formData.technical_skills) ? formData.technical_skills.join(', ') : formData.technical_skills}
                      onChange={(e) => handleSkillsChange('technical_skills', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., Python, React, Data Analysis, Project Management... (separate with commas)"
                    />
                    <p className="text-sm text-gray-500 mt-1">Separate skills with commas</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Soft Skills
                    </label>
                    <textarea
                      value={Array.isArray(formData.soft_skills) ? formData.soft_skills.join(', ') : formData.soft_skills}
                      onChange={(e) => handleSkillsChange('soft_skills', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., Communication, Leadership, Problem-solving... (separate with commas)"
                    />
                    <p className="text-sm text-gray-500 mt-1">Separate skills with commas</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Key Projects
                    </label>
                    <textarea
                      value={formData.key_projects}
                      onChange={(e) => handleInputChange('key_projects', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Describe your most important projects and achievements..."
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'social' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-medium text-gray-900">Social & Portfolio Links</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      value={formData.linkedin_url}
                      onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GitHub Profile
                    </label>
                    <input
                      type="url"
                      value={formData.github_url}
                      onChange={(e) => handleInputChange('github_url', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Portfolio Website
                    </label>
                    <input
                      type="url"
                      value={formData.portfolio_url}
                      onChange={(e) => handleInputChange('portfolio_url', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Twitter/X Profile
                    </label>
                    <input
                      type="url"
                      value={formData.twitter_url}
                      onChange={(e) => handleInputChange('twitter_url', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="https://twitter.com/yourusername"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Other Links
                    </label>
                    <textarea
                      value={formData.other_links}
                      onChange={(e) => handleInputChange('other_links', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Any other relevant links (Behance, Dribbble, personal blog, etc.)"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Save Button */}
            <div className="flex justify-end pt-6 border-t">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Profile
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserProfile