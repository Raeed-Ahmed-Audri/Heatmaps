function mapLoader(divName, rooms, roomPoints, utilNums, imagePath, imageSize) {
    var colors = ["blue", "green", "yellow", "orange", "red"];
//Choose colours based on utilization
var colorMap = new Map();
for (i = 0; i < rooms.length; i++) {
    if (utilNums[i] >= 0.8) {
        colorMap.set(rooms[i], colors[4]);
    } else if (utilNums[i] < 0.8 && utilNums[i] >= 0.6) {
        colorMap.set(rooms[i], colors[3]);
    } else if (utilNums[i] < 0.6 && utilNums[i] >= 0.4) {
        colorMap.set(rooms[i], colors[2]);
    } else if (utilNums[i] < 0.4 && utilNums[i] >= 0.2) {
        colorMap.set(rooms[i], colors[1]);
    } else {
        colorMap.set(rooms[i], colors[0]);
    }
}
//Create map object in div named CME7
var map = L.map(divName, {
    crs: L.CRS.Simple,
    minZoom: -1.5
}).setView([0, 0], 0);
//Set floorplan as the main tile of the map
var bounds = [[0, 0], imageSize];
var image = L.imageOverlay(imagePath, bounds).addTo(map);
map.fitBounds(bounds);
//load each room overlay
for (j = 0; j < rooms.length; j++) {
    var room = L.polygon(roomPoints[j], {
        color: colorMap.get(rooms[j]),
        fillColor: colorMap.get(rooms[j]),
        fillOpacity: 0.5
    }).addTo(map);
    room.bindPopup("<b>" + rooms[j] + "</b><br>Utilization: " + (100 * utilNums[j]) + "%");
}
//Set marker with coordinates when a spot is clicked
let marker = null;
map.on('click', (event) => {
    marker = L.marker([event.latlng.lat, event.latlng.lng]).addTo(map);
    marker.bindPopup("Coords (lat/lng): " + event.latlng.lat + ", " + event.latlng.lng);
})
}