import { isSupabaseConfigured } from '../lib/supabase';

export function Footer() {
  return (
    <footer className="footer">
      <p>
        Built for a GitHub portfolio with React, TypeScript, Supabase-ready storage, Chart.js visualizations, and a responsive dashboard UI.
      </p>
      <span>{isSupabaseConfigured ? 'Supabase connected' : 'Using local demo data'}</span>
    </footer>
  );
}
