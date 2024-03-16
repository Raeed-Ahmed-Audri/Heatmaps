// Call this function whenever you want to fetch and display new data
function fetchData() {
    var selectedBuilding = $('#buildingFilter').val();
    google.script.run.withSuccessHandler(function(data) {
        displayData(data, selectedBuilding);
    }).getAllBuildingsData();
  }
  
  function displayData(data, selectedBuilding) {
    var container = $('#dataContainer');
    container.empty(); // Clear previous data
    var filteredData = data;
    if(selectedBuilding !== 'all') {
        filteredData = data.filter(item => item.building === selectedBuilding);
    }
  
    filteredData.forEach(function(item) {
        var para = $('<p>').text(`Building: ${item.building}, Room: ${item.room}, Utilization: ${item.utilization}%`);
        container.append(para);
    });
  }
  
  // Initial fetch and display
  $(document).ready(function() {
    fetchData();
  });
  
