// WeatherDetails = new Meteor.Collection('weather-details');

if (Meteor.isClient) {
  // Meteor.subscribe("weather-details");

  Session.set("details", [])

  Template.body.helpers({
    // weatherDetails: WeatherDetails.find({})
    details:  function () {
      return Session.get("details");
    }
  });

  Template.body.events({
    "submit .location-info": function (event) {
      var text = event.target.text.value;

      var options = {
        location: text,
        unit: 'f',
        success: _.bind(function(weather) {
          Session.set('details', weather);
        }, this),
        error: function(error) {
          $("#weather").html('<p>'+error+'</p>');
        }
      }

      Weather.options = options;
      Weather.load();

      // Prevent default form submit
      return false;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
