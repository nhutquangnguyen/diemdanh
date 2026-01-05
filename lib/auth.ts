import { supabase } from './supabase';

export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) throw error;
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Fast synchronous check from localStorage
export function getCurrentUserSync() {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem('diemdanh-auth');
    if (!stored) return null;

    const data = JSON.parse(stored);
    // Check if session is expired
    if (data?.expires_at && data.expires_at * 1000 < Date.now()) {
      return null;
    }

    return data?.user || null;
  } catch {
    return null;
  }
}

// Async verification (validates token)
export async function getCurrentUser() {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user || null;
}

export async function getUserMetadata() {
  const { data: { user } } = await supabase.auth.getUser();
  return user?.user_metadata;
}
