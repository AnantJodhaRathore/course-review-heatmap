import { BadgeCheck, BookMarked, Clock3, GraduationCap, Star } from 'lucide-react';
import type { Course } from '../types';
import { getARate } from '../lib/courseUtils';
import { GradeDistributionChart, ReviewGradeChart } from './GradeCharts';

type CourseDetailProps = {
  course: Course;
};

export function CourseDetail({ course }: CourseDetailProps) {
  return (
    <aside className="course-detail card">
      <div className="course-title-block">
        <p className="eyebrow">Selected course</p>
        <h2>{course.code}</h2>
        <h3>{course.title}</h3>
        <p>{course.professor} • {course.semester} {course.year}</p>
      </div>

      <div className="detail-stats">
        <div><Star size={18} /><span>{course.avgRating}/5 rating</span></div>
        <div><BookMarked size={18} /><span>{course.difficulty}/5 difficulty</span></div>
        <div><Clock3 size={18} /><span>{course.workloadHours} hrs/week</span></div>
        <div><BadgeCheck size={18} /><span>{course.attendanceRequired ? 'Attendance required' : 'Flexible attendance'}</span></div>
        <div><GraduationCap size={18} /><span>{getARate(course)}% A rate</span></div>
      </div>

      <div className="tag-list">
        {course.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>

      <GradeDistributionChart course={course} />
      <ReviewGradeChart reviews={course.reviews} />

      <div id="reviews" className="review-list">
        <h3>Recent reviews</h3>
        {course.reviews.map((review) => (
          <article key={review.id} className="review-card">
            <div>
              <strong>{review.rating}/5</strong>
              <span>{review.reviewerType} • Grade {review.grade} • {review.createdAt}</span>
            </div>
            <p>{review.comment}</p>
          </article>
        ))}
      </div>
    </aside>
  );
}
