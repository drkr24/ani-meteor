Meteor.publish("presOverview", function() {
    return Presentations.find({}, {fields: {slides: 0}});
});

Meteor.publish("presentationDetails", function(_name) {
    return Presentations.find({name: _name});
});

Meteor.publish("userPresentationsDetails", function(username) {
    return UserPresentations.find({'username': username, 'isRunning': true});
});


Meteor.publish("presentationDetailsByUser", function(_username) {
    var pres = UserPresentations.findOne({"username" : _username, "isRunning" : true});
    if (pres) {
        return Presentations.find({name: pres.presentationName});
    } else {
        console.log("user %s is not presenting anything right now", _username);
        return null;
    }

});
