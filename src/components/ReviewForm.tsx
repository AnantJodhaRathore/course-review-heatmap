import { SendHorizonal } from 'lucide-react';
import { useState } from 'react';
import type { Course, GradeKey, NewReviewForm, Review } from '../types';

type ReviewFormProps = {
  selectedCourse: Course;
  onSubmit: (form: NewReviewForm) => void;
};

const grades: GradeKey[] = ['A', 'B', 'C', 'D', 'F'];
const reviewerTypes: Review['reviewerType'][] = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'];

const defaultForm: NewReviewForm = {
  rating: 5,
  difficulty: 3,
  workloadHours: 6,
  grade: 'A',
  reviewerType: 'Sophomore',
  comment: ''
};

export function ReviewForm({ selectedCourse, onSubmit }: ReviewFormProps) {
  const [form, setForm] = useState<NewReviewForm>(defaultForm);
  const [status, setStatus] = useState('');

  function submitReview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (form.comment.trim().length < 12) {
      setStatus('Please write at least 12 characters so the review is useful.');
      return;
    }
    onSubmit(form);
    setForm(defaultForm);
    setStatus(`Review added for ${selectedCourse.code}.`);
  }

  return (
    <section className="panel card review-form-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Community data</p>
          <h2>Add a review</h2>
          <p>Your review updates this browser demo immediately using localStorage.</p>
        </div>
      </div>

      <form className="review-form" onSubmit={submitReview}>
        <label className="full-width">
          Course
          <input value={`${selectedCourse.code} — ${selectedCourse.title}`} disabled />
        </label>

        <label>
          Rating
          <input
            type="number"
            min="1"
            max="5"
            value={form.rating}
            onChange={(event) => setForm({ ...form, rating: Number(event.target.value) })}
          />
        </label>

        <label>
          Difficulty
          <input
            type="number"
            min="1"
            max="5"
            value={form.difficulty}
            onChange={(event) => setForm({ ...form, difficulty: Number(event.target.value) })}
          />
        </label>

        <label>
          Workload hours
          <input
            type="number"
            min="1"
            max="30"
            value={form.workloadHours}
            onChange={(event) => setForm({ ...form, workloadHours: Number(event.target.value) })}
          />
        </label>

        <label>
          Grade
          <select value={form.grade} onChange={(event) => setForm({ ...form, grade: event.target.value as GradeKey })}>
            {grades.map((grade) => <option key={grade}>{grade}</option>)}
          </select>
        </label>

        <label>
          Student year
          <select
            value={form.reviewerType}
            onChange={(event) => setForm({ ...form, reviewerType: event.target.value as Review['reviewerType'] })}
          >
            {reviewerTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
        </label>

        <label className="full-width">
          Comment
          <textarea
            value={form.comment}
            onChange={(event) => setForm({ ...form, comment: event.target.value })}
            placeholder="What should future students know?"
          />
        </label>

        <button className="button primary" type="submit">
          <SendHorizonal size={18} /> Save review
        </button>
        {status && <p className="form-status">{status}</p>}
      </form>
    </section>
  );
}
