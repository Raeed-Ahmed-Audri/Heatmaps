function mapLoader(divName, rooms, roomPoints, utilNums, imagePath, imageSize) {
    function getColour(value) {
        return value < 0.2 ? 'blue' :
            value < 0.4 ? 'green' :
                value < 0.6 ? 'yellow' :
                    value < 0.8 ? 'orange' :
                        value < 1 ? 'red' :
                            'purple';
    }
    //Choose colours based on utilization
    var colorMap = new Map();
    for (i = 0; i < rooms.length; i++) {
        colorMap.set(rooms[i], getColour(utilNums[i]))
    }
    //Create map object in div named CME7
    var map = L.map(divName, {
        crs: L.CRS.Simple,
        minZoom: -1.5
    }).setView([0, 0], 0);
    //Set floorplan as the main tile of the map
    var bounds = [[0, 0], imageSize];
    L.imageOverlay(imagePath, bounds).addTo(map);
    map.fitBounds(bounds);
    //load each room overlay
    for (j = 0; j < rooms.length; j++) {
        var room = L.polygon(roomPoints[j], {
            color: colorMap.get(rooms[j]),
            fillColor: colorMap.get(rooms[j]),
            fillOpacity: 0.5
        }).addTo(map);
        room.bindPopup("<b>" + rooms[j] + "</b><br>Utilization: " + (utilNums[j] / 0.01) + "%");
    }
    //Set marker with coordinates when a spot is clicked
    let marker = null;
    map.on('click', (event) => {
        marker = L.marker([event.latlng.lat, event.latlng.lng]).addTo(map);
        marker.bindPopup("Coords (lat/lng): " + event.latlng.lat + ", " + event.latlng.lng);
    })
    //Generate legend and add to map
    var legend = L.control({ position: 'bottomright' });
    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 0.2, 0.4, 0.6, 0.8, 1];

        //Generate legend item for each color region
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColour(grades[i]) + '"></i> ' + 100 * grades[i] + (grades[i + 1] ? '&ndash;' + 100 * grades[i + 1] + '%<br>' : '+%');
        }
        return div;
    };
    legend.addTo(map);
}