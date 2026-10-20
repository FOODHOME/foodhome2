import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Default Supabase config (can be configured via environment variables or in Admin settings)
const DEFAULT_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const DEFAULT_SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Local storage key for runtime Supabase credentials if configured in admin UI
const STORAGE_SUPABASE_CONFIG_KEY = 'foodhome_supabase_config_v1';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export function getSavedSupabaseConfig(): SupabaseConfig {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem(STORAGE_SUPABASE_CONFIG_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.url && parsed.anonKey) {
          return parsed;
        }
      }
    }
  } catch (e) {
    console.warn('Failed to parse saved supabase config:', e);
  }
  return {
    url: DEFAULT_SUPABASE_URL,
    anonKey: DEFAULT_SUPABASE_ANON_KEY
  };
}

export function saveSupabaseConfig(config: SupabaseConfig): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_SUPABASE_CONFIG_KEY, JSON.stringify(config));
    }
  } catch (e) {
    console.warn('Failed to save supabase config:', e);
  }
}

let cachedClient: SupabaseClient | null = null;
let lastUsedConfig: SupabaseConfig | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const currentConfig = getSavedSupabaseConfig();

  // If no URL or key is set, return null (fallback to local mock / Formspree)
  if (!currentConfig.url || !currentConfig.anonKey) {
    return null;
  }

  if (
    cachedClient &&
    lastUsedConfig &&
    lastUsedConfig.url === currentConfig.url &&
    lastUsedConfig.anonKey === currentConfig.anonKey
  ) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(currentConfig.url, currentConfig.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    });
    lastUsedConfig = currentConfig;
    return cachedClient;
  } catch (e) {
    console.error('Error creating Supabase client:', e);
    return null;
  }
}

/**
 * Checks if a user is registered as a site admin in Supabase.
 * Uses the requested `is_site_admin()` RPC function or queries `site_admins`.
 */
export async function isSiteAdmin(userId?: string): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    // 1. Try calling the RPC function `is_site_admin()`
    const { data: rpcData, error: rpcError } = await client.rpc('is_site_admin');
    if (!rpcError && typeof rpcData === 'boolean') {
      return rpcData;
    }

    // 2. Fallback: Query the `site_admins` table directly
    const targetUserId = userId || (await client.auth.getUser()).data.user?.id;
    if (!targetUserId) return false;

    const { data, error } = await client
      .from('site_admins')
      .select('id, role')
      .eq('user_id', targetUserId)
      .maybeSingle();

    if (!error && data) {
      return true;
    }
  } catch (e) {
    console.warn('isSiteAdmin check encountered an error:', e);
  }

  return false;
}

/**
 * Interface representing form_definitions table
 */
export interface FormDefinition {
  id: string;
  form_slug: string;
  title: string;
  description?: string;
  fields: Array<{
    name: string;
    label: string;
    type: 'text' | 'tel' | 'email' | 'textarea' | 'checkbox' | 'radio' | 'select' | 'password';
    required: boolean;
    options?: string[];
    placeholder?: string;
    default_value?: any;
  }>;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * Interface representing form_submissions table
 */
export interface FormSubmission {
  id: string;
  form_slug: string;
  title?: string;
  author_name?: string;
  phone?: string;
  email?: string;
  store_name?: string;
  address?: string;
  selected_items?: string[];
  payload: Record<string, any>;
  password_hash?: string;
  status: '접수대기' | '접수완료' | '답변완료' | '배송준비' | '배송완료' | '상담완료' | '보류';
  admin_reply?: string;
  admin_replied_at?: string;
  admin_replied_by?: string;
  tracking_number?: string;
  created_at: string;
}

/**
 * Fetch public sample board posts (without exposing private contact numbers or password hashes)
 */
export async function fetchSampleBoardPosts(): Promise<FormSubmission[]> {
  const client = getSupabaseClient();
  if (!client) return [];

  try {
    const { data, error } = await client
      .from('form_submissions')
      .select('id, form_slug, title, author_name, store_name, status, created_at, admin_replied_at')
      .eq('form_slug', 'sample-request')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error fetching sample posts from Supabase:', error);
      return [];
    }

    return (data || []) as FormSubmission[];
  } catch (e) {
    console.error('Supabase fetchSampleBoardPosts failed:', e);
    return [];
  }
}

/**
 * Submit a customer sample post
 */
export async function submitSampleBoardPost(params: {
  title: string;
  authorName: string;
  storeName: string;
  phone: string;
  address: string;
  selectedItems: string[];
  message: string;
  password: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, error: 'Supabase client not initialized' };
  }

  try {
    const { data, error } = await client
      .from('form_submissions')
      .insert([
        {
          form_slug: 'sample-request',
          title: params.title,
          author_name: params.authorName,
          store_name: params.storeName,
          phone: params.phone,
          address: params.address,
          selected_items: params.selectedItems,
          password_hash: params.password, // In real Supabase, hashed via Edge Function or client
          status: '접수완료',
          payload: {
            message: params.message,
            submittedAt: new Date().toISOString()
          }
        }
      ])
      .select('id')
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (e: any) {
    return { success: false, error: e?.message || 'Submission failed' };
  }
}
