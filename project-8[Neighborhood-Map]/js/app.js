//model
// create list of locations to be marked on maps
var CityTour = [{

        name: 'Radisson Blu Hotel',
        lat: 31.7058,
        lng: 74.8189,
        foursquareId: '4f95f6abe4b0d1d5d45adf0f',
        selected: false,
        show: true
    },
    {
        name: 'Wagah Border',
        lat: 31.604948,
        lng: 74.572325,
        foursquareId: '4e6cbf21b993061ea8efa5db',
        selected: false,
        show: true
    },
    {
        name: 'Alpha One Mall',
        lat: 31.6428,
        lng: 74.8566,
        foursquareId: '4c0a0dc602c9d13a58e373dd',
        selected: false,
        show: true
    },
    {
        name: 'Holiday Inn ',
        lat: 31.6536,
        lng: 74.8632,
        foursquareId: '536bcbdc498ec63b1a2a7865',
        selected: false,
        show: true
    },
    {
        name: 'Trillium mall',
        lat: 31.6587,
        lng: 74.8787,
        foursquareId: '4efebf0a93adc82457be0ba7',
        selected: false,
        show: true
    },
    {
        name: 'Amritsar International Airport (ATQ)',
        lat: 31.7056,
        lng: 74.8067,
        foursquareId: '4c84a356d34ca14376834080',
        selected: false,
        show: true
    },


];
//------------model end ---------

var locations = []; //arrary of markers to be shown on maps
//viewmodel1:::name
var viewmodel1 = function() {
    var dMarkers = makeeMarkersIcoon('##00ffcc'); //default color of marker to be stored in default icon
    var hMarkers = makeeMarkersIcoon('#cc00ff'); //color when we click mouse or hover on it
    var Infowindow = new google.maps.InfoWindow(); //info window of marker.

    function makeeMarkersIcoon(markerColor) { //passing marker color and building marker icon in this function to tell what marker will do
        var markersImg = new google.maps.MarkerImage(
            //it is just like a fnote work same as pin  ::
            //     http://chart.googleapis.com/chart?chst=d_fnote_title&chld=balloon|1|#99ffea| '
            //chst::type of marker
            //chld::styling of marker
            'http://chart.googleapis.com/chart?chst=d_fnote_title&chld=balloon|1|#99ffea|' + markerColor +
            '#99ffea',
            new google.maps.Size(20, 30), //size of marker height and widh
            new google.maps.Point(0, 0),
            new google.maps.Point(11, 32), //accuracy of pointing .
            new google.maps.Size(22, 36));
        return markersImg;
    }

    for (i = 0; i < CityTour.length; i++) {
        var marker = new google.maps.Marker({
            // settings marker's details in marker variable
            //by iterating it into a loop through all places that we decided in model

            position: {
                lat: CityTour[i].lat, //inserting latitude and longitude
                lng: CityTour[i].lng
            },
            icon: dMarkers, //setting icon to default marker
            map: map, //set markers on map
            title: CityTour[i].name, //title of markers
            rating: '', //ratings of places that we added
            venue: CityTour[i].foursquareId, //foursquare id
            selected: CityTour[i].selected, //marker is selectr not
            image: '', //setting image when click on marker
            lat: '', // latitude
            lng: '', // longitude
            //applying animations on markers
            animation: google.maps.Animation.DROP,
            show: ko.observable(true)
        });
        locations.push(marker); //adding marker in location array


        marker.addListener('mouseover', function() { //when we take mouse on marker we change color of it to
            this.setIcon(hMarkers); // calling setIcon() color of highlighted icon
        });
        marker.addListener('mouseout', function() {
            this.setIcon(dMarkers); //when we take are mouse away from marker calling function setIcon color changes back to default
        });
        //DROP marker when click on it
        var makeDrop = null;
        var dropmarker = function() {
            if (makeDrop !== null)
                makeDrop.setAnimation(null);
            if (makeDrop !== this) {
                this.setAnimation(google.maps.Animation.DROP);
                setTimeout(function() {
                    makeDrop.setAnimation(null);
                }, 600);
                makeDrop = this;
            } else
                makeDrop = null;
        };
        google.maps.event.addListener(marker, 'click', dropmarker);
        marker.addListener('click', function() {
            opnInfoWndow(this, Infowindow); //on clicking marker calling function opnInfoWndow()
        });
    }

    // get rating for each marker
    locations.forEach(function(n) {
        //passing m for marker
        $.ajax({ //ajax request for foursquare api
            method: 'GET',
            dataType: "json",
            url: "https://api.foursquare.com/v2/venues/" + n.venue + "?client_id=X2FYCYCX0ISXHQTT1CBM2HHM5XKATDDSJ2RQLSNFBOKYQDVY&client_secret=SBNFMXCEPESO5WH4GGXAQSXL1OS3X4ZHUVHWU1Y3RQPNKN40&v=20170501",
            success: function(data) { //if data is successfully fetch than function will execute
                var venue = data.response.venue;
                var imgurl = data.response.venue.photos.groups[0].items[0];
                //var lt=data.response.venue;

                //var lg=data.response.venue;
                if ((venue.hasOwnProperty('rating')) || (venue.location.hasOwnProperty('lat')) || (venue.location.hasOwnProperty('lng')) || ((imgurl.hasOwnProperty('prefix')) && (imgurl.hasOwnProperty('suffix')))) {
                    //to get lat and lng on info window of marker
                    n.lat = venue.location.lat;
                    n.lng = venue.location.lng;
                    n.rating = venue.rating;
                    n.image = imgurl.prefix + "100x100" + imgurl.suffix;
                } else {
                    n.rating = '';
                    n.imgurl = '';
                    n.lat = '';
                    n.lng = '';
                }
            },
            error: function(e) { //if any error occur in fetching data
                alert('Found error while data fetching ');
            }

        });
    });



    function opnInfoWndow(marker, infowindow) //opening info window on click of marker
    {
        //displaying all the specified requirements on clicking a marker
        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            infowindow.setContent('<div>' + '<h3>' + marker.title + '</h3>' + "<h4>Ratings:" + marker.rating + '</h4> </div><div><img src="' + marker.image + '">' + '<h3>Latitude:::' + marker.lat + '</h3>' + '<h3>Longitude:::' + marker.lng + '</h3></div>'); //set content that should be appear in info window

            //content that should be appear in info window

            if (marker.rating !== null || marker.image !== null) {
                infowindow.open(map, marker);
            }
            if (marker.lat !== null || marker.lng !== null) {
                infowindow.open(map, marker);
            }
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
            });
        }
    }
    //the marker which is selected open its pop up window
    this.selectAll = function(marker) {

        opnInfoWndow(marker, Infowindow);
        marker.selected = true;
        marker.setAnimation(google.maps.Animation.DROP);
        setTimeout(function() {
            marker.setAnimation(null);
        }, 600); //set time for animation taking place on the marker
    };


    //function for search bar
    this.inputText = ko.observable('');
    this.filtersearch = function() {
        Infowindow.close(); //close all the info window that are previously opened window
        var inputSearch = this.inputText();
        console.log(inputSearch);
        if (inputSearch.length === 0) {
            this.show_All(true);
        } else {
            for (i = 0; i < locations.length; i++) {
                //formula for filtering search options when u enter the name on the search bar
                if (locations[i].title.toLowerCase().indexOf(inputSearch.toLowerCase()) === 0) {
                    locations[i].show(true);
                    locations[i].setVisible(true);
                } else {
                    locations[i].show(false);
                    locations[i].setVisible(false);
                }
            }
        }
        Infowindow.close();
    };
    ///show the desired results
    this.show_All = function(variable) {
        for (i = 0; i < locations.length; i++) {
            locations[i].show(variable);
            locations[i].setVisible(variable);
        }
    };

};
