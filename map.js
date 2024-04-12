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
    }
    //Function that builds grid layers based on the width between each lines (making them more or less dense)
    //Takes the image size as input (2 element array) and an integer width
    //Outputs a grid layer that contains the set of all constructed lines in an array.
    function addGrid(imageSize, width) {
        var linePointsX = [];
        var linePointsY = [];
        //Create a list of coordinate points for the lines that increase by the input number specified (width)
        for (k = 0; k < imageSize[1]; k++) {
            //If the loop iteration is smaller than the image height, add to the Y data.
            //Image is wider than it is tall, so more x points than y points
            if (k < imageSize[0]) {
                var pointX = width * k;
                var pointY = width * k;
                linePointsY.push(pointY);
            } else {
                var pointX = width * k;
            }
            linePointsX.push(pointX);
        };
        var lines = [];
        //Loop that constructs and logs each line, again ensuring there are fewer horizontal lines than vertical lines.
        for (l = 0; l < linePointsX.length; l++) {
            if (l < linePointsY.length) {
                var spacerX = linePointsX[l];
                var spacerY = linePointsY[l];
                var gridLineX = L.polyline([[0, spacerX], [imageSize[0], spacerX]], { color: "black" })
                var gridLineY = L.polyline([[spacerY, 0], [spacerY, imageSize[1]]], { color: "black" })
                lines.push(gridLineY);
            } else {
                var spacerX = linePointsX[l];
                var gridLineX = L.polyline([[0, spacerX], [imageSize[0], spacerX]], { color: "black" })
            }
            lines.push(gridLineX);
        }
        //Add these lines to a layerGroup for the map
        var gridLayer = L.layerGroup(lines);
        return gridLayer;
    }
    //Choose colours based on utilization
    var colorMap = new Map();
    for (i = 0; i < rooms.length; i++) {
        colorMap.set(rooms[i], getColour(utilNums[i]))
    }
    //Loop that construct room outlines based on the input coordinate points, and the colour based on the getColour function.
    var roomShapes = [];
    for (j = 0; j < rooms.length; j++) {
        var room = L.polygon(roomPoints[j], {
            color: colorMap.get(rooms[j]),
            fillColor: colorMap.get(rooms[j]),
            fillOpacity: 0.5
        });
        //Attach a popup when the room is clicked on that shows the room number and its utilization percent.
        room.bindPopup("<b>" + rooms[j] + "</b><br>Utilization: " + (utilNums[j] / 0.01) + "%");
        roomShapes.push(room);
    }
    //Add all the rooms into a layerGroup for the map
    var roomLayer = L.layerGroup(roomShapes);

    //Create map object in the input div
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
    //Dictionary of all overlay layers that are toggable, using the addGrid function to make the grid lines.
    var overlayShapes = {
        "Rooms": roomLayer,
        "10 Grid": addGrid(imageSize, 10),
        "25 Grid": addGrid(imageSize, 25),
        "50 Grid": addGrid(imageSize, 50),
        "100 Grid": addGrid(imageSize, 100),
    };
    //Image overlay of the grayscale floorplan.
    var grayMap = L.imageOverlay(grayImagePath, bounds, {
        attribution: "© University of Alberta"
    });
    //Image overlay of the colour floorplan.
    var colourMap = L.imageOverlay(colourImagePath, bounds, {
        attribution: "© University of Alberta"
    });
    //Add both overlays to a dictionary
    var mapLayers = {
        "Grayscale": grayMap,
        "Colour": colourMap
    };
    //Set grayscale as inital default map, and focus on it.
    L.imageOverlay(grayImagePath, bounds, {
        attribution: "© University of Alberta"
    }).addTo(map);
    map.fitBounds(bounds);
    //Add both the image overlay layers AND the room layers to the map
    L.control.layers(mapLayers, overlayShapes).addTo(map);
    
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
        div.innerHTML += '<p>Utilization (%)</p>'
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
}

//Special Settings for the slideshow on the website.
$(document).ready(function () {
    $('[data-fancybox]').fancybox({
        clickSlide: false, //Disable close on outside click.
        touch: false, //Disable close on swipe.
        clickOutside: false
    });
});
