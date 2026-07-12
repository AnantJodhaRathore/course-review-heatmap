import { BarChart3, Github, GraduationCap } from 'lucide-react';

export function Header() {
  return (
    <header className="hero">
      <nav className="nav">
        <div className="brand">
          <img src="/logo.svg" alt="Course Review Heatmap logo" />
          <span>CourseHeat</span>
        </div>
        <div className="nav-links">
          <a href="#heatmap">Heatmap</a>
          <a href="#compare">Compare</a>
          <a href="#reviews">Reviews</a>
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={18} />
          </a>
        </div>
      </nav>

      <section className="hero-content">
        <div>
          <p className="eyebrow"><GraduationCap size={16} /> Student-built course intelligence</p>
          <h1>Pick better classes with professor ratings, grade data, and workload heatmaps.</h1>
          <p className="hero-copy">
            A recruiter-ready React project that visualizes course reviews by semester, professor, attendance policy,
            difficulty, grade distribution, and weekly workload.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#heatmap">Explore heatmap</a>
            <a className="button ghost" href="#reviews">Add a review</a>
          </div>
        </div>

        <div className="hero-card" aria-label="Project highlights">
          <BarChart3 size={38} />
          <h2>Full dashboard demo</h2>
          <p>Search, filter, compare professors, view charts, add reviews, and optionally connect Supabase.</p>
          <div className="stack-tags">
            <span>React</span>
            <span>Supabase-ready</span>
            <span>Chart.js</span>
            <span>TypeScript</span>
          </div>
        </div>
      </section>
    </header>
  );
}
