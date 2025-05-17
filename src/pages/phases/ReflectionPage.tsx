import React from 'react';
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
import { 
  RefreshCw, 
  AlertCircle,
  MessageSquare,
  BarChart,
  FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ReflectionPage: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Reflection Phase</h1>
        <p className="text-gray-600 mt-1">Analyze your progress and refine your approach</p>
      </div>

      <div className="bg-gray-100 rounded-lg p-8 text-center mb-8">
        <div className="h-16 w-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-gray-400" />
        </div>
        <h2 className="mt-4 text-xl font-medium text-gray-900">Phase Locked</h2>
        <p className="mt-2 text-gray-600 max-w-lg mx-auto">
          You need to complete the Exploration phase before unlocking the Reflection phase.
          Continue working on your current phase to make progress.
        </p>
        <div className="mt-6 max-w-md mx-auto">
          <ProgressBar 
            value={user.phaseProgress.introspection} 
            label="Introspection Phase Progress" 
            showValue 
            variant="primary" 
          />
        </div>
        <Button 
          className="mt-6"
          onClick={() => window.location.href = '/phase/introspection'}
        >
          Return to Introspection Phase
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-50 pointer-events-none">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-accent-100 flex items-center justify-center mr-4">
                <MessageSquare className="h-5 w-5 text-accent-600" />
              </div>
              <div>
                <CardTitle>Mentor Feedback</CardTitle>
                <CardDescription>Receive guidance from industry experts</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Get personalized feedback on your progress from experienced mentors in your target field. 
              They'll help identify areas for improvement and provide strategic guidance.
            </p>
            <div className="mt-4 border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900">No mentors assigned yet</h3>
              <p className="text-sm text-gray-600 mt-1">
                Mentors will be available once you unlock this phase
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button fullWidth disabled>Connect with mentors</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-accent-100 flex items-center justify-center mr-4">
                <BarChart className="h-5 w-5 text-accent-600" />
              </div>
              <div>
                <CardTitle>Strength-Weakness Analyzer</CardTitle>
                <CardDescription>Assess your skills and identify gaps</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Our AI analyzes your progress, projects, and assessments to identify your strengths and areas for improvement.
              Get actionable insights to focus your learning efforts.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="border border-gray-200 rounded-lg p-3">
                <h3 className="text-sm font-medium text-gray-900">Top Strengths</h3>
                <ul className="mt-2 text-xs text-gray-600 space-y-1">
                  <li>Communication</li>
                  <li>Problem solving</li>
                  <li>Creativity</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-3">
                <h3 className="text-sm font-medium text-gray-900">Areas to Improve</h3>
                <ul className="mt-2 text-xs text-gray-600 space-y-1">
                  <li>Technical depth</li>
                  <li>Public speaking</li>
                  <li>Data analysis</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button fullWidth disabled>Analyze my skills</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-accent-100 flex items-center justify-center mr-4">
                <FileText className="h-5 w-5 text-accent-600" />
              </div>
              <div>
                <CardTitle>Case Study Generator</CardTitle>
                <CardDescription>Practice with industry-specific scenarios</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Work through realistic case studies tailored to your target role and companies.
              Build practical experience and prepare for interview scenarios.
            </p>
            <div className="mt-4 border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900">Locked Case Studies</h3>
              <p className="text-sm text-gray-600 mt-1">
                Complete previous phases to unlock case studies relevant to your target role
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button fullWidth disabled>Generate case study</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ReflectionPage;