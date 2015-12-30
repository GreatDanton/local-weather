$(document).ready(function() {
  function geolocation() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
    //  $('.data').html("lat: " + latitude + "<br>" + "long: " + longitude);
      $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=322fb42145c8a682b9abc1d2c1f8f41c"+"&units=" + unit + "", function(json){
        // start
        var html = [];

        if (unit === 'metric') {
          $('.temp').text(json.main.temp.toFixed(1) + ' °C');
        } else {
          $('.temp').text(json.main.temp.toFixed(1) + ' °F');
        }

        $('.description').text(json.weather[0].description);
        $('.city').text(json.name);
        $('.pressure').html("<p><span class='light'>Pressure: </span>" + json.main.pressure +" hPa</p>" + " " + "<p><span class='light'>Humidity: </span>" + json.main.humidity + " %</p>");
      });
    });
  }
  }

  var unit = 'metric';
  geolocation();
  
  $('.switch').click(function(){
    if ($('button').hasClass("right")) {
      $('button').removeClass("right");
      $('button').text("°C");
      unit = 'metric';
      geolocation();
    } else {
      $('button').addClass("right");
      $('button').text("°F");
      unit = 'imperial';
      geolocation();
    }
  });

});
