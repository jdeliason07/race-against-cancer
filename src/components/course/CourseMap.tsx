'use client';
import { useEffect, useRef } from 'react';

// 10K course — identical to the Utah Valley 10K route.
// Start in front of Canyon Crest Elementary (4664 N Canyon Rd), run north on
// Canyon Road to the mouth of Provo Canyon, take the single left turn onto
// University Ave (US-189), and follow it straight south to Center St.
// Geometry traced from OpenStreetMap road centerlines.
// Net drop: ~285 ft (4,852 ft → 4,567 ft); only one turn on the entire course.
const route: [number, number][] = [
  [40.2959, -111.6534], // Start: N Canyon Rd at Canyon Crest Elementary
  [40.2959, -111.6535],
  [40.2966, -111.6536],
  [40.2969, -111.6537],
  [40.2979, -111.6538],
  [40.2989, -111.6540],
  [40.2997, -111.6541],
  [40.3002, -111.6542],
  [40.3011, -111.6543],
  [40.3015, -111.6544],
  [40.3021, -111.6544],
  [40.3029, -111.6545],
  [40.3034, -111.6546],
  [40.3041, -111.6547],
  [40.3049, -111.6547],
  [40.3056, -111.6547],
  [40.3065, -111.6548],
  [40.3075, -111.6549],
  [40.3076, -111.6549],
  [40.3077, -111.6550],
  [40.3077, -111.6551], // Turn onto University Ave (US-189) at the mouth of Provo Canyon
  [40.3069, -111.6552],
  [40.3030, -111.6558],
  [40.2997, -111.6565],
  [40.2961, -111.6573],
  [40.2911, -111.6583],
  [40.2877, -111.6586],
  [40.2839, -111.6586],
  [40.2793, -111.6579],
  [40.2758, -111.6575],
  [40.2720, -111.6571],
  [40.2685, -111.6572],
  [40.2649, -111.6582], // Fun Run joins here — LaVell Edwards Stadium area (~2 mi to finish)
  [40.2611, -111.6586],
  [40.2576, -111.6586],
  [40.2539, -111.6586],
  [40.2505, -111.6586],
  [40.2466, -111.6586],
  [40.2432, -111.6587],
  [40.2394, -111.6587],
  [40.2362, -111.6587],
  [40.2338, -111.6585], // Finish: University Ave & Center St
];

// Fun Run: shares the last ~2 miles of the 10K route.
// Starts at LaVell Edwards Stadium on the BYU campus, follows University Ave south.
const funRunRoute: [number, number][] = route.slice(32); // starts at index 32 (40.2649)

export function CourseMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current || !mapRef.current) return;
    initializedRef.current = true;

    import('leaflet').then((L) => {
      if (!mapRef.current) return;
      import('leaflet/dist/leaflet.css');

      const map = L.map(mapRef.current, {
        scrollWheelZoom: false,
      });
      map.fitBounds(L.latLngBounds(route), { padding: [30, 30] });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // 10K route — pink
      L.polyline(route, { color: '#F0307A', weight: 4, opacity: 0.9 }).addTo(map);

      // Fun Run route — blue, drawn on top so the overlap is visible as blue
      L.polyline(funRunRoute, { color: '#2563EB', weight: 4, opacity: 0.9 }).addTo(map);

      // 10K start marker
      const startIcon10K = L.divIcon({
        html: '<div style="background:#16A34A;color:#fff;font-weight:700;font-size:11px;padding:3px 7px;border-radius:999px;white-space:nowrap;font-family:sans-serif;box-shadow:0 1px 4px rgba(0,0,0,0.3)">10K START</div>',
        className: '',
        iconAnchor: [36, 14],
      });
      L.marker(route[0], { icon: startIcon10K })
        .addTo(map)
        .bindPopup('<b>10K START</b><br>N Canyon Rd at Canyon Crest Elementary<br>8:00 AM');

      // Fun Run start marker
      const startIconFunRun = L.divIcon({
        html: '<div style="background:#2563EB;color:#fff;font-weight:700;font-size:11px;padding:3px 7px;border-radius:999px;white-space:nowrap;font-family:sans-serif;box-shadow:0 1px 4px rgba(0,0,0,0.3)">FUN RUN START</div>',
        className: '',
        iconAnchor: [52, 14],
      });
      L.marker(funRunRoute[0], { icon: startIconFunRun })
        .addTo(map)
        .bindPopup('<b>FUN RUN START</b><br>LaVell Edwards Stadium, BYU<br>8:00 AM · ~2 miles');

      // Shared finish marker
      const finishIcon = L.divIcon({
        html: '<div style="background:#F0307A;color:#fff;font-weight:700;font-size:11px;padding:3px 7px;border-radius:999px;white-space:nowrap;font-family:sans-serif;box-shadow:0 1px 4px rgba(0,0,0,0.3)">FINISH</div>',
        className: '',
        iconAnchor: [28, 14],
      });
      L.marker(route[route.length - 1], { icon: finishIcon })
        .addTo(map)
        .bindPopup('<b>FINISH</b><br>University Ave & Center St<br>Downtown Provo<br><em>Shared finish — 10K & Fun Run</em>');
    });
  }, []);

  return (
    <div
      ref={mapRef}
      className="h-96 w-full rounded-card border border-line"
      aria-label="Course map: pink line shows the full 10K route from Canyon Crest Elementary to downtown Provo; blue line shows the Fun Run route from LaVell Edwards Stadium to the same finish"
    />
  );
}
