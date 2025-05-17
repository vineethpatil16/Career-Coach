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
import Badge from '../../components/ui/Badge';
import { 
  Compass, 
  Lightbulb, 
  Share2, 
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ExplorationPage: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Exploration Phase</h1>
        <p className="text-gray-600 mt-1">Experiment with projects and share your learning journey</p>
      </div>

      <div className="bg-gray-100 rounded-lg p-8 text-center mb-8">
        <div className="h-16 w-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-gray-400" />
        </div>
        <h2 className="mt-4 text-xl font-medium text-gray-900">Phase Locked</h2>
        <p className="mt-2 text-gray-600 max-w-lg mx-auto">
          You need to complete the Introspection phase before unlocking the Exploration phase.
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-50 pointer-events-none">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-secondary-100 flex items-center justify-center mr-4">
                <Compass className="h-5 w-5 text-secondary-600" />
              </div>
              <div>
                <CardTitle>Project Research Tool</CardTitle>
                <CardDescription>Discover projects aligned with your career goals</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Explore potential projects that will help you build relevant skills and experience in your target field.
              Our AI-powered tool suggests projects based on your unique profile and goals.
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-900">Portfolio Website</h3>
                  <Badge variant="secondary">Beginner</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Create a personal portfolio website to showcase your skills and projects
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-900">Interactive Dashboard</h3>
                  <Badge variant="secondary">Intermediate</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Build a data visualization dashboard using real-world datasets
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button fullWidth disabled>Explore Projects</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-secondary-100 flex items-center justify-center mr-4">
                <Share2 className="h-5 w-5 text-secondary-600" />
              </div>
              <div>
                <CardTitle>Social Media Post Generator</CardTitle>
                <CardDescription>Share your learning journey effectively</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Create engaging social media content about your learning progress. Our AI helps you craft professional posts that showcase your growth and attract attention from potential employers.
            </p>
            <div className="mt-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <span className="text-blue-600 font-bold">Li</span>
                  </div>
                  <h3 className="font-medium text-gray-900">LinkedIn Post</h3>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-600">
                    Excited to share that I've started my journey into [field]! Today I learned about [topic] and am working on [project]. #CareerTransition #Learning
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button fullWidth disabled>Generate Posts</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ExplorationPage;