# Course Review Heatmap

## Version 2 experience

The interface now includes five responsive screens:

- **Overview** — editorial landing dashboard with live catalog highlights and student favorites.
- **Explore** — searchable heatmap, filters, rankings, course detail, charts, and generated insights.
- **Compare** — side-by-side comparison for up to three courses.
- **Saved** — a persistent shortlist stored locally in the browser.
- **Review** — a focused review-writing flow with course selection and instant metric updates.

Saved and comparison selections persist across browser sessions using localStorage. The navigation, empty states, mobile menu, responsive layouts, and visual system have also been refreshed.

A complete GitHub portfolio project for visualizing professor ratings, grade distributions, workload, attendance requirements, and semester-level course feedback.

## Why this project is strong

- Recruiter-friendly dashboard UI with screenshots-ready sections.
- Heatmap visualization for workload, difficulty, A-rate, ratings, and attendance.
- Course table with professor comparison.
- Chart.js graphs for grade distributions and review grades.
- Add-review flow using localStorage, so the demo works without a backend.
- Supabase-ready schema for upgrading to a real database.

## Tech stack

- React + TypeScript
- Vite
- Chart.js + react-chartjs-2
- Supabase-ready database layer
- CSS responsive dashboard styling

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal, usually:

```bash
http://localhost:5173
```

## Validate and build

```bash
npm run validate
npm run build
```

## Optional Supabase setup

The app runs with sample data by default. To connect Supabase:

1. Create a Supabase project.
2. Open the SQL editor and run `supabase/schema.sql`.
3. Copy `.env.example` to `.env`.
4. Fill in:

```bash
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

The included app is local-first; the Supabase file and schema are ready for you to extend with real reads/writes.

## Suggested GitHub repo structure

```txt
course-review-heatmap/
  public/
  scripts/
  src/
    components/
    data/
    lib/
    styles/
  supabase/
  .env.example
  package.json
  README.md
```

## Portfolio upgrades

- Add auth for verified student reviews.
- Add department pages like `/departments/computer-science`.
- Add CSV import for public grade distribution datasets.
- Add Supabase row-level security policies for review creation.
- Add screenshots to this README after running the app.
