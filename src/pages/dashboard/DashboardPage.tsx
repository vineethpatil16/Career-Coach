import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ProgressBar from '../../components/ui/ProgressBar';
import Badge from '../../components/ui/Badge';
import { 
  TrendingUp, 
  Calendar, 
  Lightbulb, 
  Compass, 
  RefreshCw,
  Play,
  ArrowRight,
  Users,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  // Calculate overall progress
  const overallProgress = 
    (user.phaseProgress.introspection + 
     user.phaseProgress.exploration + 
     user.phaseProgress.reflection + 
     user.phaseProgress.action) / 4;

  // Determine current phase
  const currentPhase = user.currentPhase;
  
  // Upcoming tasks
  const upcomingTasks = [
    { id: 1, name: 'Complete Ikigai exercise', phase: 'introspection', dueDate: '2025-06-15' },
    { id: 2, name: 'Research target companies', phase: 'introspection', dueDate: '2025-06-18' },
    { id: 3, name: 'Draft outreach messages', phase: 'introspection', dueDate: '2025-06-20' },
  ];

  // Recent activities
  const recentActivities = [
    { id: 1, type: 'completion', description: 'Completed Skills Assessment', date: '2 hours ago' },
    { id: 2, type: 'mentor', description: 'Mentor Sarah left feedback on your profile', date: '1 day ago' },
    { id: 3, type: 'phase', description: 'Started Introspection phase', date: '3 days ago' },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}</h1>
        <p className="text-gray-600 mt-1">Here's an overview of your career transition progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Your Journey Progress</CardTitle>
            <CardDescription>Track your progress through all career transition phases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <Lightbulb size={18} className="text-primary-600 mr-2" />
                  <h4 className="text-sm font-medium text-gray-900">Introspection</h4>
                </div>
                <ProgressBar 
                  value={user.phaseProgress.introspection} 
                  showValue 
                  variant={currentPhase === 'introspection' ? 'primary' : 'default'} 
                />
                {currentPhase === 'introspection' && (
                  <Badge variant="primary" className="mt-2">Current Phase</Badge>
                )}
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <Compass size={18} className="text-secondary-600 mr-2" />
                  <h4 className="text-sm font-medium text-gray-900">Exploration</h4>
                </div>
                <ProgressBar 
                  value={user.phaseProgress.exploration} 
                  showValue 
                  variant={currentPhase === 'exploration' ? 'primary' : 'default'} 
                />
                {currentPhase === 'exploration' && (
                  <Badge variant="primary" className="mt-2">Current Phase</Badge>
                )}
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <RefreshCw size={18} className="text-accent-600 mr-2" />
                  <h4 className="text-sm font-medium text-gray-900">Reflection</h4>
                </div>
                <ProgressBar 
                  value={user.phaseProgress.reflection} 
                  showValue 
                  variant={currentPhase === 'reflection' ? 'primary' : 'default'} 
                />
                {currentPhase === 'reflection' && (
                  <Badge variant="primary" className="mt-2">Current Phase</Badge>
                )}
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <Play size={18} className="text-success-600 mr-2" />
                  <h4 className="text-sm font-medium text-gray-900">Action</h4>
                </div>
                <ProgressBar 
                  value={user.phaseProgress.action} 
                  showValue 
                  variant={currentPhase === 'action' ? 'primary' : 'default'} 
                />
                {currentPhase === 'action' && (
                  <Badge variant="primary" className="mt-2">Current Phase</Badge>
                )}
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Link to={`/phase/${currentPhase}`}>
                <Button 
                  rightIcon={<ArrowRight size={16} />}
                >
                  Continue {currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1)} Phase
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
            <CardDescription>Your career transition journey</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-32 h-32">
              <CircularProgressbar 
                value={overallProgress} 
                text={`${Math.round(overallProgress)}%`}
                styles={buildStyles({
                  pathColor: '#2563eb',
                  textColor: '#1e40af',
                  trailColor: '#dbeafe'
                })}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-center">
              <p className="text-sm text-gray-600">You're making good progress!</p>
              <p className="text-xs text-gray-500 mt-1">Keep working through your current phase</p>
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Tasks to complete in your journey</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-gray-200">
              {upcomingTasks.map(task => (
                <li key={task.id} className="py-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{task.name}</p>
                      <Badge 
                        variant={
                          task.phase === 'introspection' ? 'primary' : 
                          task.phase === 'exploration' ? 'secondary' : 
                          task.phase === 'reflection' ? 'accent' : 'success'
                        }
                        size="sm"
                        className="mt-1"
                      >
                        {task.phase.charAt(0).toUpperCase() + task.phase.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={14} className="text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" fullWidth size="sm">
              View all tasks
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest interactions and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-gray-200">
              {recentActivities.map(activity => (
                <li key={activity.id} className="py-3">
                  <div className="flex">
                    <div className="mr-3">
                      {activity.type === 'completion' ? (
                        <div className="h-8 w-8 rounded-full bg-success-100 flex items-center justify-center">
                          <CheckCircle2 size={16} className="text-success-600" />
                        </div>
                      ) : activity.type === 'mentor' ? (
                        <div className="h-8 w-8 rounded-full bg-secondary-100 flex items-center justify-center">
                          <MessageSquare size={16} className="text-secondary-600" />
                        </div>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                          <TrendingUp size={16} className="text-primary-600" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" fullWidth size="sm">
              View all activity
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Mentor Connection</CardTitle>
            <CardDescription>Connect with industry mentors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <Users size={24} className="text-gray-500" />
              </div>
              <h4 className="font-medium text-gray-900">No mentor assigned yet</h4>
              <p className="text-sm text-gray-500 mt-1">Complete more of your current phase to get matched with a mentor</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" fullWidth size="sm">
              Browse available mentors
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;