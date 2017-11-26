import { scaleOrdinal, scaleLinear, scaleBand, scaleTime } from 'd3-scale';
import { max, min } from 'd3-array';
import { values } from 'lodash';

const scales = (data, band = false) => {

  const rows = values(data.rows);
  let scaleX;

  if (band) {
    const domain = rows.map(row => row[data.axis.x]);
    scaleX = scaleBand()
      .domain(domain)
      .range([10, 500])
      .padding(0.1);
  } else if (data.header[data.axis.x].replace(/\(.*?\)/, '') === 'Date') {
    scaleX = scaleTime().domain([rows[0][data.axis.x], rows[rows.length - 1][data.axis.x]]).range([10, 500]);
  } else if (data.header[data.axis.x] !== 'Numerical') {
    const ordinalRange = [];
    for (let i = 10; i <= 480; i += (470 / (rows.length - 1))) {
      ordinalRange.push(i);
    }
    scaleX = scaleOrdinal().range(ordinalRange);
  } else {
    const maxx = max(rows.map(d => d[data.axis.x]));
    const minx = min(rows.map(d => d[data.axis.x]));
    scaleX = scaleLinear().domain([minx, maxx]).range([10, 500]);
  }

  let biggestMax;
  let lowestMin;

  data.axis.y.forEach((columName) => {
    const maxy = max(rows.map(d => d[columName]));
    if (!biggestMax || maxy > biggestMax) {
      biggestMax = maxy;
    }
    const miny = min(rows.map(d => d[columName]));
    if (!lowestMin || miny < lowestMin) {
      lowestMin = miny;
    }
  });

  const scaleY = scaleLinear().domain([lowestMin, biggestMax]).range([190, 10]);

  return [scaleX, scaleY];
};

export default scales;
