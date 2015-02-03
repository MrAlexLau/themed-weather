if (Meteor.isClient) {
  Session.set("details", [])

  Template.body.helpers({
    details:  function () {
      return Session.get("details");
    }
  });

  Template.weatherDetail.helpers({
    customDescription: function(temp) {
      if (temp < 32){
        return "Did someone call Disney? Because it's frozen outside.";
      }
      else if (temp < 50) {
        return "You're not going to die of the cold, but grab a jacket";
      }
      else if (temp < 70) {
        return "Yup, it's pretty average out.";
      }
      else if (temp < 90) {
        return _.sample([
          "It's pretty freakin nice out. GO OUTSIDE.",
          "Seriously stop looking at screens and go throw a frisbee"
        ]);
      }
      else {
        return "DEAR LORD IT'S HOT";
      }
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
