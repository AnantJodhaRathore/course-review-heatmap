import { GitCompareArrows, Plus, Star, X } from 'lucide-react';
import type { Course } from '../types';
import { getARate } from '../lib/courseUtils';

export function CompareScreen({ courses, ids, onToggle, onExplore }: { courses: Course[]; ids: string[]; onToggle: (id:string)=>void; onExplore:()=>void }) {
  const selected = ids.map(id => courses.find(c=>c.id===id)).filter(Boolean) as Course[];
  return <section className="screen-section"><div className="screen-heading"><div><p className="eyebrow">Side-by-side</p><h1>Compare courses</h1><p>See the tradeoffs before you lock in your schedule.</p></div><span className="count-pill">{selected.length}/3 selected</span></div>
    {selected.length === 0 ? <div className="empty-screen card"><GitCompareArrows size={42}/><h2>No courses selected yet</h2><p>Add up to three courses from Explore to compare rating, difficulty, workload, and outcomes.</p><button className="button primary" onClick={onExplore}>Browse courses</button></div> : <>
      <div className="compare-grid">{selected.map(c=><article className="compare-card card" key={c.id}><button className="icon-button remove" onClick={()=>onToggle(c.id)} aria-label="Remove"><X size={17}/></button><span className="code-chip">{c.code}</span><h2>{c.title}</h2><p>{c.professor}</p><div className="compare-score"><Star size={19} fill="currentColor"/><strong>{c.avgRating}</strong><span>/ 5</span></div>{[['Difficulty',`${c.difficulty}/5`],['Workload',`${c.workloadHours} hrs/week`],['A grade rate',`${getARate(c)}%`],['Attendance',c.attendanceRequired?'Required':'Flexible']].map(([a,b])=><div className="compare-line" key={a}><span>{a}</span><strong>{b}</strong></div>)}</article>)}{selected.length<3&&<button className="add-compare card" onClick={onExplore}><Plus/><span>Add another course</span></button>}</div>
    </>}
  </section>;
}
