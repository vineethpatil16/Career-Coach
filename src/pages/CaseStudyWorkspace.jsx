import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  Clock,
  CheckCircle,
  FileText,
  Lightbulb,
  Target,
  TrendingUp,
  Save,
  Download,
  Share2,
  Eye,
  Edit3,
  Plus,
  Trash2,
  Star,
  Award,
  Brain,
  Users,
  Building2,
  Search,
  Filter,
  Calendar,
  BarChart3,
  AlertCircle,
  PlayCircle,
  PauseCircle,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CaseStudyWorkspace = () => {
  const navigate = useNavigate();
  const { studyId } = useParams();
  const { user } = useAuth();
  
  const [currentStudy, setCurrentStudy] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [studyProgress, setStudyProgress] = useState({});
  const [notes, setNotes] = useState('');
  const [insights, setInsights] = useState([]);
  const [isStudyStarted, setIsStudyStarted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAllStudies, setShowAllStudies] = useState(!studyId);

  // Sample case studies data
  const caseStudies = [
    {
      id: 'google-product-strategy',
      title: 'Google Product Strategy Analysis',
      category: 'Company Research',
      difficulty: 'Advanced',
      estimatedTime: '4-6 hours',
      description: 'Deep dive into Google\'s product strategy, market positioning, and competitive analysis.',
      learningObjectives: [
        'Understand Google\'s product ecosystem strategy',
        'Analyze competitive positioning in key markets',
        'Evaluate strategic decision-making frameworks',
        'Assess market expansion strategies'
      ],
      sections: [
        {
          id: 'introduction',
          title: 'Company Overview',
          type: 'reading',
          content: `Google, founded in 1998 by Larry Page and Sergey Brin, has evolved from a search engine startup to one of the world's most valuable companies. Today, Alphabet Inc. (Google's parent company) operates across multiple business segments including Search, YouTube, Cloud, and Other Bets.

**Key Facts:**
- Revenue: $307.4 billion (2023)
- Employees: 182,000+ worldwide
- Market Cap: ~$1.7 trillion
- Primary Markets: Search, Advertising, Cloud Computing, Consumer Hardware

**Mission Statement:** "To organize the world's information and make it universally accessible and useful."

The company's success stems from its ability to leverage data and machine learning across its product portfolio while maintaining a culture of innovation and experimentation.`,
          estimatedTime: 20,
          questions: [
            'What are Google\'s core competitive advantages?',
            'How has Google\'s mission evolved since its founding?',
            'What are the key revenue streams for Alphabet?'
          ]
        },
        {
          id: 'market-analysis',
          title: 'Market Position & Competition',
          type: 'analysis',
          content: `**Search Market Dominance:**
Google maintains approximately 92% global market share in search, with key competitors including:
- Microsoft Bing (~3%)
- Yahoo (~1.2%)
- Baidu (dominant in China)
- DuckDuckGo (privacy-focused, growing)

**Cloud Computing Battle:**
- AWS: 32% market share
- Microsoft Azure: 23%
- Google Cloud: 10%
- Others: 35%

**Strategic Challenges:**
1. Regulatory scrutiny and antitrust concerns
2. Privacy regulations (GDPR, CCPA)
3. Competition in AI and machine learning
4. Diversification beyond advertising revenue`,
          estimatedTime: 30,
          questions: [
            'Why has Google struggled to gain significant cloud market share?',
            'How do regulatory challenges impact Google\'s strategy?',
            'What competitive threats are emerging in search?'
          ]
        },
        {
          id: 'product-ecosystem',
          title: 'Product Ecosystem Strategy',
          type: 'framework',
          content: `Google's product ecosystem is designed around user data collection and engagement maximization:

**Core Products Hub:**
- Search (entry point)
- Gmail (communication)
- Maps (location services)
- YouTube (entertainment/education)
- Chrome (web browsing)

**Integration Strategy:**
1. **Data Flywheel:** Each product generates data that improves others
2. **Cross-promotion:** Users of one service are encouraged to try others
3. **Unified Experience:** Single sign-on and shared preferences
4. **Advertising Integration:** All products support advertising revenue

**Expansion Methodology:**
- Acquire talent and technology
- Internal product development
- Beta testing with limited rollouts
- Gradual feature integration`,
          estimatedTime: 25,
          questions: [
            'How does Google\'s data flywheel create competitive moats?',
            'What role does acquisition play in product strategy?',
            'How does Google balance innovation with revenue optimization?'
          ]
        },
        {
          id: 'strategic-decisions',
          title: 'Key Strategic Decisions',
          type: 'case-analysis',
          content: `**Case Study: Google's Entry into Cloud Computing**

**Background:**
- AWS launched in 2006, Microsoft Azure in 2010
- Google Cloud Platform launched in 2011
- Despite technical capabilities, Google was late to enterprise market

**Strategic Decision Points:**
1. **2015:** Hired Diane Greene (VMware founder) as Cloud CEO
2. **2016:** Committed $30+ billion investment over 3 years
3. **2018:** Hired Thomas Kurian from Oracle
4. **2019-2023:** Aggressive enterprise sales team expansion

**Outcomes:**
- Cloud revenue grew from $4B (2018) to $33B (2023)
- Still #3 player but gaining enterprise credibility
- Significant investment in AI/ML differentiation

**Analysis Framework:**
- Market timing vs. competitive advantage
- Build vs. buy vs. partner decisions
- Resource allocation and organizational changes`,
          estimatedTime: 40,
          questions: [
            'What factors contributed to Google\'s late entry into cloud?',
            'How did leadership changes impact cloud strategy?',
            'What lessons can be applied to other strategic decisions?'
          ]
        },
        {
          id: 'future-strategy',
          title: 'Future Strategy & Recommendations',
          type: 'synthesis',
          content: `**Emerging Strategic Priorities:**

**1. AI Integration Across Products**
- Bard/Gemini development
- AI-powered search enhancements
- Productivity tool improvements

**2. Regulatory Navigation**
- Compliance with global privacy laws
- Antitrust defense strategies
- Transparency initiatives

**3. Revenue Diversification**
- Cloud growth acceleration
- Subscription services expansion
- Hardware ecosystem development

**Strategic Recommendations:**
1. **Accelerate Enterprise Cloud Adoption**
   - Industry-specific solutions
   - Hybrid cloud capabilities
   - Enhanced security offerings

2. **Strengthen Privacy Positioning**
   - User control improvements
   - Transparent data practices
   - Privacy-preserving technologies

3. **Expand AI Moats**
   - Research investment
   - Talent acquisition
   - Open-source contributions`,
          estimatedTime: 35,
          questions: [
            'Which strategic priority should Google focus on first?',
            'How can Google maintain growth while addressing regulatory concerns?',
            'What new markets or products should Google consider?'
          ]
        }
      ],
      insights: [],
      progress: 0,
      timeSpent: 0,
      status: 'not_started',
      lastAccessed: null
    },
    {
      id: 'ai-ethics-healthcare',
      title: 'AI Ethics in Healthcare Implementation',
      category: 'AI Research',
      difficulty: 'Expert',
      estimatedTime: '6-8 hours',
      description: 'Explore ethical frameworks for AI implementation in healthcare systems.',
      learningObjectives: [
        'Understand key ethical challenges in healthcare AI',
        'Analyze regulatory frameworks and compliance requirements',
        'Evaluate bias detection and mitigation strategies',
        'Design ethical AI implementation frameworks'
      ],
      sections: [
        {
          id: 'ethics-foundation',
          title: 'Ethical Foundations',
          type: 'reading',
          content: `Healthcare AI ethics builds upon fundamental bioethical principles while addressing unique technological challenges.

**Core Bioethical Principles:**
1. **Autonomy:** Patient right to make informed decisions
2. **Beneficence:** Acting in patient's best interest
3. **Non-maleficence:** "Do no harm"
4. **Justice:** Fair distribution of benefits and risks

**AI-Specific Ethical Considerations:**
- Algorithmic transparency and explainability
- Data privacy and consent
- Bias and fairness in medical decisions
- Human oversight and accountability
- Long-term societal impacts`,
          estimatedTime: 30,
          questions: [
            'How do traditional bioethical principles apply to AI systems?',
            'What new ethical challenges does AI introduce to healthcare?',
            'How should patient autonomy be preserved in AI-assisted care?'
          ]
        }
      ],
      insights: [],
      progress: 0,
      timeSpent: 0,
      status: 'not_started',
      lastAccessed: null
    },
    {
      id: 'startup-scaling',
      title: 'Startup Scaling: From Idea to IPO',
      category: 'Entrepreneurship',
      difficulty: 'Advanced',
      estimatedTime: '5-7 hours',
      description: 'Follow a startup\'s journey from founding to public offering.',
      learningObjectives: [
        'Understand startup funding stages and requirements',
        'Analyze scaling challenges and solutions',
        'Evaluate go-to-market strategies',
        'Assess organizational development patterns'
      ],
      sections: [
        {
          id: 'founding-stage',
          title: 'Founding & Product-Market Fit',
          type: 'case-analysis',
          content: `**Case: Airbnb's Early Journey (2007-2012)**

**Founding Story:**
- Founded by Brian Chesky, Joe Gebbia, and Nathan Blecharczyk
- Initial idea: Air mattresses for conference attendees
- Struggled to gain traction and funding initially
- Pivot to broader home-sharing platform

**Product-Market Fit Indicators:**
- User retention and repeat bookings
- Host satisfaction and re-listing rates
- Organic growth and word-of-mouth
- Revenue growth and unit economics

**Key Lessons:**
- Persistence through early challenges
- Direct customer engagement and feedback
- Willingness to do things that don't scale
- Focus on user experience over features`,
          estimatedTime: 45,
          questions: [
            'What were the key indicators of product-market fit for Airbnb?',
            'How did the founders handle early rejection and setbacks?',
            'What role did design thinking play in their success?'
          ]
        }
      ],
      insights: [],
      progress: 25,
      timeSpent: 90,
      status: 'in_progress',
      lastAccessed: '2024-06-01'
    }
  ];

  // Timer effect
  useEffect(() => {
    let timer;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning]);

  // Load study if studyId is provided
  useEffect(() => {
    if (studyId) {
      const study = caseStudies.find(s => s.id === studyId);
      if (study) {
        setCurrentStudy(study);
        setStudyProgress(study.progress || {});
        setTimeSpent(study.timeSpent || 0);
        setIsStudyStarted(study.status !== 'not_started');
        setShowAllStudies(false);
      }
    }
  }, [studyId]);

  const startStudy = (study) => {
    setCurrentStudy(study);
    setCurrentSection(0);
    setIsStudyStarted(true);
    setIsTimerRunning(true);
    setShowAllStudies(false);
    
    // Update study status
    const updatedStudy = { ...study, status: 'in_progress', lastAccessed: new Date().toISOString() };
    setCurrentStudy(updatedStudy);
  };

  const saveProgress = async () => {
    setLoading(true);
    try {
      const progressData = {
        studyId: currentStudy.id,
        currentSection,
        notes,
        insights,
        timeSpent,
        progress: Math.round(((currentSection + 1) / currentStudy.sections.length) * 100),
        lastAccessed: new Date().toISOString()
      };
      
      console.log('Saving progress:', progressData);
      // TODO: Save to Supabase
      // await caseStudyService.updateProgress(user.id, progressData);
      
    } catch (error) {
      console.error('Error saving progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const addInsight = (insight) => {
    const newInsight = {
      id: Date.now(),
      text: insight,
      section: currentStudy.sections[currentSection].title,
      timestamp: new Date().toISOString()
    };
    setInsights([...insights, newInsight]);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-orange-100 text-orange-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Company Research': return 'text-blue-600 bg-blue-100';
      case 'AI Research': return 'text-purple-600 bg-purple-100';
      case 'Entrepreneurship': return 'text-green-600 bg-green-100';
      case 'Role Research': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSectionIcon = (type) => {
    switch (type) {
      case 'reading': return BookOpen;
      case 'analysis': return BarChart3;
      case 'framework': return Target;
      case 'case-analysis': return Brain;
      case 'synthesis': return Lightbulb;
      default: return FileText;
    }
  };

  // Case Studies List View
  if (showAllStudies) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <button
                  onClick={() => navigate('/explore')}
                  className="flex items-center text-gray-600 hover:text-gray-800 mr-4 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Explore
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Case Study Workspace</h1>
                  <p className="text-gray-600 mt-1">Deep dive into real-world scenarios and build analytical skills</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search case studies..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {caseStudies.filter(s => s.status === 'completed').length}
                  </div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-orange-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {caseStudies.filter(s => s.status === 'in_progress').length}
                  </div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {caseStudies.reduce((acc, s) => acc + (s.timeSpent || 0), 0)}
                  </div>
                  <div className="text-sm text-gray-600">Minutes Studied</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Award className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.round(caseStudies.reduce((acc, s) => acc + (s.progress || 0), 0) / caseStudies.length)}%
                  </div>
                  <div className="text-sm text-gray-600">Avg Progress</div>
                </div>
              </div>
            </div>
          </div>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {caseStudies.map((study) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 text-xs rounded ${getCategoryColor(study.category)}`}>
                          {study.category}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded ${getDifficultyColor(study.difficulty)}`}>
                          {study.difficulty}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{study.title}</h3>
                      <p className="text-gray-600 mb-3">{study.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {study.estimatedTime}
                    </span>
                    <span className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      {study.sections.length} sections
                    </span>
                    {study.timeSpent > 0 && (
                      <span className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {Math.round(study.timeSpent / 60)}m spent
                      </span>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm text-gray-600">{study.progress || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${study.progress || 0}%` }}
                      />
                    </div>
                  </div>

                  {/* Learning Objectives */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Learning Objectives</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {study.learningObjectives.slice(0, 2).map((objective, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          {objective}
                        </li>
                      ))}
                      {study.learningObjectives.length > 2 && (
                        <li className="text-gray-500 italic">
                          +{study.learningObjectives.length - 2} more objectives
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center">
                    {study.lastAccessed && (
                      <span className="text-xs text-gray-500">
                        Last accessed: {new Date(study.lastAccessed).toLocaleDateString()}
                      </span>
                    )}
                    <div className="flex space-x-2 ml-auto">
                      <button
                        onClick={() => navigate(`/case-study/${study.id}`)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          study.status === 'not_started'
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : study.status === 'in_progress'
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {study.status === 'not_started' ? 'Start Study' : 
                         study.status === 'in_progress' ? 'Continue' : 'Review'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Study Workspace View
  if (currentStudy && isStudyStarted) {
    const currentSectionData = currentStudy.sections[currentSection];
    const SectionIcon = getSectionIcon(currentSectionData?.type);
    const progress = ((currentSection + 1) / currentStudy.sections.length) * 100;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <button
                  onClick={() => setShowAllStudies(true)}
                  className="flex items-center text-gray-600 hover:text-gray-800 mr-4 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Cases
                </button>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{currentStudy.title}</h1>
                  <p className="text-sm text-gray-600">{currentSectionData?.title}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="font-mono">{formatTime(timeSpent)}</span>
                </div>
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="flex items-center text-gray-600 hover:text-gray-800"
                >
                  {isTimerRunning ? <PauseCircle className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
                </button>
                <button
                  onClick={saveProgress}
                  disabled={loading}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Progress'}
                </button>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">
                  Section {currentSection + 1} of {currentStudy.sections.length}
                </span>
                <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-blue-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow p-8"
              >
                {/* Section Header */}
                <div className="flex items-center mb-6">
                  <SectionIcon className="w-6 h-6 text-blue-600 mr-3" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{currentSectionData.title}</h2>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-600 capitalize">{currentSectionData.type}</span>
                      <span className="text-sm text-gray-600">
                        ~{currentSectionData.estimatedTime} minutes
                      </span>
                    </div>
                  </div>
                </div>

                {/* Section Content */}
                <div className="prose max-w-none mb-8">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {currentSectionData.content}
                  </div>
                </div>

                {/* Discussion Questions */}
                {currentSectionData.questions && (
                  <div className="bg-blue-50 rounded-lg p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2 text-blue-600" />
                      Discussion Questions
                    </h3>
                    <div className="space-y-3">
                      {currentSectionData.questions.map((question, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-blue-600 mr-3 font-bold">{index + 1}.</span>
                          <p className="text-gray-700">{question}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Edit3 className="w-5 h-5 mr-2 text-green-600" />
                    Your Notes
                  </h3>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Take notes, write insights, or answer the discussion questions..."
                  />
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                    disabled={currentSection === 0}
                    className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                      currentSection === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous Section
                  </button>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        const insight = prompt('Add an insight or key takeaway:');
                        if (insight) addInsight(insight);
                      }}
                      className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                    >
                      Add Insight
                    </button>
                    
                    {currentSection < currentStudy.sections.length - 1 ? (
                      <button
                        onClick={() => setCurrentSection(currentSection + 1)}
                        className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                      >
                        Next Section
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          // Complete study
                          const updatedStudy = { ...currentStudy, status: 'completed', progress: 100 };
                          setCurrentStudy(updatedStudy);
                          alert('Congratulations! You have completed this case study.');
                        }}
                        className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                      >
                        Complete Study
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Study Overview */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Overview</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Category</span>
                    <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(currentStudy.category)}`}>
                      {currentStudy.category}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Difficulty</span>
                    <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(currentStudy.difficulty)}`}>
                      {currentStudy.difficulty}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Estimated Time</span>
                    <span className="text-sm font-medium text-gray-900">{currentStudy.estimatedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Time Spent</span>
                    <span className="text-sm font-medium text-gray-900">{formatTime(timeSpent)}</span>
                  </div>
                </div>
              </div>

              {/* Section Navigation */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sections</h3>
                <div className="space-y-2">
                  {currentStudy.sections.map((section, index) => {
                    const SectionIcon = getSectionIcon(section.type);
                    const isCompleted = index < currentSection;
                    const isCurrent = index === currentSection;
                    
                    return (
                      <button
                        key={section.id}
                        onClick={() => setCurrentSection(index)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          isCurrent
                            ? 'bg-blue-100 border-blue-300 border'
                            : isCompleted
                            ? 'bg-green-50 hover:bg-green-100'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center">
                          <SectionIcon className={`w-4 h-4 mr-3 ${
                            isCurrent ? 'text-blue-600' : 
                            isCompleted ? 'text-green-600' : 'text-gray-400'
                          }`} />
                          <div className="flex-1">
                            <div className={`text-sm font-medium ${
                              isCurrent ? 'text-blue-900' : 
                              isCompleted ? 'text-green-900' : 'text-gray-700'
                            }`}>
                              {section.title}
                            </div>
                            <div className="text-xs text-gray-500">
                              ~{section.estimatedTime}m
                            </div>
                          </div>
                          {isCompleted && (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Your Insights */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-600" />
                  Your Insights
                </h3>
                {insights.length > 0 ? (
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {insights.map((insight) => (
                      <div key={insight.id} className="bg-yellow-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-700 mb-1">{insight.text}</p>
                        <div className="text-xs text-gray-500">
                          {insight.section} • {new Date(insight.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">
                    No insights yet. Add insights as you progress through the case study.
                  </p>
                )}
              </div>

              {/* Learning Objectives */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Objectives</h3>
                <ul className="space-y-2">
                  {currentStudy.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <Target className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CaseStudyWorkspace;