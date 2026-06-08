'use client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

const miles =  [0, 2, 4, 6, 8, 10, 11.5, 13.1];
const elevations = [4490, 4495, 4510, 4530, 4555, 4580, 4610, 4630];

export function ElevationChart() {
  return (
    <div>
      <div className="rounded-card border border-line bg-paper p-6">
        <Line
          data={{
            labels: miles.map((m) => `Mile ${m}`),
            datasets: [
              {
                data: elevations,
                borderColor: '#F0307A',
                borderWidth: 2.5,
                pointBackgroundColor: '#F0307A',
                pointRadius: 4,
                fill: true,
                backgroundColor: (ctx: { chart: ChartJS }) => {
                  const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200);
                  gradient.addColorStop(0, 'rgba(253,231,240,0.7)');
                  gradient.addColorStop(1, 'rgba(253,231,240,0)');
                  return gradient;
                },
                tension: 0.4,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (ctx) => `${(ctx.parsed.y ?? 0).toLocaleString()} ft`,
                },
              },
            },
            scales: {
              x: {
                grid: { color: '#ECE2E6' },
                ticks: { font: { family: 'Saira, sans-serif', size: 11 }, color: '#6E5C64' },
              },
              y: {
                min: 4480,
                max: 4700,
                grid: { color: '#ECE2E6' },
                ticks: {
                  font: { family: 'Saira, sans-serif', size: 11 },
                  color: '#6E5C64',
                  callback: (v) => `${v} ft`,
                },
              },
            },
          }}
        />
      </div>
      <p className="mt-3 text-center font-body text-sm text-ash">
        Net gain: ~140 ft over 13.1 miles — one of the flattest half marathon courses in Utah
      </p>
    </div>
  );
}
