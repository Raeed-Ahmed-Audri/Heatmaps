/*
Development Version of the map script that runs in leaflet.html.
Very similar to the website version, but with additional grids and markers for adding rooms.
Input: the div tag's ID as a string,
the array of room names,
the array of coordinate points for rooms,
the array of utilization floats,
the relative string path to the needed grayscale floorplan,
the relative string path to the needed colour floorplan,
and an array of the pixel height and width of the images.
*/
function mapLoader(divName, rooms, roomPoints, utilNums, grayImagePath, colourImagePath, imageSize) {
    //function that sets the colour attribute of the room based on its utilization value.
    //Takes the utilization value as input, and returns the corresponding colour.
    function getColour(value) {
        return value < 0.2 ? 'blue' :
            value < 0.4 ? 'green' :
                value < 0.6 ? 'yellow' :
                    value < 0.8 ? 'orange' :
                        value < 1 ? 'red' :
                            'purple';
    };

    //Choose colours based on utilization
    var colorMap = new Map();
    for (i = 0; i < rooms.length; i++) {
        colorMap.set(rooms[i], getColour(utilNums[i]));
    };
    
    //Loop that construct room outlines based on the input coordinate points, and the colour based on the getColour function.
    var roomShapes = [];
    for (j = 0; j < rooms.length; j++) {
        var room = L.polygon(roomPoints[j], {
            color: colorMap.get(rooms[j]),
            fillColor: colorMap.get(rooms[j]),
            fillOpacity: 0.5
        });
        //Attach a popup when the room is clicked on that shows the room number and its utilization percent.
        room.bindPopup("<b>" + rooms[j] + "</b><br>Utilization: " + (utilNums[j] / 0.01).toFixed(0) + "%");
        roomShapes.push(room);
    };
    
    //Attach a popup when the room is clicked on that shows the room number and its utilization percent.
    var roomLayer = L.layerGroup(roomShapes);
    
    //Create map object in div
    var bounds = [[0, 0], imageSize];
    var map = L.map(divName, {
        crs: L.CRS.Simple,
        minZoom: -2,
        center: [1100, 1700],
        maxBounds: bounds,
        maxBoundsViscosity: 1,
        //Set room data to be on automatically.
        layers: [roomLayer]
    }).setView([0, 0], 0);
    
    //Dictionary of all overlay layers that are toggable.
    var overlayShapes = {
        "Rooms": roomLayer
    };
    
    //Image overlay of the grayscale floorplan.
    var grayMap = L.imageOverlay(grayImagePath, bounds, {
        attribution: "© University of Alberta"
    });
    
    //Image overlay of the colour floorplan.
    var colourMap = L.imageOverlay(colourImagePath, bounds, {
        attribution: "© University of Alberta"
    });
    
    //Add both overlays to a dictionary.
    var mapLayers = {
        "Grayscale": grayMap,
        "Colour": colourMap
    };

    //Set grayscale as inital default map, and focus on it.
    L.imageOverlay(grayImagePath, bounds, {
        attribution: "© University of Alberta"
    }).addTo(map);
    map.fitBounds(bounds);
    
    //Add both the image overlay layers AND the room layers to the map.
    L.control.layers(mapLayers, overlayShapes, {position: "topleft"}).addTo(map);

    //Generate legend and add to map
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function (map) {

        var div = L.DomUtil.create("div", "info legend"),
            grades = [0, 0.2, 0.4, 0.6, 0.8, 1];
        div.innerHTML += "<p>Utilization (%)</p>"
        //Generate legend item for each color region
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColour(grades[i]) + '"></i> ' + 100 * grades[i] + (grades[i + 1] ? '&ndash;' + 100 * grades[i + 1] + '<br>' : '+');
        }
        return div;
    };
    legend.addTo(map);

    //Auto update the map to load the room data correctly.
    setInterval(function () { map.invalidateSize() }, 100);
};

//Special Settings for the slideshow on the website.
$(document).ready(function () {
    $('[data-fancybox]').fancybox({
        clickSlide: false, // disable close on outside click
        touch: false, // disable close on swipe
        clickOutside: false
    });
});
