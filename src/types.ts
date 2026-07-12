export type GradeKey = 'A' | 'B' | 'C' | 'D' | 'F';

export type GradeDistribution = Record<GradeKey, number>;

export type Review = {
  id: string;
  courseId: string;
  rating: number;
  difficulty: number;
  workloadHours: number;
  grade: GradeKey;
  comment: string;
  reviewerType: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | 'Graduate';
  createdAt: string;
};

export type Course = {
  id: string;
  code: string;
  title: string;
  department: string;
  professor: string;
  semester: 'Fall' | 'Spring' | 'Summer' | 'Winter';
  year: number;
  enrollment: number;
  avgRating: number;
  difficulty: number;
  workloadHours: number;
  attendanceRequired: boolean;
  gradeDistribution: GradeDistribution;
  tags: string[];
  reviews: Review[];
};

export type MetricKey = 'avgRating' | 'difficulty' | 'workloadHours' | 'aRate' | 'attendanceRequired';

export type FiltersState = {
  search: string;
  department: string;
  professor: string;
  semester: string;
  metric: MetricKey;
};

export type NewReviewForm = {
  rating: number;
  difficulty: number;
  workloadHours: number;
  grade: GradeKey;
  reviewerType: Review['reviewerType'];
  comment: string;
};
