import { BookOpenCheck, Clock3, Star, UsersRound } from 'lucide-react';
import type { Course } from '../types';
import { getDashboardStats } from '../lib/courseUtils';

type StatCardsProps = {
  courses: Course[];
};

export function StatCards({ courses }: StatCardsProps) {
  const stats = getDashboardStats(courses);

  const items = [
    { label: 'Courses shown', value: stats.courseCount, helper: 'matching your filters', icon: BookOpenCheck },
    { label: 'Avg rating', value: `${stats.avgRating}/5`, helper: 'from student reviews', icon: Star },
    { label: 'Avg workload', value: `${stats.avgWorkload} hrs`, helper: 'outside class weekly', icon: Clock3 },
    { label: 'Attendance required', value: `${stats.attendanceRate}%`, helper: 'of visible courses', icon: UsersRound }
  ];

  return (
    <section className="stats-grid" aria-label="Dashboard summary">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <article className="stat-card card" key={item.label}>
            <div className="stat-icon"><Icon size={20} /></div>
            <p>{item.label}</p>
            <strong>{item.value}</strong>
            <span>{item.helper}</span>
          </article>
        );
      })}
    </section>
  );
}
