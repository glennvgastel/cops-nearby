# cops-nearby
Tells if there's nearby police reported in Waze by given coordinates and range

Installation
------------
```bash
npm install cops-nearby
```

Usage
-----
```javascript
CopsNearby({ 
   latitude: [latitude coords], 
   longitude: [longitude coords] 
}, [rangeInKilometers]).then((data) => {
   console.log(data);
});
```

Example
-----
![Runkit Example](https://screenshots.firefoxusercontent.com/images/ab4293f5-9ef5-4405-8a44-6178309d1f7c.png)
```javascript
const CopsNearby = require('cops-nearby');
CopsNearby({ 
   latitude: 59.447186, 
   longitude: 24.7283923 
}, 15).then(console.log);
/*
[ { position: { latitude: 59.438113, longitude: 24.734423 },
    city: 'Tallinn',
    street: undefined,
    hiding: true,
    distance: 1067 },
  { position: { latitude: 59.370579, longitude: 24.752914 },
    city: 'Tallinn',
    street: 'Viljandi mnt',
    hiding: false,
    distance: 8647 },
  { position: { latitude: 59.371448, longitude: 24.752015 },
    city: 'Tallinn',
    street: 'Viljandi mnt',
    hiding: true,
    distance: 8543 },
  { position: { latitude: 59.354042, longitude: 24.630137 },
    city: 'Tallinn',
    street: 'Pärnu mnt',
    hiding: false,
    distance: 11782 },
  { position: { latitude: 59.370887, longitude: 24.659554 },
    city: 'Tallinn',
    street: 'Vabaduse pst',
    hiding: true,
    distance: 9356 },
  { position: { latitude: 59.370152, longitude: 24.657403 },
    city: 'Tallinn',
    street: 'Vabaduse pst',
    hiding: true,
    distance: 9482 },
  { position: { latitude: 59.351997, longitude: 24.628479 },
    city: 'Tallinn',
    street: 'Pärnu mnt',
    hiding: false,
    distance: 12028 },
  { position: { latitude: 59.429415, longitude: 24.684302 },
    city: 'Tallinn',
    street: 'Paldiski mnt',
    hiding: false,
    distance: 3190 },
  { position: { latitude: 59.371574, longitude: 24.661332 },
    city: 'Tallinn',
    street: 'Vabaduse pst',
    hiding: true,
    distance: 9244 } ]
*/
```
