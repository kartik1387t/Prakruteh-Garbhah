// This flag controls the architecture mode.
// true = Redirect calls to custom Node/Python backend (Phase 2)
// false = Direct Supabase calls (Phase 1)
// Fix: Cast import.meta to any to resolve TS error for env property
export const USE_BACKEND_API = (import.meta as any).env.VITE_USE_BACKEND_API === 'true';

export const API_BASE_URL = (import.meta as any).env.VITE_API_BASE_URL || '/api/v1';