'use strict';

const GeoPoint = require('geopoint');
const GeoLib = require('geolib');
const request = require('request');

module.exports = function checkPolice(coords, rangeKm = 5) {
  let curPos = new GeoPoint(coords.latitude, coords.longitude);
  let curBoundaries = curPos.boundingCoordinates(rangeKm, null, true);

  let query = {
    left: curBoundaries[0].longitude(),
    right: curBoundaries[1].longitude(),
    bottom: curBoundaries[0].latitude(),
    top: curBoundaries[1].latitude(),
    ts: Math.floor(new Date() / 1000)
  };

  let dataURL = 'https://world-georss.waze.com/rtserver/web/GeoRSS';
  dataURL += '?ma=200&mj=100&mu=100&mu=0&types=alerts';
  dataURL += `&left=${query.left}&right=${query.right}&bottom=${query.bottom}&top=${query.top}&_=${query.ts}`;
  
  return new Promise((resolve, reject) => {
    request(dataURL, (err, response, body) => {
      let data;
      try {
        data = JSON.parse(body);
      } catch(e) {
        reject(e);
      }
      if (data && data.alerts) {
        let nearbyPolices = data.alerts.filter((p) =>
          p.type === 'POLICE' && GeoLib.isPointInCircle({
            latitude: p.location.y,
            longitude: p.location.x
          }, coords, rangeKm*1000)
        );
        nearbyPolices = nearbyPolices.map((p) => {
          let police = {
            position: { latitude: p.location.y, longitude: p.location.x },
            city: p.city,
            street: p.street,
            hiding: p.subtype==='POLICE_HIDING'
          };
          police.distance = GeoLib.getDistance(coords, police.position);
          return police;
        });
        resolve(nearbyPolices);
      } else {
        reject('Invalid data');
      }
    });
  });
};
