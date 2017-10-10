const tj = require('@mapbox/togeojson');
const fs = require('fs');
const DOMParser = require('xmldom').DOMParser;

const config = require('./../config');

function insidePolygon(x, y, coordinates) {
  const n = coordinates.length;
  let inside = false;
  let p1x = coordinates[0][0];
  let p1y = coordinates[0][1];

  for (let i = 1; i < n; i += 1) {
    const p2x = coordinates[i % n][0];
    const p2y = coordinates[i % n][1];

    if (y > Math.min(p1y, p2y)) {
      if (y <= Math.max(p1y, p2y)) {
        if (x <= Math.max(p1x, p2x)) {
          let xinters = null;
          if (p1y !== p2y) {
            xinters = (y - p1y) * (p2x - p1x) / (p2y - p1y) + p1x;
          }
          if (p1x === p2x || x < xinters) {
            inside = !inside;
          }
        }
      }
    }
    p1x = p2x;
    p1y = p2y;
  }
  return inside;
}

module.exports = {
  inSubarea: (wsg) => {
    const kml = new DOMParser().parseFromString(fs.readFileSync(`maps/${config.map.filename}`, 'utf8'));

    const geoJson = tj.kml(kml);

    // eslint-disable-next-line no-restricted-syntax,guard-for-in
    for (const feature in geoJson.features) {
      if (geoJson.features[feature].geometry.type === 'Polygon') {
        if (insidePolygon(wsg[1], wsg[0], geoJson.features[feature].geometry.coordinates[0])) {
          return geoJson.features[feature].properties.name;
        }
      }
    }
    return null;
  },
};
