var cityButtons = $("#city-button-container");

var queryURL = "https://api.openweathermap.org/data/2.5/forecast?cnt=6&appid=0e92073c3c58ca34ad6188f84fccee10";

//array that holds default cities and new saved cities
var cityArray = ["Austin", "Chicago", "New York", "Orlando","San Francisco", "Seattle", "Denver", "Atlanta"];


//-----------search city function-----------//
function searchCity(cityName) {
    $.ajax({
        url: queryURL + "&q=" + cityName,
        method: "GET"
    }).then(function(response) {
        var uvApiLink = "https://api.openweathermap.org/data/2.5/uvi?cnt=0e92073c3c58ca34ad6188f84fccee10" + "&lat=" + responce.city.coord.lat + "&lon=" + responce.city.coord.lon;
        var currentDate = " (" + moment().format("MM/DD/YYYY") + ") ";

        $.ajax({
            url: uvApiLink,
            method: "GET"
        }).then(function(response2) {
            $("#uv-index").text(response2.value);
            //changes color of uv rating depending on value
            if(response2.value < 3) {
                $("#uv-index").addClass("safe-uv").removeClass("warning-uv danger-uv big-danger-uv panic-uv");
            }
            else if(response2.value < 6) {
                $("#uv-index").addClass("warning-uv").removeClass("safe-uv danger-uv big-danger-uv panic-uv");
            }
            else if(response2.value < 8){
                $("#uv-index").addClass("danger-uv").removeClass("warning-uv safe-uv big-danger-uv panic-uv");
            }
            else if(response2.value < 11){
                $("#uv-index").addClass("big-danger-uv").removeClass("warning-uv danger-uv safe-uv panic-uv");
            }
            else{
                $("#uv-index").addClass("panic-uv").removeClass("warning-uv danger-uv big-danger-uv safe-uv");
            }

        });

        ///continue here

    });
}





//when search button is clicked
$(".search-btn").click( function(event) {
    event.preventDefault();
    event.stopPropagation();
    
    var cityEl = $("#city-search").val().trim();
    $("#city-search").val("");
    
    $.ajax({
        url: queryURL + "&q=" + cityEl,
        method: "GET"
    }).then(function(response) {
        console.log(response);


        saveNewButton(cityEl);
        searchCity(cityEl);
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

