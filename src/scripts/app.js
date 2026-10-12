import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/styles.scss';

const mapElement = document.getElementById('map');

const map = L.map(mapElement, {
  zoomControl: false,
}).setView([41.4901, -71.3128], 15);

L.tileLayer(
  'https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png?key=cb1_4hog_1_14dad7fc437a81fde1b23a40',
  {
    attribution: '© OpenStreetMap © CARTO',
    subdomains: 'abcd',
    maxZoom: 20,
  },
).addTo(map);

// ---------- 3. Иконки POI ----------
const ICONS = {
  museum: '<path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"/>',
  church: '<path d="M12 2v6M9 5h6M5 21V11l7-5 7 5v10M9 21v-4h6v4"/>',
  cafe: '<path d="M3 8h14a3 3 0 0 1 0 6h-1M3 8v8a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V8M6 2v3M10 2v3"/>',
  bar: '<path d="M5 3h14l-7 9v7M9 21h6M5 3l7 9 7-9"/>',
  park: '<path d="M12 2v20M6 12l6-6 6 6M8 8l4-4 4 4"/>',
  hotel: '<path d="M3 20V8l9-5 9 5v12M3 20h18M9 20v-6h6v6"/>',
  home: '<path d="M3 11l9-8 9 8M5 10v10h14V10"/>',
  star: '<polygon points="12 2 15 9 22 9 17 14 19 22 12 18 5 22 7 14 2 9 9 9"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v5h1"/>',
};

/** Фабрика круглых тёмных маркеров с белой SVG-пиктограммой внутри */
const poiIcon = (svgPath) =>
  L.divIcon({
    className: 'poi-marker',
    html: `
      <div class="poi-marker__bubble">
        <svg width="14" height="14" viewBox="0 0 24 24"
             fill="none" stroke="white" stroke-width="2.2"
             stroke-linecap="round" stroke-linejoin="round">
          ${svgPath}
        </svg>
      </div>
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 13], // центр круга — на координате
    popupAnchor: [0, -14],
    tooltipAnchor: [0, -14],
  });

// ---------- 4. Главный маркер (чёрный пин с оранжевым кругом) ----------
const mainPin = L.divIcon({
  className: 'custom-pin',
  html: `
    <svg width="66" height="88" viewBox="0 0 66 88"
         xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fill-rule="evenodd">
        <path d="M0 56V0h66v56H45L33 88 21 56H0Z" fill="#151515"/>
        <circle fill="#D5966C" cx="33" cy="28" r="12"/>
      </g>
    </svg>
  `,
  iconSize: [66, 88],
  iconAnchor: [33, 88], // ✅ остриё пина (низ, центр), а не [22, 56]
  popupAnchor: [0, -88],
});

L.marker([41.4901, -71.3128], { icon: mainPin })
  .addTo(map)
  .bindPopup('<b>International Tennis Hall of Fame</b>');

// ---------- 5. Остальные метки ----------
const places = [
  { coords: [41.4933, -71.3128], icon: ICONS.museum, name: 'Newport Art Museum' },
  { coords: [41.4923, -71.315], icon: ICONS.church, name: "St. Mary's Roman Catholic Church" },
  { coords: [41.4877, -71.318], icon: ICONS.bar, name: "O'Brien's Pub" },
  { coords: [41.4868, -71.317], icon: ICONS.park, name: 'King Park Beach' },
];

places.forEach(({ coords, icon, name }) => {
  L.marker(coords, { icon: poiIcon(icon) })
    .addTo(map)
    .bindPopup(`<b>${name}</b>`)
    .bindTooltip(name, { direction: 'top', offset: [0, -14] });
});
