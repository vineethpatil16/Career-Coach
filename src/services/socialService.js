import { supabase } from './supabase'

export const socialService = {
  // Get all posts
  getAll: async (userId, platform = null) => {
    let query = supabase
      .from('social_posts')
      .select('*')
      .eq('user_id', userId)

    if (platform) {
      query = query.eq('platform', platform)
    }

    const { data, error } = await query.order('created_at', { ascending: false })
    return { data, error }
  },

  // Create post
  create: async (postData) => {
    const { data, error } = await supabase
      .from('social_posts')
      .insert(postData)
      .select()
      .single()
    return { data, error }
  },

  // Update post
  update: async (postId, updates) => {
    const { data, error } = await supabase
      .from('social_posts')
      .update(updates)
      .eq('id', postId)
      .select()
      .single()
    return { data, error }
  },

  // Delete post
  delete: async (postId) => {
    const { error } = await supabase
      .from('social_posts')
      .delete()
      .eq('id', postId)
    return { error }
  },
}
