'use client';
import { useEffect, useRef } from 'react';

const ROUTE: [number, number][] = [
  [40.2381, -111.7353], [40.2395, -111.7200], [40.2430, -111.7050],
  [40.2465, -111.6900], [40.2490, -111.6780], [40.2510, -111.6680],
  [40.2530, -111.6580], [40.2560, -111.6490], [40.2580, -111.6430],
  [40.2560, -111.6350], [40.2580, -111.6300], [40.2600, -111.6350],
  [40.2630, -111.6430], [40.2580, -111.6500], [40.2580, -111.6553],
];

const MILE_MARKERS: { pos: [number, number]; label: string }[] = [
  { pos: [40.2445, -111.6960], label: 'Mile 3' },
  { pos: [40.2520, -111.6640], label: 'Mile 6' },
  { pos: [40.2575, -111.6380], label: 'Mile 9' },
  { pos: [40.2590, -111.6420], label: 'Mile 11' },
];

export function CourseMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (instanceRef.current || !mapRef.current) return;

    import('leaflet').then((L) => {
      // Leaflet default icon fix for bundlers
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(mapRef.current!).setView([40.257, -111.695], 13);
      instanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      // Route polyline
      L.polyline(ROUTE, { color: '#F0307A', weight: 4, opacity: 0.9 }).addTo(map);

      // Start marker — green
      const startIcon = L.divIcon({
        html: `<div style="background:#16a34a;color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:13px;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)">S</div>`,
        className: '',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });
      L.marker(ROUTE[0], { icon: startIcon })
        .addTo(map)
        .bindPopup('<b>START</b><br>Utah Lake State Park<br>8:00 AM');

      // Finish marker — checkered
      const finishIcon = L.divIcon({
        html: `<div style="background:#1C1719;color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:15px;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)">🏁</div>`,
        className: '',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });
      L.marker(ROUTE[ROUTE.length - 1], { icon: finishIcon })
        .addTo(map)
        .bindPopup('<b>FINISH</b><br>BYU Campus — LaVell Edwards Stadium');

      // Mile markers — small pink dots
      MILE_MARKERS.forEach(({ pos, label }) => {
        const icon = L.divIcon({
          html: `<div style="background:#F0307A;border-radius:50%;width:14px;height:14px;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.25)"></div>`,
          className: '',
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });
        L.marker(pos, { icon }).addTo(map).bindPopup(label);
      });
    });

    // Load Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    return () => {
      if (instanceRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (instanceRef.current as any).remove();
        instanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full rounded-card border border-line overflow-hidden"
      style={{ height: 'clamp(320px, 40vw, 480px)' }}
    />
  );
}
