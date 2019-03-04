	var mymap;
	var heatmap;

	$("#submitForm").click(function(e) {
    	e.preventDefault();
    	e.stopPropagation();
    	var firstDate = ($("#firstDate").val());
    	var secondDate = ($("#secondDate").val());
    	var firstTime = ($("#firstTime").val()+":00");
    	var secondTime= ($("#secondTime").val()+":00");
    	displayData(firstDate,secondDate);
    });

	function initMap() {
	    var montg = {lat: 39.1609, lng: -77.2206};
	    mymap = new google.maps.Map(document.getElementById('map'), {
	    zoom: 9,
	    center: montg
	    });
	} 

	function displayData(firstD,secondD) {
		  	$.ajax({
			    url: "https://data.montgomerycountymd.gov/resource/ms8i-8ux3.json?$where=description like '%25EXCEED%25' AND date_of_stop between '"+firstD+"T00:00:00' and '"+ secondD + "T00:00:00'", 
			    type: "GET",
			    data: {
			      "$limit" : 10000,
			      "$$app_token" : "EomQIfjQBBVCOkhua3dU0818w"
    			}
			}).done(function(data){
				console.log(data);
				var ll = [];
				$("#notification").text("There were " + data.length + " speeding citations in this period!");
				for (i in data) {
					if(isNaN(data[i].latitude)===false && isNaN(data[i].longitude)===false) {
					  	var latLng = new google.maps.LatLng(data[i].latitude, data[i].longitude);
					  	ll.push(latLng);        		
				  }
		  		}
		  	 	heatmap = new google.maps.visualization.HeatmapLayer({
          		data: ll,
          		map: mymap
        	});
      	});
	}