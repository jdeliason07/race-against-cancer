'use client';
import dynamic from 'next/dynamic';

const CourseMap = dynamic(
  () => import('./CourseMap').then((m) => m.CourseMap),
  { ssr: false, loading: () => <div className="h-80 rounded-card border border-line bg-mist animate-pulse" /> }
);

const ElevationChart = dynamic(
  () => import('./ElevationChart').then((m) => m.ElevationChart),
  { ssr: false, loading: () => <div className="h-48 rounded-card border border-line bg-mist animate-pulse" /> }
);

export function CourseMapSection() {
  return <CourseMap />;
}

export function ElevationChartSection() {
  return <ElevationChart />;
}
