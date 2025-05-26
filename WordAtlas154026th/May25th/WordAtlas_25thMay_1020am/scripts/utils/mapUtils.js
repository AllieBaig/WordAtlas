

// File: scripts/utils/mapUtils.js
// Features:
// - Generates static map HTML with customizable zoom/radius
// - Uses OpenStreetMap or Google Static Maps (switchable)
// - Used by nearby.js to show user location
//
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

const DEFAULT_RADIUS = 5000; // meters

/**
 * Load a basic map iframe using OpenStreetMap or Google Maps Static API.
 * @param {number} lat 
 * @param {number} lng 
 * @param {number} radius 
 * @returns {string} HTML string
 */
export function loadStaticMap(lat, lng, radius = DEFAULT_RADIUS) {
  const zoom = getZoomLevel(radius);

  // OpenStreetMap Embed (free)
  const osm = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.05},${lat - 0.05},${lng + 0.05},${lat + 0.05}&layer=mapnik&marker=${lat},${lng}`;

  // Optional: switch to Google Maps Static API
  // const google = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=400x300&markers=color:red|${lat},${lng}&key=YOUR_API_KEY`;

  return `
    <iframe width="100%" height="250" frameborder="0" scrolling="no"
      src="${osm}" style="border:1px solid #ccc; border-radius:8px;"></iframe>
  `;
}

/**
 * Convert radius (meters) to approximate zoom level
 * @param {number} radius 
 * @returns {number} zoom level
 */
function getZoomLevel(radius) {
  if (radius <= 500) return 16;
  if (radius <= 1000) return 15;
  if (radius <= 2000) return 14;
  if (radius <= 3000) return 13;
  if (radius <= 5000) return 12;
  if (radius <= 10000) return 11;
  return 10;
}

