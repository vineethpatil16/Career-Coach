import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Target,
  CheckCircle,
  Clock,
  Award,
  ArrowLeft,
  Brain,
  Star
} from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const TrackProgressPage = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('overview');

  const progressData = {
    overall: 75,
    skills: {
      'JavaScript': 85,
      'React': 78,
      'Node.js': 65,
      'Python': 70,
      'SQL': 60
    },
    quizzes: [
      { id: 1, name: 'JavaScript Fundamentals', score: 85, date: '2024-01-15', status: 'completed' },
      { id: 2, name: 'React Components', score: 78, date: '2024-01-10', status: 'completed' },
      { id: 3, name: 'Database Design', score: 65, date: '2024-01-05', status: 'completed' },
      { id: 4, name: 'System Design', score: 0, date: null, status: 'pending' }
    ],
    phases: [
      { id: 1, name: 'Discovery', progress: 100, status: 'completed' },
      { id: 2, name: 'Skill Building', progress: 75, status: 'active' },
      { id: 3, name: 'Application', progress: 25, status: 'pending' },
      { id: 4, name: 'Interview Prep', progress: 0, status: 'locked' }
    ]
  };

  const tabs = ['overview', 'skills', 'quizzes', 'phases'];

  const ProgressCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <Icon className={`h-8 w-8 ${color}`} />
      </div>
    </div>
  );

  const OverviewTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <ProgressCard title="Overall Progress" value={`${progressData.overall}%`} icon={TrendingUp} color="text-primary-600" />
      <ProgressCard title="Completed Quizzes" value="3" icon={CheckCircle} color="text-green-600" />
      <ProgressCard title="Active Phase" value="Skill Building" icon={Target} color="text-yellow-600" />
      <ProgressCard title="Skills Mastered" value="2" icon={Award} color="text-indigo-600" />
    </div>
  );

  const SkillsTab = () => (
    <div className="space-y-4">
      {Object.entries(progressData.skills).map(([skill, percent]) => (
        <div key={skill} className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
          <span>{skill}</span>
          <span>{percent}%</span>
        </div>
      ))}
    </div>
  );

  const QuizzesTab = () => (
    <div className="space-y-4">
      {progressData.quizzes.map(quiz => (
        <div key={quiz.id} className="bg-white rounded-lg shadow-md p-4">
          <h4 className="font-medium text-gray-900">{quiz.name}</h4>
          <p>Status: {quiz.status}</p>
          {quiz.status === 'completed' && <p>Score: {quiz.score}%</p>}
        </div>
      ))}
    </div>
  );

  const PhasesTab = () => (
    <div className="space-y-4">
      {progressData.phases.map(phase => (
        <div key={phase.id} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center">
            <h4>{phase.name}</h4>
            <span>{phase.status}</span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${phase.status === 'completed' ? 'bg-green-500' : phase.status === 'active' ? 'bg-blue-500' : 'bg-gray-300'}`}
              style={{ width: `${phase.progress}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return <OverviewTab />;
      case 'skills':
        return <SkillsTab />;
      case 'quizzes':
        return <QuizzesTab />;
      case 'phases':
        return <PhasesTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <button onClick={() => navigate('/dashboard')} className="text-gray-600 hover:text-gray-800 flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </button>
          <h1 className="text-3xl font-bold">Track Progress</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <nav className="mb-6 flex space-x-8">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setSelectedTab(tab)} className={`capitalize ${selectedTab === tab ? 'text-primary-600 border-b-2 border-primary-500' : 'text-gray-600'}`}>{tab}</button>
          ))}
        </nav>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default TrackProgressPage;
