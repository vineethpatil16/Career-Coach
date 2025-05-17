// profileservice.jsx (JavaScript version)
import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

const phases = {
  introspection: {
    title: 'Introspection',
    description: 'Discover your purpose, passion, and career goals',
    icon: '🔍',
    wrapperClasses: 'bg-blue-100 text-blue-800',
    fillClassName: 'bg-blue-600',
  },
  exploration: {
    title: 'Exploration',
    description: 'Build projects and share your learning journey',
    icon: '🧪',
    wrapperClasses: 'bg-purple-100 text-purple-800',
    fillClassName: 'bg-purple-600',
  },
  reflection: {
    title: 'Reflection',
    description: 'Get feedback and refine your approach',
    icon: '🤔',
    wrapperClasses: 'bg-amber-100 text-amber-800',
    fillClassName: 'bg-amber-600',
  },
  action: {
    title: 'Action',
    description: 'Apply to jobs and track your progress',
    icon: '🚀',
    wrapperClasses: 'bg-green-100 text-green-800',
    fillClassName: 'bg-green-600',
  },
};

export function PhaseProgressCard() {
  const { user } = useAuth();
  const [currentPhase, setCurrentPhase] = useState('introspection');
  const [overallProgress, setOverallProgress] = useState({
    introspection: 0,
    exploration: 0,
    reflection: 0,
    action: 0,
  });

  useEffect(() => {
    if (!user) return;

    async function fetchData() {
      // Fetch current phase
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('current_phase')
        .eq('id', user.id)
        .single();

      if (!profileError && profile?.current_phase) {
        setCurrentPhase(profile.current_phase);
      }

      // Fetch phase progress
      const { data: rows, error: rowsError } = await supabase
        .from('phase_progress')
        .select('phase, subphase, progress')
        .eq('user_id', user.id);

      if (rowsError || !rows) return;

      const groups = {};
      const averages = {
        introspection: 0,
        exploration: 0,
        reflection: 0,
        action: 0,
      };

      rows.forEach(row => {
        const { phase, progress } = row;
        if (!groups[phase]) groups[phase] = [];
        groups[phase].push(progress);
      });

      Object.entries(groups).forEach(([phaseKey, progressList]) => {
        const sum = progressList.reduce((sum, p) => sum + p, 0);
        averages[phaseKey] = progressList.length
          ? Math.round(sum / progressList.length)
          : 0;
      });

      setOverallProgress(averages);
    }

    fetchData();
  }, [user]);

  return (
    <Card className="p-5 shadow-md">
      <h2 className="text-xl font-bold mb-4">Your Career Transition Journey</h2>
      {Object.entries(phases).map(([phaseKey, info]) => {
        const progress = overallProgress[phaseKey] || 0;
        const isActive = currentPhase === phaseKey;
        const wrapperClass = `mb-4 p-3 rounded-lg ${
          isActive ? info.wrapperClasses : 'bg-gray-100 text-gray-800'
        }`;
        const trackClass = isActive ? 'bg-white/30' : 'bg-gray-200';

        return (
          <div key={phaseKey} className={wrapperClass}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{info.icon}</span>
                <h3 className="font-semibold">{info.title}</h3>
              </div>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <ProgressBar
              value={progress}
              max={100}
              className={trackClass}
              fillClassName={info.fillClassName}
            />
            <p className="text-sm mt-2">{info.description}</p>
          </div>
        );
      })}
    </Card>
  );
}
