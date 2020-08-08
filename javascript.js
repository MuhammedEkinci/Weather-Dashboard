var cityButtons = $("#city-button-container");

var apiLink = "https://api.openweathermap.org/data/2.5/forecast?cnt=6&appid=0e92073c3c58ca34ad6188f84fccee10";

//array that holds default cities and new saved cities
var cityArray = ["Austin", "Chicago", "New York", "Orlando","San Francisco", "Seattle", "Denver", "Atlanta"];


//when search button is clicked
$(".search-btn").click( function(event) {
    event.preventDefault();
    event.stopPropagation();
    
    var cityName = $("#city-search").val().trim();
    $("#city-search").val("");
    
    $.ajax({
        url: apiLink + "&q=" + cityName,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        saveNewButton(cityName);
        searchCity(cityName);
    });
});

//when pre-made city button are clicked
$.each(cityButtons.children("button"), function(i, index) {
    $(index).text(cityArray[i].click(function(event) {
        event.preventDefault();
        event.stopPropagation();

        searchCity($(this).text());
        reorderbuttons(i);
    }));
});

