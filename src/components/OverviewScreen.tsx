import { ArrowRight, Award, BookOpen, Clock3, Sparkles, Star, TrendingUp } from 'lucide-react';
import type { Course } from '../types';
import type { Screen } from './Header';
import { getARate, getDashboardStats } from '../lib/courseUtils';

export function OverviewScreen({ courses, onNavigate, onSelect }: { courses: Course[]; onNavigate: (s: Screen) => void; onSelect: (c: Course) => void }) {
  const stats = getDashboardStats(courses);
  const top = [...courses].sort((a, b) => b.avgRating - a.avgRating).slice(0, 3);
  const quickStats = [
    { label: 'Courses indexed', value: stats.courseCount, Icon: BookOpen },
    { label: 'Average workload', value: `${stats.avgWorkload}h`, Icon: Clock3 },
    { label: 'Average A rate', value: `${stats.avgARate}%`, Icon: Award },
    { label: 'Student rating', value: `${stats.avgRating}/5`, Icon: Star }
  ];
  return <>
    <section className="landing-hero">
      <div className="hero-copy-block">
        <div className="pill"><Sparkles size={15} /> Built from real student signals</div>
        <h1>Choose your next course with <span>confidence.</span></h1>
        <p>Compare professors, workload, grade outcomes, and honest reviews—all in one clear view.</p>
        <div className="hero-actions">
          <button className="button primary" onClick={() => onNavigate('explore')}>Explore courses <ArrowRight size={18} /></button>
          <button className="button ghost" onClick={() => onNavigate('compare')}>Compare options</button>
        </div>
        <div className="trust-row"><span><strong>{stats.courseCount}</strong> courses</span><span><strong>{courses.reduce((n,c)=>n+c.reviews.length,0)}+</strong> reviews</span><span><strong>{stats.avgRating}</strong> avg rating</span></div>
      </div>
      <div className="hero-visual card">
        <div className="visual-top"><span>Course pulse</span><span className="live-dot">Live data</span></div>
        {top.map((course, i) => <button key={course.id} className="pulse-row" onClick={() => { onSelect(course); onNavigate('explore'); }}>
          <span className="rank">0{i+1}</span><span><strong>{course.code}</strong><small>{course.title}</small></span><span className="rating"><Star size={14} fill="currentColor" /> {course.avgRating}</span>
        </button>)}
        <div className="visual-insight"><TrendingUp size={18}/><span><strong>Smart pick</strong><small>{top[0]?.code} leads this semester</small></span></div>
      </div>
    </section>
    <section className="quick-stats">
      {quickStats.map(({ label, value, Icon }) => <article className="card" key={label}><Icon size={21}/><div><strong>{value}</strong><span>{label}</span></div></article>)}
    </section>
    <section className="section-block">
      <div className="section-title"><div><p className="eyebrow">Top rated now</p><h2>Student favorites</h2><p>Strong ratings without the hidden workload surprises.</p></div><button className="text-button" onClick={()=>onNavigate('explore')}>View all <ArrowRight size={16}/></button></div>
      <div className="featured-grid">{top.map(course => <article className="course-card card" key={course.id}><div className="course-card-top"><span className="code-chip">{course.code}</span><span className="rating"><Star size={14} fill="currentColor"/> {course.avgRating}</span></div><h3>{course.title}</h3><p>{course.professor} · {course.department}</p><div className="mini-metrics"><span>{course.workloadHours}h / week</span><span>{getARate(course)}% A rate</span><span>{course.difficulty}/5 difficulty</span></div><button className="button ghost compact" onClick={()=>{onSelect(course);onNavigate('explore')}}>View course <ArrowRight size={15}/></button></article>)}</div>
    </section>
  </>;
}
