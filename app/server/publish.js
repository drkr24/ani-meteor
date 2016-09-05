import { UserPresentations, Presentations } from "../lib/collections"

Meteor.publish("presOverview", function() {
    if (!this.userId) return this.ready();
    return Presentations.find({"username": Meteor.users.findOne(this.userId).username}, {fields: {slides: 0}});
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
