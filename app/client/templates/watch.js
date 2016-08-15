// import 'reveal/theme/blood.css'

Template.watch.onCreated(function() {
    var instance = this;
    var presentationOwner = this.data.username;
    instance.state = null;

    instance.autorun(function () {

        var subscription = Meteor.subscribe('userPresentationsDetails', presentationOwner);
        if (subscription.ready()) {
            var pres = UserPresentations.findOne({'username': presentationOwner, 'isRunning': true});
            if (pres) {
                Reveal.setState(pres.state);
            }
        }
    });
});

Template.watch.onRendered( function() {
    Reveal.initialize();
});