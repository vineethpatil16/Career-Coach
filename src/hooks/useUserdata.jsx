// src/hooks/useUserData.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabase';

export const useUserData = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setUserData(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Get user profile data
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') { // Not found error is okay
          throw profileError;
        }

        // Get user favorites
        const { data: favorites, error: favoritesError } = await supabase
          .from('user_favorites')
          .select('item_type, item_id')
          .eq('user_id', user.id);

        if (favoritesError) {
          throw favoritesError;
        }

        // Get user progress data (phases, projects, etc.)
        const { data: phaseProgress, error: phaseError } = await supabase
          .from('phase_progress')
          .select('*')
          .eq('user_id', user.id)
          .order('phase_number');

        if (phaseError) {
          throw phaseError;
        }

        // Get user case study progress
        const { data: caseStudyProgress, error: caseStudyError } = await supabase
          .from('user_case_studies')
          .select('case_study_id, progress_percentage, completion_status')
          .eq('user_id', user.id);

        if (caseStudyError) {
          throw caseStudyError;
        }

        // Combine all user data
        setUserData({
          profile: profile || null,
          favorites: favorites || [],
          phaseProgress: phaseProgress || [],
          caseStudyProgress: caseStudyProgress || [],
          // You can add more user data here as needed
        });
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?.id]);

  // Check if an item is in user's favorites
  const isFavorite = (itemType, itemId) => {
    if (!userData?.favorites) return false;
    
    return userData.favorites.some(
      fav => fav.item_type === itemType && fav.item_id === itemId
    );
  };

  // Get user progress for a specific case study
  const getCaseStudyProgress = (caseStudyId) => {
    if (!userData?.caseStudyProgress) return null;
    
    return userData.caseStudyProgress.find(
      progress => progress.case_study_id === caseStudyId
    );
  };

  // Get current phase
  const getCurrentPhase = () => {
    if (!userData?.phaseProgress || userData.phaseProgress.length === 0) {
      return null;
    }
    
    return userData.phaseProgress.find(phase => !phase.is_completed) || 
      userData.phaseProgress[userData.phaseProgress.length - 1];
  };

  // Update user profile
  const updateProfile = async (updates) => {
    if (!user) return { error: new Error('No user logged in') };
    
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          ...updates,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Update local state
      setUserData(prev => ({
        ...prev,
        profile: data
      }));
      
      return { data, error: null };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { data: null, error };
    }
  };

  // Add an item to favorites
  const addToFavorites = async (itemType, itemId) => {
    if (!user) return { error: new Error('No user logged in') };
    
    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .insert({
          user_id: user.id,
          item_type: itemType,
          item_id: itemId,
          created_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Update local state
      setUserData(prev => ({
        ...prev,
        favorites: [...(prev?.favorites || []), { item_type: itemType, item_id: itemId }]
      }));
      
      return { data, error: null };
    } catch (error) {
      console.error('Error adding to favorites:', error);
      return { data: null, error };
    }
  };

  // Remove an item from favorites
  const removeFromFavorites = async (itemType, itemId) => {
    if (!user) return { error: new Error('No user logged in') };
    
    try {
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .match({
          user_id: user.id,
          item_type: itemType,
          item_id: itemId
        });
      
      if (error) throw error;
      
      // Update local state
      setUserData(prev => ({
        ...prev,
        favorites: prev?.favorites.filter(
          fav => !(fav.item_type === itemType && fav.item_id === itemId)
        ) || []
      }));
      
      return { error: null };
    } catch (error) {
      console.error('Error removing from favorites:', error);
      return { error };
    }
  };

  // Update case study progress
  const updateCaseStudyProgress = async (caseStudyId, progressPercentage, completionStatus) => {
    if (!user) return { error: new Error('No user logged in') };
    
    try {
      const { data, error } = await supabase
        .from('user_case_studies')
        .upsert({
          user_id: user.id,
          case_study_id: caseStudyId,
          progress_percentage: progressPercentage,
          completion_status: completionStatus,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Update local state
      setUserData(prev => {
        const updatedProgress = prev?.caseStudyProgress?.map(progress => 
          progress.case_study_id === caseStudyId ? data : progress
        ) || [];
        
        // If it's a new entry, add it
        if (!updatedProgress.some(p => p.case_study_id === caseStudyId)) {
          updatedProgress.push(data);
        }
        
        return {
          ...prev,
          caseStudyProgress: updatedProgress
        };
      });
      
      return { data, error: null };
    } catch (error) {
      console.error('Error updating case study progress:', error);
      return { data: null, error };
    }
  };

  return {
    userData,
    loading,
    error,
    isFavorite,
    getCaseStudyProgress,
    getCurrentPhase,
    updateProfile,
    addToFavorites,
    removeFromFavorites,
    updateCaseStudyProgress,
    // Add more utility functions as needed
  };
};