import { Search } from 'lucide-react';
import type { Course, FiltersState } from '../types';
import { metricLabels, uniqueSorted } from '../lib/courseUtils';

type FiltersProps = {
  courses: Course[];
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
};

const metricOptions = Object.entries(metricLabels) as Array<[FiltersState['metric'], string]>;

export function Filters({ courses, filters, onChange }: FiltersProps) {
  const departments = ['All', ...uniqueSorted(courses.map((course) => course.department))];
  const professors = ['All', ...uniqueSorted(courses.map((course) => course.professor))];
  const semesters = ['All', ...uniqueSorted(courses.map((course) => `${course.semester} ${course.year}`))];

  return (
    <section className="filters card" aria-label="Course filters">
      <label className="search-box">
        <Search size={18} />
        <input
          value={filters.search}
          onChange={(event) => onChange({ ...filters, search: event.target.value })}
          placeholder="Search course, professor, tag, or department"
        />
      </label>

      <label>
        Department
        <select value={filters.department} onChange={(event) => onChange({ ...filters, department: event.target.value })}>
          {departments.map((department) => <option key={department}>{department}</option>)}
        </select>
      </label>

      <label>
        Professor
        <select value={filters.professor} onChange={(event) => onChange({ ...filters, professor: event.target.value })}>
          {professors.map((professor) => <option key={professor}>{professor}</option>)}
        </select>
      </label>

      <label>
        Semester
        <select value={filters.semester} onChange={(event) => onChange({ ...filters, semester: event.target.value })}>
          {semesters.map((semester) => <option key={semester}>{semester}</option>)}
        </select>
      </label>

      <label>
        Heatmap metric
        <select
          value={filters.metric}
          onChange={(event) => onChange({ ...filters, metric: event.target.value as FiltersState['metric'] })}
        >
          {metricOptions.map(([key, label]) => <option key={key} value={key}>{label}</option>)}
        </select>
      </label>
    </section>
  );
}
