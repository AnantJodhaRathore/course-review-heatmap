import type { Course, FiltersState, GradeDistribution, MetricKey, NewReviewForm, Review } from '../types';

export const metricLabels: Record<MetricKey, string> = {
  avgRating: 'Student rating',
  difficulty: 'Difficulty',
  workloadHours: 'Weekly workload',
  aRate: 'A grade rate',
  attendanceRequired: 'Attendance required'
};

export const metricDescriptions: Record<MetricKey, string> = {
  avgRating: 'Higher is better. Based on student reviews.',
  difficulty: 'Higher means harder. Rated from 1 to 5.',
  workloadHours: 'Estimated study hours per week outside class.',
  aRate: 'Percent of students receiving an A.',
  attendanceRequired: 'Shows whether attendance is required.'
};

export function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

export function getARate(course: Course) {
  return course.gradeDistribution.A;
}

export function getMetricValue(course: Course, metric: MetricKey) {
  if (metric === 'aRate') return getARate(course);
  if (metric === 'attendanceRequired') return course.attendanceRequired ? 1 : 0;
  return course[metric];
}

export function formatMetricValue(course: Course, metric: MetricKey) {
  const value = getMetricValue(course, metric);
  if (metric === 'avgRating' || metric === 'difficulty') return `${Number(value).toFixed(1)}/5`;
  if (metric === 'workloadHours') return `${value} hrs/wk`;
  if (metric === 'aRate') return `${value}% A`;
  return course.attendanceRequired ? 'Required' : 'Flexible';
}

export function getHeatColorClass(course: Course, metric: MetricKey) {
  const value = getMetricValue(course, metric);

  if (metric === 'attendanceRequired') {
    return value === 1 ? 'heat hot' : 'heat cool';
  }

  if (metric === 'avgRating') {
    if (value >= 4.6) return 'heat excellent';
    if (value >= 4.1) return 'heat good';
    if (value >= 3.6) return 'heat mid';
    return 'heat hot';
  }

  if (metric === 'difficulty') {
    if (value >= 4.2) return 'heat hot';
    if (value >= 3.4) return 'heat warm';
    if (value >= 2.6) return 'heat mid';
    return 'heat cool';
  }

  if (metric === 'workloadHours') {
    if (value >= 12) return 'heat hot';
    if (value >= 9) return 'heat warm';
    if (value >= 6) return 'heat mid';
    return 'heat cool';
  }

  if (value >= 50) return 'heat excellent';
  if (value >= 40) return 'heat good';
  if (value >= 30) return 'heat mid';
  return 'heat hot';
}

export function filterCourses(courses: Course[], filters: FiltersState) {
  const searchTerm = filters.search.trim().toLowerCase();

  return courses.filter((course) => {
    const matchesSearch =
      !searchTerm ||
      [course.code, course.title, course.department, course.professor, course.semester, ...course.tags]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm);

    const matchesDepartment = filters.department === 'All' || course.department === filters.department;
    const matchesProfessor = filters.professor === 'All' || course.professor === filters.professor;
    const matchesSemester = filters.semester === 'All' || `${course.semester} ${course.year}` === filters.semester;

    return matchesSearch && matchesDepartment && matchesProfessor && matchesSemester;
  });
}

export function gradeDistributionToRows(distribution: GradeDistribution) {
  return Object.entries(distribution).map(([grade, percentage]) => ({ grade, percentage }));
}

export function addReviewToCourse(course: Course, form: NewReviewForm): Course {
  const newReview: Review = {
    id: `review-${crypto.randomUUID()}`,
    courseId: course.id,
    rating: form.rating,
    difficulty: form.difficulty,
    workloadHours: form.workloadHours,
    grade: form.grade,
    reviewerType: form.reviewerType,
    comment: form.comment.trim(),
    createdAt: new Date().toISOString().slice(0, 10)
  };

  const reviews = [newReview, ...course.reviews];
  const avgRating = roundOne(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length);
  const difficulty = roundOne(reviews.reduce((sum, review) => sum + review.difficulty, 0) / reviews.length);
  const workloadHours = Math.round(reviews.reduce((sum, review) => sum + review.workloadHours, 0) / reviews.length);
  const gradeDistribution = recalculateGradeDistribution(course.gradeDistribution, form.grade, course.reviews.length + course.enrollment);

  return {
    ...course,
    reviews,
    avgRating,
    difficulty,
    workloadHours,
    gradeDistribution
  };
}

function recalculateGradeDistribution(current: GradeDistribution, newGrade: keyof GradeDistribution, estimatedTotal: number): GradeDistribution {
  const currentCounts = Object.fromEntries(
    Object.entries(current).map(([grade, percentage]) => [grade, Math.round((percentage / 100) * estimatedTotal)])
  ) as GradeDistribution;

  currentCounts[newGrade] += 1;
  const total = Object.values(currentCounts).reduce((sum, value) => sum + value, 0);
  const raw = Object.entries(currentCounts).map(([grade, count]) => [grade, Math.round((count / total) * 100)] as const);
  const normalized = Object.fromEntries(raw) as GradeDistribution;
  const diff = 100 - Object.values(normalized).reduce((sum, value) => sum + value, 0);
  normalized.A += diff;
  return normalized;
}

function roundOne(value: number) {
  return Math.round(value * 10) / 10;
}

export function getDashboardStats(courses: Course[]) {
  const courseCount = courses.length;
  const avgRating = courseCount ? roundOne(courses.reduce((sum, course) => sum + course.avgRating, 0) / courseCount) : 0;
  const avgWorkload = courseCount ? Math.round(courses.reduce((sum, course) => sum + course.workloadHours, 0) / courseCount) : 0;
  const attendanceRate = courseCount
    ? Math.round((courses.filter((course) => course.attendanceRequired).length / courseCount) * 100)
    : 0;
  const avgARate = courseCount ? Math.round(courses.reduce((sum, course) => sum + getARate(course), 0) / courseCount) : 0;

  return {
    courseCount,
    avgRating,
    avgWorkload,
    attendanceRate,
    avgARate
  };
}
