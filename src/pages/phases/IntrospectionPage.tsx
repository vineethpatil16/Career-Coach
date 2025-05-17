import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardFooter
} from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ProgressBar from '../../components/ui/ProgressBar';
import Badge from '../../components/ui/Badge';
import { 
  Lightbulb, 
  ArrowRight, 
  Target, 
  Search, 
  Send,
  Check,
  Clock,
  AlertCircle
} from 'lucide-react';

const IntrospectionPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'ikigai' | 'research' | 'outreach'>('overview');
  
  if (!user) return null;
  
  const introspectionProgress = user.phaseProgress.introspection;
  
  // Define modules with their completion status
  const modules = [
    { 
      id: 'ikigai', 
      name: 'Ikigai Module', 
      description: 'Discover your purpose, passion, and career direction',
      progress: 65, 
      status: 'in-progress',
      icon: Lightbulb
    },
    { 
      id: 'research', 
      name: 'Role/Industry Research Tool', 
      description: 'Explore potential roles and industries that match your profile',
      progress: 40, 
      status: 'in-progress',
      icon: Search
    },
    { 
      id: 'outreach', 
      name: 'Personalized Outreach Generator', 
      description: 'Create effective messages for networking and job applications',
      progress: 0, 
      status: 'locked',
      icon: Send
    },
  ];
  
  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
        <div className="flex items-start">
          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-4">
            <Lightbulb className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Introspection Phase</h2>
            <p className="text-gray-600 mt-1">
              The first step in your career transition journey is understanding yourself deeply. 
              In this phase, you'll explore your values, skills, and aspirations to align your career path with your authentic self.
            </p>
            <div className="mt-4">
              <ProgressBar 
                value={introspectionProgress} 
                label="Phase Progress" 
                showValue 
                variant="primary" 
              />
            </div>
          </div>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900">Available Modules</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <Card key={module.id} className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                    <Icon className="h-4 w-4 text-primary-600" />
                  </div>
                  <CardTitle className="text-base">{module.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{module.description}</CardDescription>
                <div className="mt-4">
                  <ProgressBar value={module.progress} showValue size="sm" />
                </div>
                <div className="mt-2 flex items-center">
                  {module.status === 'completed' && (
                    <Badge variant="success" className="flex items-center">
                      <Check size={12} className="mr-1" /> Completed
                    </Badge>
                  )}
                  {module.status === 'in-progress' && (
                    <Badge variant="primary" className="flex items-center">
                      <Clock size={12} className="mr-1" /> In Progress
                    </Badge>
                  )}
                  {module.status === 'locked' && (
                    <Badge variant="default" className="flex items-center">
                      <AlertCircle size={12} className="mr-1" /> Locked
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => setActiveTab(module.id as any)}
                  variant={module.status === 'locked' ? 'outline' : 'primary'}
                  rightIcon={<ArrowRight size={16} />}
                  fullWidth
                  disabled={module.status === 'locked'}
                >
                  {module.status === 'completed' ? 'Review' : 
                   module.status === 'in-progress' ? 'Continue' : 'Locked'}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
  
  const renderIkigai = () => (
    <div className="space-y-6">
      <div className="flex items-center">
        <button 
          onClick={() => setActiveTab('overview')}
          className="mr-2 p-1 rounded-full hover:bg-gray-100"
        >
          <ArrowRight size={16} className="transform rotate-180" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">Ikigai Module</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>What is Ikigai?</CardTitle>
          <CardDescription>
            Ikigai is a Japanese concept that means "a reason for being." It lies at the intersection of:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
              <h3 className="font-medium text-primary-800">What you love</h3>
              <p className="text-sm text-gray-600 mt-1">Your passion and interests that bring you joy</p>
            </div>
            <div className="bg-secondary-50 p-4 rounded-lg border border-secondary-100">
              <h3 className="font-medium text-secondary-800">What you're good at</h3>
              <p className="text-sm text-gray-600 mt-1">Your skills, strengths and talents</p>
            </div>
            <div className="bg-accent-50 p-4 rounded-lg border border-accent-100">
              <h3 className="font-medium text-accent-800">What the world needs</h3>
              <p className="text-sm text-gray-600 mt-1">Services and contributions valued by others</p>
            </div>
            <div className="bg-success-50 p-4 rounded-lg border border-success-100">
              <h3 className="font-medium text-success-800">What you can be paid for</h3>
              <p className="text-sm text-gray-600 mt-1">Skills and services people will compensate you for</p>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-gray-700">
              Finding your ikigai means discovering the sweet spot where these four elements intersect. This module will help you explore each dimension and identify potential career paths aligned with your ikigai.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Self-Discovery Exercises</CardTitle>
          <CardDescription>Complete these exercises to uncover insights about yourself</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Core Values Assessment</h4>
                <p className="text-sm text-gray-600">Identify your top 5 personal values</p>
              </div>
              <Badge variant="success">Completed</Badge>
            </div>
            
            <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Passion Discovery</h4>
                <p className="text-sm text-gray-600">Explore activities that energize you</p>
              </div>
              <Badge variant="success">Completed</Badge>
            </div>
            
            <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                <Clock className="h-4 w-4 text-primary-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Skills Inventory</h4>
                <p className="text-sm text-gray-600">List and rate your technical and soft skills</p>
              </div>
              <Button size="sm">Continue</Button>
            </div>
            
            <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                <AlertCircle className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Market Demand Analysis</h4>
                <p className="text-sm text-gray-600">Research skills in demand in your target field</p>
              </div>
              <Button variant="outline" size="sm" disabled>Locked</Button>
            </div>
            
            <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                <AlertCircle className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Purpose Statement</h4>
                <p className="text-sm text-gray-600">Draft your personal mission statement</p>
              </div>
              <Button variant="outline" size="sm" disabled>Locked</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Journal</CardTitle>
          <CardDescription>Record your thoughts and reflections on your career journey</CardDescription>
        </CardHeader>
        <CardContent>
          <textarea 
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 h-32"
            placeholder="Write your thoughts here..."
          ></textarea>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Save Entry</Button>
        </CardFooter>
      </Card>
    </div>
  );
  
  const renderResearch = () => (
    <div className="space-y-6">
      <div className="flex items-center">
        <button 
          onClick={() => setActiveTab('overview')}
          className="mr-2 p-1 rounded-full hover:bg-gray-100"
        >
          <ArrowRight size={16} className="transform rotate-180" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">Role/Industry Research Tool</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Role Explorer</CardTitle>
          <CardDescription>Search and explore potential career paths based on your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text"
              placeholder="Search roles or industries..."
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Button>
              Search
            </Button>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium text-gray-900 mb-3">Recommended Roles Based on Your Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-sm transition-all cursor-pointer">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-900">UX Designer</h4>
                  <Badge variant="primary">95% Match</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-2">Create user-centered designs for websites and applications</p>
                <div className="mt-3 flex items-center">
                  <Target size={14} className="text-primary-600 mr-1" />
                  <span className="text-xs text-primary-600">Skills match your profile</span>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-sm transition-all cursor-pointer">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-900">Product Manager</h4>
                  <Badge variant="secondary">82% Match</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-2">Oversee product development from conception to launch</p>
                <div className="mt-3 flex items-center">
                  <Target size={14} className="text-secondary-600 mr-1" />
                  <span className="text-xs text-secondary-600">Aligns with your leadership skills</span>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-sm transition-all cursor-pointer">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-900">Frontend Developer</h4>
                  <Badge variant="accent">78% Match</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-2">Build user interfaces for websites and applications</p>
                <div className="mt-3 flex items-center">
                  <Target size={14} className="text-accent-600 mr-1" />
                  <span className="text-xs text-accent-600">Technical skills alignment</span>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-sm transition-all cursor-pointer">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-900">Content Strategist</h4>
                  <Badge variant="success">75% Match</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-2">Plan, create, and manage content across channels</p>
                <div className="mt-3 flex items-center">
                  <Target size={14} className="text-success-600 mr-1" />
                  <span className="text-xs text-success-600">Matches your communication skills</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Industry Insights</CardTitle>
          <CardDescription>Explore trends and growth in different industries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-sm transition-all">
              <h3 className="font-medium text-gray-900">Technology</h3>
              <div className="mt-2 flex items-center">
                <ProgressBar value={85} max={100} size="sm" className="flex-1 mr-2" />
                <span className="text-sm font-medium text-gray-600">85% Growth</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                The technology sector continues to experience rapid growth, particularly in areas like artificial intelligence, cybersecurity, and cloud computing.
              </p>
              <Button variant="link" className="mt-2 p-0" rightIcon={<ArrowRight size={14} />}>
                View detailed report
              </Button>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-sm transition-all">
              <h3 className="font-medium text-gray-900">Healthcare</h3>
              <div className="mt-2 flex items-center">
                <ProgressBar value={78} max={100} size="sm" className="flex-1 mr-2" />
                <span className="text-sm font-medium text-gray-600">78% Growth</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Healthcare is expanding rapidly with innovations in telehealth, health tech, and personalized medicine driving significant job creation.
              </p>
              <Button variant="link" className="mt-2 p-0" rightIcon={<ArrowRight size={14} />}>
                View detailed report
              </Button>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-sm transition-all">
              <h3 className="font-medium text-gray-900">Renewable Energy</h3>
              <div className="mt-2 flex items-center">
                <ProgressBar value={72} max={100} size="sm" className="flex-1 mr-2" />
                <span className="text-sm font-medium text-gray-600">72% Growth</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                The renewable energy sector is seeing substantial growth as governments and businesses commit to sustainability goals and climate initiatives.
              </p>
              <Button variant="link" className="mt-2 p-0" rightIcon={<ArrowRight size={14} />}>
                View detailed report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
  
  const renderOutreach = () => (
    <div className="space-y-6">
      <div className="flex items-center">
        <button 
          onClick={() => setActiveTab('overview')}
          className="mr-2 p-1 rounded-full hover:bg-gray-100"
        >
          <ArrowRight size={16} className="transform rotate-180" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">Personalized Outreach Generator</h2>
      </div>
      
      <div className="bg-gray-100 rounded-lg p-6 text-center">
        <div className="h-16 w-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">Module Locked</h3>
        <p className="mt-2 text-gray-600">
          Complete at least 75% of the Ikigai Module and Role/Industry Research Tool to unlock this feature.
        </p>
        <div className="mt-4">
          <ProgressBar 
            value={introspectionProgress} 
            label="Phase Progress" 
            showValue 
            variant="primary" 
          />
        </div>
        <Button 
          onClick={() => setActiveTab('ikigai')}
          className="mt-6"
        >
          Return to Ikigai Module
        </Button>
      </div>
    </div>
  );
  
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'ikigai':
        return renderIkigai();
      case 'research':
        return renderResearch();
      case 'outreach':
        return renderOutreach();
      default:
        return renderOverview();
    }
  };
  
  return (
    <div className="animate-fade-in">
      {renderContent()}
    </div>
  );
};

export default IntrospectionPage;