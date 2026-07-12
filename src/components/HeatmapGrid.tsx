import type { Course, MetricKey } from '../types';
import { formatMetricValue, getHeatColorClass, metricDescriptions, metricLabels } from '../lib/courseUtils';

type HeatmapGridProps = {
  courses: Course[];
  metric: MetricKey;
  selectedCourseId: string;
  onSelectCourse: (course: Course) => void;
};

export function HeatmapGrid({ courses, metric, selectedCourseId, onSelectCourse }: HeatmapGridProps) {
  return (
    <section id="heatmap" className="panel card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Heatmap</p>
          <h2>{metricLabels[metric]}</h2>
          <p>{metricDescriptions[metric]}</p>
        </div>
        <span className="result-count">{courses.length} courses</span>
      </div>

      {courses.length === 0 ? (
        <div className="empty-state">No courses match your filters. Try a different search.</div>
      ) : (
        <div className="heatmap-grid">
          {courses.map((course) => (
            <button
              key={course.id}
              className={`${getHeatColorClass(course, metric)} ${selectedCourseId === course.id ? 'selected' : ''}`}
              onClick={() => onSelectCourse(course)}
              title={`${course.code} • ${course.professor} • ${formatMetricValue(course, metric)}`}
            >
              <span>{course.code}</span>
              <strong>{formatMetricValue(course, metric)}</strong>
              <small>{course.professor}</small>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
