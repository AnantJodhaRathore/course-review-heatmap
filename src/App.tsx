import { useEffect, useMemo, useState } from 'react';
import { CourseDetail } from './components/CourseDetail';
import { CourseTable } from './components/CourseTable';
import { Filters } from './components/Filters';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeatmapGrid } from './components/HeatmapGrid';
import { InsightsPanel } from './components/InsightsPanel';
import { ReviewForm } from './components/ReviewForm';
import { StatCards } from './components/StatCards';
import { filterCourses, addReviewToCourse } from './lib/courseUtils';
import { loadCourses, resetSavedCourses, saveCourses } from './lib/storage';
import type { Course, FiltersState, NewReviewForm } from './types';

const defaultFilters: FiltersState = {
  search: '',
  department: 'All',
  professor: 'All',
  semester: 'All',
  metric: 'avgRating'
};

function App() {
  const [courses, setCourses] = useState<Course[]>(() => loadCourses());
  const [filters, setFilters] = useState<FiltersState>(defaultFilters);
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id ?? '');

  useEffect(() => {
    saveCourses(courses);
  }, [courses]);

  const filteredCourses = useMemo(() => filterCourses(courses, filters), [courses, filters]);
  const selectedCourse = courses.find((course) => course.id === selectedCourseId) ?? filteredCourses[0] ?? courses[0];

  useEffect(() => {
    if (filteredCourses.length && !filteredCourses.some((course) => course.id === selectedCourseId)) {
      setSelectedCourseId(filteredCourses[0].id);
    }
  }, [filteredCourses, selectedCourseId]);

  function selectCourse(course: Course) {
    setSelectedCourseId(course.id);
  }

  function submitReview(form: NewReviewForm) {
    setCourses((currentCourses) =>
      currentCourses.map((course) => (course.id === selectedCourse.id ? addReviewToCourse(course, form) : course))
    );
  }

  function resetDemo() {
    const originalCourses = resetSavedCourses();
    setCourses(originalCourses);
    setFilters(defaultFilters);
    setSelectedCourseId(originalCourses[0].id);
  }

  return (
    <>
      <Header />
      <main className="page-shell">
        <div className="top-actions">
          <p>Use this as a portfolio project, then replace the sample dataset with your school’s public course catalog.</p>
          <button className="button ghost compact" onClick={resetDemo}>Reset demo data</button>
        </div>

        <Filters courses={courses} filters={filters} onChange={setFilters} />
        <StatCards courses={filteredCourses} />

        <div className="dashboard-layout">
          <div className="main-column">
            <HeatmapGrid
              courses={filteredCourses}
              metric={filters.metric}
              selectedCourseId={selectedCourse.id}
              onSelectCourse={selectCourse}
            />
            <CourseTable courses={filteredCourses} selectedCourseId={selectedCourse.id} onSelectCourse={selectCourse} />
            <InsightsPanel courses={filteredCourses} />
            <ReviewForm selectedCourse={selectedCourse} onSubmit={submitReview} />
          </div>
          <CourseDetail course={selectedCourse} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
