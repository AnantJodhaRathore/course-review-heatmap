import type { Course } from '../types';
import { mockCourses } from '../data/mockCourses';

const STORAGE_KEY = 'course-review-heatmap:courses';

export function loadCourses() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return mockCourses;
    return JSON.parse(saved) as Course[];
  } catch {
    return mockCourses;
  }
}

export function saveCourses(courses: Course[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
}

export function resetSavedCourses() {
  localStorage.removeItem(STORAGE_KEY);
  return mockCourses;
}
