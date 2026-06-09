'use client';
import { useEffect, useRef } from 'react';

// 10K course: N Canyon Road → University Avenue → Center Street, Provo, UT
// Start: ~40.2795, -111.6375 (N Canyon Rd near Canyon Crest Elementary)
// Finish: ~40.2338, -111.6582 (University Ave & Center St, downtown Provo)
// Net drop: ~284 ft; only one turn on the entire course
const route: [number, number][] = [
  [40.2795, -111.6375], // Start: N Canyon Rd
  [40.2786, -111.6390],
  [40.2775, -111.6410],
  [40.2763, -111.6432],
  [40.2750, -111.6455], // Turn onto University Ave (US-189)
  [40.2737, -111.6473],
  [40.2722, -111.6490],
  [40.2708, -111.6503],
  [40.2693, -111.6514],
  [40.2678, -111.6522],
  [40.2662, -111.6529],
  [40.2647, -111.6534],
  [40.2631, -111.6540],
  [40.2615, -111.6546],
  [40.2599, -111.6551],
  [40.2583, -111.6555],
  [40.2567, -111.6558],
  [40.2551, -111.6561],
  [40.2535, -111.6563],
  [40.2519, -111.6565],
  [40.2503, -111.6567],
  [40.2487, -111.6568],
  [40.2471, -111.6570],
  [40.2455, -111.6572],
  [40.2439, -111.6574],
  [40.2423, -111.6576],
  [40.2407, -111.6578],
  [40.2391, -111.6579],
  [40.2375, -111.6580],
  [40.2358, -111.6581],
  [40.2345, -111.6582],
  [40.2338, -111.6582], // Finish: University Ave & Center St
];

export function CourseMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current || !mapRef.current) return;
    initializedRef.current = true;

    const midLat = (route[0][0] + route[route.length - 1][0]) / 2;
    const midLng = (route[0][1] + route[route.length - 1][1]) / 2;

    import('leaflet').then((L) => {
      if (!mapRef.current) return;
      import('leaflet/dist/leaflet.css');

      const map = L.map(mapRef.current, {
        center: [midLat, midLng],
        zoom: 13,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      L.polyline(route, { color: '#F0307A', weight: 4, opacity: 0.9 }).addTo(map);

      const startIcon = L.divIcon({
        html: '<div style="background:#16A34A;color:#fff;font-weight:700;font-size:11px;padding:3px 7px;border-radius:999px;white-space:nowrap;font-family:sans-serif;box-shadow:0 1px 4px rgba(0,0,0,0.3)">START</div>',
        className: '',
        iconAnchor: [24, 14],
      });
      L.marker(route[0], { icon: startIcon })
        .addTo(map)
        .bindPopup('<b>10K START</b><br>N Canyon Road, Provo<br>7:00 AM');

      const finishIcon = L.divIcon({
        html: '<div style="background:#F0307A;color:#fff;font-weight:700;font-size:11px;padding:3px 7px;border-radius:999px;white-space:nowrap;font-family:sans-serif;box-shadow:0 1px 4px rgba(0,0,0,0.3)">FINISH</div>',
        className: '',
        iconAnchor: [28, 14],
      });
      L.marker(route[route.length - 1], { icon: finishIcon })
        .addTo(map)
        .bindPopup('<b>FINISH</b><br>University Ave & Center St<br>Downtown Provo');
    });
  }, []);

  return (
    <div
      ref={mapRef}
      className="h-96 w-full rounded-card border border-line"
      aria-label="10K course map: N Canyon Road to University Ave and Center St, Provo"
    />
  );
}
