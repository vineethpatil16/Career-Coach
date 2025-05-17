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
import { Play, AlertCircle, Briefcase, FileEdit, Kanban as LayoutKanban } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ActionPage: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Action Phase</h1>
        <p className="text-gray-600 mt-1">Execute your career transition plan and secure your target role</p>
      </div>

      <div className="bg-gray-100 rounded-lg p-8 text-center mb-8">
        <div className="h-16 w-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-gray-400" />
        </div>
        <h2 className="mt-4 text-xl font-medium text-gray-900">Phase Locked</h2>
        <p className="mt-2 text-gray-600 max-w-lg mx-auto">
          You need to complete the Reflection phase before unlocking the Action phase.
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
              <div className="h-10 w-10 rounded-full bg-success-100 flex items-center justify-center mr-4">
                <LayoutKanban className="h-5 w-5 text-success-600" />
              </div>
              <div>
                <CardTitle>Project Management</CardTitle>
                <CardDescription>Track your portfolio projects</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Manage your career transition projects using our Kanban board system.
              Track progress, set milestones, and build a compelling portfolio.
            </p>
            <div className="mt-4 border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900">No active projects</h3>
              <p className="text-sm text-gray-600 mt-1">
                Projects will be available once you unlock this phase
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button fullWidth disabled>View projects</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-success-100 flex items-center justify-center mr-4">
                <Briefcase className="h-5 w-5 text-success-600" />
              </div>
              <div>
                <CardTitle>Target Company Tracker</CardTitle>
                <CardDescription>Monitor opportunities at your dream companies</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Keep track of job openings, application status, and networking contacts at your target companies.
              Get alerts for new opportunities that match your profile.
            </p>
            <div className="mt-4 border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900">No companies tracked</h3>
              <p className="text-sm text-gray-600 mt-1">
                Add target companies once you unlock this phase
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button fullWidth disabled>Add companies</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-success-100 flex items-center justify-center mr-4">
                <FileEdit className="h-5 w-5 text-success-600" />
              </div>
              <div>
                <CardTitle>Resume Enhancement</CardTitle>
                <CardDescription>Optimize your resume for ATS and hiring managers</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Our AI-powered tools help you create targeted resumes that pass Applicant Tracking Systems (ATS)
              and impress human reviewers with role-specific achievements.
            </p>
            <div className="mt-4 border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900">Resume tools locked</h3>
              <p className="text-sm text-gray-600 mt-1">
                Resume enhancement tools available in final phase
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button fullWidth disabled>Enhance resume</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ActionPage;